import { LitElement, html, css, svg, nothing, type TemplateResult, type SVGTemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, InputConfig, ShellyPro1DiagramCardConfig } from './types';
import { formatEntityValue, moreInfo } from './utils';
import { openConfirmDialog } from './confirm-dialog';
import { diagramStyles } from './diagram-styles';
import './pro1-editor';

/** Nahrazuje Rollup replace z package.json version. */
declare const __CARD_VERSION__: string;
const CARD_VERSION = __CARD_VERSION__;

/** Výchozí stub entity (Shelly Pro 1 UL DUB-0ZD-FVE-AC-IN). */
const STUB: ShellyPro1DiagramCardConfig = {
  title: 'DUB-0ZD-FVE-AC-IN',
  switch: 'switch.dub_0zd_fve_ac_in',
  input_1: { entity: 'binary_sensor.dub_0zd_fve_ac_in_vstup_0' },
  input_2: { entity: 'binary_sensor.dub_0zd_fve_ac_in_vstup_1' },
  firmware_update: 'update.dub_0zd_fve_ac_in_firmware',
  reset_button: 'button.dub_0zd_fve_ac_in_restartovat',
};

const LIVE_COLOR = '#c4783a'; // hnědá — fáze L (stejná jako LA u 3EM)
const NEUTRAL_COLOR = '#42a5f5';
const INPUT_ON_COLOR = '#ffd740';
const OUT_ON_COLOR = '#69f0ae';
const DIM_COLOR = 'rgba(255, 255, 255, 0.26)';

/** Layout podle 3EM diagramu (viewBox 680×520) — stejný blok zařízení. */
const VB = { w: 680, h: 520 };

const M = { x: 380, y: 24, w: 128, h: 470 };

const TERM = {
  leftX: M.x + 36,
  rightX: M.x + 92,
  topY: M.y + 32,
  inY: M.y + 82,
  ioY: M.y + M.h - 32,
  tw: 42,
  th: 36,
};

/** Kontakt relé na čele zařízení — mezi spodní dělicí linkou a svorkami I / O. */
const CONTACT_Y = M.y + M.h - 82;

/** Hlavní tlačítko výstupu vlevo uprostřed. */
const TOGGLE = { x: 190, y: 290, r: 52 };

/** Zátěž na výstupu O vpravo. */
const LOAD = { x: 600, y: 300, r: 22 };

/** Jak dlouho čekat na změnu stavu po kliknutí (ms). */
const PENDING_TIMEOUT = 8000;

type InputKey = 'input_1' | 'input_2';

/**
 * Vstupy SW1 / SW2 — stejné vedení jako LB / LA u 3EM:
 * SW1 nahoře doprava (přes střed bloku), SW2 níž do levé svorky (bokem).
 */
const INPUT_LINES: Array<{ key: InputKey; label: string; y: number; termX: number }> = [
  { key: 'input_1', label: 'SW1', y: TERM.topY + 36, termX: TERM.rightX },
  { key: 'input_2', label: 'SW2', y: TERM.topY + 72, termX: TERM.leftX },
];

type OutputState = 'on' | 'off' | 'pending' | 'unavailable';

@customElement('shelly-pro1-diagram-card')
export class ShellyPro1DiagramCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: ShellyPro1DiagramCardConfig;

  /** Cílový stav po kliknutí, dokud ho HA nepotvrdí. */
  @state() private _pending?: 'on' | 'off';

  private _pendingTimer?: number;

  public static getStubConfig(): ShellyPro1DiagramCardConfig {
    return {
      ...STUB,
      input_1: { ...STUB.input_1 },
      input_2: { ...STUB.input_2 },
    };
  }

  public static async getConfigElement(): Promise<HTMLElement> {
    return document.createElement('shelly-pro1-diagram-card-editor');
  }

  public setConfig(config: ShellyPro1DiagramCardConfig): void {
    if (!config) throw new Error('Missing configuration');
    this._config = { ...config };
  }

  public getCardSize(): number {
    return 8;
  }

  public getGridOptions(): Record<string, unknown> {
    return { columns: 12, rows: 6, min_rows: 4 };
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._clearPending();
  }

  protected updated(): void {
    // Pending končí, jakmile HA ohlásí cílový stav.
    if (this._pending && this._switchState() === this._pending) this._clearPending();
  }

  /** Entita je „vyplněná“ v configu (neprázdný string). */
  private _filled(entityId?: string): entityId is string {
    return typeof entityId === 'string' && entityId.trim().length > 0;
  }

  private _switchState(): string | undefined {
    const id = this._config?.switch;
    return this._filled(id) ? this.hass?.states[id]?.state : undefined;
  }

  private _outputState(): OutputState {
    if (this._pending) return 'pending';
    const st = this._switchState();
    if (st === 'on' || st === 'off') return st;
    return 'unavailable';
  }

  private _input(key: InputKey): InputConfig | undefined {
    return this._config?.[key];
  }

  private _clearPending(): void {
    if (this._pendingTimer) window.clearTimeout(this._pendingTimer);
    this._pendingTimer = undefined;
    this._pending = undefined;
  }

  private _loadName(): string | undefined {
    const name = this._config?.name?.trim();
    return name ? name : undefined;
  }

  private _onValueClick(entityId: string | undefined, ev: Event): void {
    ev.stopPropagation();
    moreInfo(this, entityId);
  }

  /** Klávesnice pro SVG „tlačítka“ (Enter / mezerník). */
  private _onKey(ev: KeyboardEvent, action: (e: Event) => void): void {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      action(ev);
    }
  }

  /** Přepne výstup přes `<domain>.turn_on/turn_off` — volitelně po potvrzení. */
  private async _onToggle(ev: Event): Promise<void> {
    ev.stopPropagation();
    const entityId = this._config?.switch;
    if (!this._filled(entityId) || !this.hass?.callService || this._pending) return;
    const current = this._switchState();
    if (current !== 'on' && current !== 'off') return;
    const target = current === 'on' ? 'off' : 'on';

    if (this._config?.confirm) {
      const what = this._loadName() ?? 'výstup';
      const confirmed = await openConfirmDialog({
        title: target === 'on' ? `Zapnout ${what}?` : `Vypnout ${what}?`,
        message:
          target === 'on'
            ? 'Relé Shelly Pro 1 sepne a zátěž na výstupu O dostane napětí.'
            : 'Relé Shelly Pro 1 rozepne a zátěž na výstupu O přijde o napětí.',
        confirmLabel: target === 'on' ? 'Zapnout' : 'Vypnout',
        accent: target === 'on' ? OUT_ON_COLOR : '#ff8a65',
      });
      if (!confirmed) return;
    }

    this._pending = target;
    this._pendingTimer = window.setTimeout(() => this._clearPending(), PENDING_TIMEOUT);
    const domain = entityId.split('.')[0];
    try {
      await this.hass.callService(domain, target === 'on' ? 'turn_on' : 'turn_off', {
        entity_id: entityId,
      });
    } catch (err) {
      this._clearPending();
      throw err;
    }
  }

  /** Restart Shelly přes button.press — nejdřív potvrzovací dialog. */
  private async _onResetClick(ev: Event): Promise<void> {
    ev.stopPropagation();
    const entityId = this._config?.reset_button;
    if (!this._filled(entityId) || !this.hass?.callService) return;

    const confirmed = await openConfirmDialog({
      title: 'Restartovat Shelly Pro 1?',
      message:
        'Zařízení se restartuje. Relé se po startu vrátí do stavu podle nastavení Shelly. Opravdu pokračovat?',
      confirmLabel: 'Restartovat',
      accent: '#ff8a65',
    });
    if (!confirmed) return;

    await this.hass.callService('button', 'press', { entity_id: entityId });
  }

  protected render(): TemplateResult {
    if (!this._config) {
      return html`<ha-card><div class="warn">Chybí konfigurace karty.</div></ha-card>`;
    }
    if (!this._filled(this._config.switch)) {
      return html`<ha-card><div class="warn">Vyplň entitu výstupu (switch).</div></ha-card>`;
    }

    const switchObj = this.hass?.states[this._config.switch];
    const title =
      this._config.title ??
      (switchObj?.attributes.friendly_name as string | undefined) ??
      'Shelly Pro 1';
    const temp = this._filled(this._config.temperature)
      ? formatEntityValue(this.hass, this._config.temperature)
      : null;
    const fwId = this._config.firmware_update;
    const fwAvailable = this._filled(fwId) && this.hass?.states[fwId]?.state === 'on';

    return html`
      <ha-card>
        <div class="header">
          <div class="header-main">
            <div class="title">${title}</div>
          </div>
          ${temp || fwAvailable
            ? html`<div class="totals">
                ${temp
                  ? html`<button
                      class="value-btn"
                      type="button"
                      @click=${(e: Event) => this._onValueClick(this._config!.temperature, e)}
                    >
                      <span class="caption">Teplota</span>
                      <span class="num">${temp}</span>
                    </button>`
                  : nothing}
                ${fwAvailable
                  ? html`<button
                      class="value-btn"
                      type="button"
                      @click=${(e: Event) => this._onValueClick(fwId, e)}
                    >
                      <span class="caption">Firmware</span>
                      <span class="num fw">Aktualizace</span>
                    </button>`
                  : nothing}
              </div>`
            : nothing}
        </div>
        <div class="diagram">${this._renderSvg()}</div>
      </ha-card>
    `;
  }

  private _renderSvg(): TemplateResult {
    const { x: mx, y: my, w: mw, h: mh } = M;
    const div2 = my + 116;
    const div3 = my + mh - 116;
    const out = this._outputState();
    const closed = out === 'on' || (out === 'pending' && this._pending === 'on');

    return html`
      <svg
        viewBox="0 0 ${VB.w} ${VB.h}"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Shelly Pro 1 diagram"
      >
        ${svg`<rect class="meter" x=${mx} y=${my} width=${mw} height=${mh} rx="3" />`}
        ${svg`<line class="meter-div" x1=${mx} y1=${div2} x2=${mx + mw} y2=${div2} />`}
        ${svg`<line class="meter-div" x1=${mx} y1=${div3} x2=${mx + mw} y2=${div3} />`}

        ${this._renderSupply()}
        ${INPUT_LINES.map((line) => this._renderInputLine(line))}
        ${this._renderOutputWires(closed)}
        ${this._renderToggle(out)}
        ${this._renderLoad(closed)}
        ${this._renderContact(closed, out)}

        ${this._renderStatusPanel(mx + mw / 2, div2 + 20, out)}

        <!-- Svorky až po vodičích — text nepřekryje linka -->
        ${this._terminal(TERM.leftX, TERM.topY, 'L', LIVE_COLOR)}
        ${this._terminal(TERM.rightX, TERM.topY, 'N', NEUTRAL_COLOR)}
        ${this._terminal(TERM.leftX, TERM.inY, 'SW2', this._inputColor('input_2'))}
        ${this._terminal(TERM.rightX, TERM.inY, 'SW1', this._inputColor('input_1'))}
        ${this._terminal(TERM.leftX, TERM.ioY, 'I', LIVE_COLOR)}
        ${this._terminal(TERM.rightX, TERM.ioY, 'O', closed ? LIVE_COLOR : DIM_COLOR)}
      </svg>
    `;
  }

  /** Napájení L zleva, N zprava (jako LC / LN u 3EM). */
  private _renderSupply(): SVGTemplateResult {
    const lEnd = this._wireEnd(TERM.leftX, TERM.topY, 'left');
    const nEnd = this._wireEnd(TERM.rightX, TERM.topY, 'right');
    const nWireOut = VB.w - 12;
    const labelY = TERM.topY - 10;
    return svg`
      <g class="supply">
        <path class="wire" stroke=${LIVE_COLOR} d=${`M 14 ${TERM.topY} L ${lEnd.x} ${lEnd.y}`} />
        <text class="caption" x="14" y=${labelY}>Napájení</text>
        <text class="label" x=${M.x - 18} y=${labelY} text-anchor="end" fill=${LIVE_COLOR}>L</text>
        <path class="wire" stroke=${NEUTRAL_COLOR} d=${`M ${nWireOut} ${TERM.topY} L ${nEnd.x} ${nEnd.y}`} />
        <text class="label" x=${nEnd.x + 22} y=${labelY} fill=${NEUTRAL_COLOR}>N</text>
        <text class="phase-name" x=${nWireOut} y=${labelY} text-anchor="end" fill=${NEUTRAL_COLOR}>
          Nulový vodič
        </text>
      </g>
    `;
  }

  private _inputOn(key: InputKey): boolean {
    const id = this._input(key)?.entity;
    return this._filled(id) && this.hass?.states[id]?.state === 'on';
  }

  private _inputColor(key: InputKey): string {
    if (!this._filled(this._input(key)?.entity)) return DIM_COLOR;
    return this._inputOn(key) ? INPUT_ON_COLOR : 'rgba(255, 255, 255, 0.55)';
  }

  /** Vstup SW1 / SW2 — jen když je vyplněná entita. */
  private _renderInputLine(line: (typeof INPUT_LINES)[number]): SVGTemplateResult | typeof nothing {
    const input = this._input(line.key);
    if (!this._filled(input?.entity)) return nothing;
    const entityId = input!.entity!;
    const st = this.hass?.states[entityId]?.state;
    const on = st === 'on';
    const color = this._inputColor(line.key);
    const valueText = on ? 'Zapnuto' : st === 'off' ? 'Vypnuto' : '—';
    const end = this._wireEnd(line.termX, TERM.inY, 'left');
    const midX = (TERM.leftX + TERM.rightX) / 2;
    const riserX = M.x - 12;
    // SW1 svisle mezi svorkami a zleva do SW1; SW2 bokem do levé svorky.
    const viaX = line.termX === TERM.rightX ? midX : riserX;
    const path = [
      `M 14 ${line.y}`,
      `L ${viaX} ${line.y}`,
      `L ${viaX} ${TERM.inY}`,
      `L ${end.x} ${end.y}`,
    ].join(' ');
    const name = input?.name?.trim();

    return svg`
      <g class="input-line">
        <path class="wire" stroke=${color} d=${path} />
        <text class="caption" x="14" y=${line.y - 10}>Vstup</text>
        ${name
          ? svg`<text class="phase-name" x="50" y=${line.y - 10} fill=${color}>${name}</text>`
          : nothing}
        <text
          class="value clickable"
          x="200"
          y=${line.y - 10}
          text-anchor="middle"
          fill=${color}
          @click=${(e: Event) => this._onValueClick(entityId, e)}
        >
          ${valueText}
        </text>
        <text class="label" x=${M.x - 18} y=${line.y - 10} text-anchor="end" fill=${color}>
          ${line.label}
        </text>
      </g>
    `;
  }

  /** Přívod do I zleva, výstup z O doprava a nahoru k zátěži. */
  private _renderOutputWires(closed: boolean): SVGTemplateResult {
    const iEnd = this._wireEnd(TERM.leftX, TERM.ioY, 'left');
    const oEnd = this._wireEnd(TERM.rightX, TERM.ioY, 'right');
    const labelY = TERM.ioY - 10;
    const outPath = [
      `M ${oEnd.x} ${oEnd.y}`,
      `L ${LOAD.x} ${TERM.ioY}`,
      `L ${LOAD.x} ${LOAD.y + LOAD.r}`,
    ].join(' ');
    const outColor = closed ? LIVE_COLOR : DIM_COLOR;
    return svg`
      <g class="output-wires">
        <path class="wire" stroke=${LIVE_COLOR} d=${`M 14 ${TERM.ioY} L ${iEnd.x} ${iEnd.y}`} />
        <text class="caption" x="14" y=${labelY}>Přívod kontaktu</text>
        <text class="label" x=${M.x - 18} y=${labelY} text-anchor="end" fill=${LIVE_COLOR}>I</text>
        <path class="wire ${closed ? '' : 'off'}" stroke=${outColor} d=${outPath} />
        ${closed ? svg`<path class="wire flow" stroke=${OUT_ON_COLOR} d=${outPath} />` : nothing}
        <text class="label" x=${oEnd.x + 22} y=${labelY} fill=${outColor}>O</text>
      </g>
    `;
  }

  /** Velké tlačítko výstupu — hlavní ovládací prvek karty. */
  private _renderToggle(out: OutputState): SVGTemplateResult {
    const { x, y, r } = TOGGLE;
    const live = out !== 'unavailable';
    const on = out === 'on';
    const stateText =
      out === 'on'
        ? 'Zapnuto'
        : out === 'off'
          ? 'Vypnuto'
          : out === 'pending'
            ? this._pending === 'on'
              ? 'Zapínám…'
              : 'Vypínám…'
            : 'Nedostupné';
    // Symbol napájení: oblouk s mezerou nahoře + svislá čárka.
    const ir = 20;
    const gap = 70;
    const a1 = ((-90 + gap / 2) * Math.PI) / 180;
    const a2 = ((-90 - gap / 2 + 360) * Math.PI) / 180;
    const arc = `M ${(x + ir * Math.cos(a1)).toFixed(2)} ${(y + ir * Math.sin(a1)).toFixed(2)} A ${ir} ${ir} 0 1 1 ${(x + ir * Math.cos(a2)).toFixed(2)} ${(y + ir * Math.sin(a2)).toFixed(2)}`;
    const toggle = (e: Event) => void this._onToggle(e);

    return svg`
      <g
        class="toggle ${out}"
        role=${live ? 'switch' : nothing}
        aria-checked=${live ? String(on) : nothing}
        aria-label=${this._loadName() ?? 'Výstup'}
        tabindex=${live ? 0 : nothing}
        @click=${live ? toggle : nothing}
        @keydown=${live ? (e: KeyboardEvent) => this._onKey(e, toggle) : nothing}
      >
        <text class="caption" x=${x} y=${y - r - 18} text-anchor="middle">Výstup relé</text>
        <circle class="toggle-ring" cx=${x} cy=${y} r=${r} />
        <circle class="toggle-core" cx=${x} cy=${y} r=${r - 10} />
        <path class="toggle-icon" d=${arc} />
        <line class="toggle-icon" x1=${x} y1=${y - ir - 6} x2=${x} y2=${y - 4} />
        <text class="toggle-state" x=${x} y=${y + r + 28} text-anchor="middle">${stateText}</text>
      </g>
    `;
  }

  /** Zátěž (IEC symbol svítidla) — klik otevře more-info výstupu. */
  private _renderLoad(closed: boolean): SVGTemplateResult {
    const { x, y, r } = LOAD;
    const d = r * Math.SQRT1_2;
    const color = closed ? OUT_ON_COLOR : DIM_COLOR;
    const name = this._loadName();
    return svg`
      <g
        class="load ${closed ? 'on' : ''}"
        style=${`--load-color: ${color}`}
        @click=${(e: Event) => this._onValueClick(this._config?.switch, e)}
      >
        <text class="caption" x=${x} y=${y - r - (name ? 34 : 14)} text-anchor="middle">Zátěž</text>
        ${name
          ? svg`<text class="phase-name" x=${x} y=${y - r - 14} text-anchor="middle" fill=${color}>${name}</text>`
          : nothing}
        <circle class="load-body" cx=${x} cy=${y} r=${r} stroke=${color} />
        <path
          class="load-x"
          stroke=${color}
          d=${`M ${x - d} ${y - d} L ${x + d} ${y + d} M ${x + d} ${y - d} L ${x - d} ${y + d}`}
        />
      </g>
    `;
  }

  /** Kontakt relé I–O na čele zařízení; klik přepíná stejně jako tlačítko. */
  private _renderContact(closed: boolean, out: OutputState): SVGTemplateResult {
    const iTop = TERM.ioY - TERM.th / 2;
    const ix = TERM.leftX;
    const ox = TERM.rightX;
    const cy = CONTACT_Y;
    const bladeEnd = closed ? { x: ox, y: cy } : { x: ox - 8, y: cy - 22 };
    const color = closed ? LIVE_COLOR : 'rgba(255, 255, 255, 0.6)';
    const live = out !== 'unavailable';
    const toggle = (e: Event) => void this._onToggle(e);
    return svg`
      <g
        class="contact ${live ? 'live' : ''} ${out === 'pending' ? 'pending' : ''}"
        @click=${live ? toggle : nothing}
      >
        <rect class="contact-hit" x=${ix - 20} y=${cy - 34} width=${ox - ix + 40} height=${iTop - cy + 34} />
        <path class="wire" stroke=${LIVE_COLOR} d=${`M ${ix} ${iTop} L ${ix} ${cy}`} />
        <path class="wire" stroke=${closed ? LIVE_COLOR : DIM_COLOR} d=${`M ${ox} ${iTop} L ${ox} ${cy}`} />
        <line class="contact-blade" x1=${ix} y1=${cy} x2=${bladeEnd.x} y2=${bladeEnd.y} stroke=${color} />
        <circle class="contact-pivot" cx=${ix} cy=${cy} r="3.5" fill=${LIVE_COLOR} />
        <circle class="contact-pivot" cx=${ox} cy=${cy} r="3" fill=${closed ? LIVE_COLOR : DIM_COLOR} />
        <text class="caption" x=${(ix + ox) / 2} y=${cy + 22} text-anchor="middle">Relé</text>
      </g>
    `;
  }

  /** Status LEDs + Reset (stejný panel jako u 3EM, místo Count je Out). */
  private _renderStatusPanel(cx: number, topY: number, out: OutputState): SVGTemplateResult {
    const available = out !== 'unavailable';
    const wifiOn = this._filled(this._config?.wifi_signal);
    const lanOn = this._filled(this._config?.lan_link_speed);
    const leds: Array<{ name: string; color: string; active: boolean; title?: string }> = [
      { name: 'Power', color: '#ff5252', active: available },
      {
        name: 'Out',
        color: OUT_ON_COLOR,
        active: out === 'on',
        title: out === 'on' ? 'Výstup zapnutý' : undefined,
      },
      {
        name: 'Wi-Fi',
        color: '#ffd740',
        active: wifiOn,
        title: wifiOn ? `Wi-Fi: ${formatEntityValue(this.hass, this._config?.wifi_signal)}` : undefined,
      },
      {
        name: 'LAN',
        color: '#69f0ae',
        active: lanOn,
        title: lanOn ? `LAN: ${formatEntityValue(this.hass, this._config?.lan_link_speed)}` : undefined,
      },
    ];
    const rowH = 32;
    const resetR = 28;
    const lastY = topY + (leds.length - 1) * rowH;
    const resetTop = lastY + 56;
    const shellyY = (lastY + resetTop) / 2 + 6;
    const resetCy = resetTop + resetR;
    const resetLive = this._filled(this._config?.reset_button);
    const reset = (e: Event) => void this._onResetClick(e);

    return svg`
      <g class="status-panel">
        ${leds.map((led, i) => {
          const ty = topY + i * rowH;
          const cy = ty - 4;
          const lx = cx + 42;
          if (!led.active) {
            return svg`
              <text class="led-label dim" x=${cx - 44} y=${ty}>${led.name}</text>
              <circle class="led off" cx=${lx} cy=${cy} r="6.5" />
            `;
          }
          return svg`
            <text class="led-label" x=${cx - 44} y=${ty}>${led.name}</text>
            <circle
              class="led lit"
              cx=${lx}
              cy=${cy}
              r="6.5"
              fill=${led.color}
              stroke=${led.color}
              style=${`--led-glow: ${led.color}`}
            >
              ${led.title ? svg`<title>${led.title}</title>` : nothing}
            </circle>
          `;
        })}
        <text class="shelly-brand" x=${cx} y=${shellyY} text-anchor="middle">Shelly</text>
        <g
          class="reset-group ${resetLive ? 'live' : ''}"
          role=${resetLive ? 'button' : nothing}
          tabindex=${resetLive ? 0 : nothing}
          @click=${resetLive ? reset : nothing}
          @keydown=${resetLive ? (e: KeyboardEvent) => this._onKey(e, reset) : nothing}
        >
          <circle class="reset-btn" cx=${cx} cy=${resetCy} r=${resetR} />
          <text class="reset-label" x=${cx} y=${resetCy + 5} text-anchor="middle">Reset</text>
        </g>
      </g>
    `;
  }

  private _terminal(cx: number, cy: number, label: string, color: string): SVGTemplateResult {
    const { tw: w, th: h } = TERM;
    return svg`
      <rect class="term" x=${cx - w / 2} y=${cy - h / 2} width=${w} height=${h} rx="2" stroke=${color} />
      <text class="term-label" x=${cx} y=${cy + 5} text-anchor="middle" fill=${color}>${label}</text>
    `;
  }

  /** Vodič končí na okraji svorky (ne prochází textem). */
  private _wireEnd(termX: number, termY: number, approach: 'left' | 'right'): { x: number; y: number } {
    const half = TERM.tw / 2;
    return { x: approach === 'left' ? termX - half : termX + half, y: termY };
  }

  static styles = [
    diagramStyles,
    css`
      .wire.off {
        stroke-dasharray: 4 5;
      }

      .wire.flow {
        stroke-dasharray: 5 13;
        stroke-linecap: round;
        animation: wire-flow 1.1s linear infinite;
        filter: drop-shadow(0 0 3px #69f0ae);
      }

      @keyframes wire-flow {
        to {
          stroke-dashoffset: -18;
        }
      }

      .num.fw {
        color: #ffd740;
      }

      .toggle {
        outline: none;
      }

      .toggle.on,
      .toggle.off {
        cursor: pointer;
      }

      .toggle-ring {
        fill: transparent;
        stroke: rgba(255, 255, 255, 0.22);
        stroke-width: 2;
        pointer-events: all;
        transition: stroke 0.25s ease;
      }

      .toggle-core {
        fill: rgba(30, 136, 229, 0.08);
        stroke: var(--shelly-blue);
        stroke-width: 1.6;
        transition:
          fill 0.25s ease,
          stroke 0.25s ease;
      }

      .toggle-icon {
        fill: none;
        stroke: rgba(255, 255, 255, 0.55);
        stroke-width: 3.2;
        stroke-linecap: round;
        pointer-events: none;
        transition: stroke 0.25s ease;
      }

      .toggle-state {
        fill: rgba(255, 255, 255, 0.6);
        font-size: 15px;
        font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
        font-weight: 650;
        letter-spacing: 0.02em;
      }

      .toggle.on .toggle-ring {
        stroke: #69f0ae;
        filter: drop-shadow(0 0 8px rgba(105, 240, 174, 0.55));
      }

      .toggle.on .toggle-core {
        fill: rgba(105, 240, 174, 0.14);
        stroke: #69f0ae;
      }

      .toggle.on .toggle-icon {
        stroke: #69f0ae;
      }

      .toggle.on .toggle-state {
        fill: #69f0ae;
      }

      .toggle.pending .toggle-ring {
        stroke: var(--diagram-accent);
        stroke-dasharray: 10 8;
        animation: toggle-spin 1.2s linear infinite;
        transform-origin: center;
        transform-box: fill-box;
      }

      .toggle.pending .toggle-state {
        fill: var(--diagram-accent);
      }

      .toggle.unavailable {
        opacity: 0.45;
      }

      .toggle.off:hover .toggle-core,
      .toggle.off:focus-visible .toggle-core {
        stroke: var(--diagram-accent);
        fill: rgba(79, 195, 247, 0.12);
      }

      .toggle.on:hover .toggle-core,
      .toggle.on:focus-visible .toggle-core {
        fill: rgba(105, 240, 174, 0.24);
      }

      @keyframes toggle-spin {
        to {
          transform: rotate(360deg);
        }
      }

      .load {
        cursor: pointer;
      }

      .load-body {
        fill: rgba(15, 20, 25, 0.92);
        stroke-width: 2;
      }

      .load-x {
        stroke-width: 2;
        stroke-linecap: round;
      }

      .load.on .load-body {
        fill: rgba(105, 240, 174, 0.12);
        filter: drop-shadow(0 0 8px var(--load-color));
      }

      .contact-hit {
        fill: transparent;
      }

      .contact.live {
        cursor: pointer;
      }

      .contact-blade {
        stroke-width: 3;
        stroke-linecap: round;
        transition: all 0.2s ease;
      }

      .contact.live:hover .contact-blade {
        filter: drop-shadow(0 0 4px #4fc3f7);
      }

      .contact.pending .contact-blade {
        animation: contact-blink 0.6s ease-in-out infinite alternate;
      }

      @keyframes contact-blink {
        to {
          opacity: 0.35;
        }
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'shelly-pro1-diagram-card': ShellyPro1DiagramCard;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'shelly-pro1-diagram-card',
  name: 'Shelly Pro 1 Diagram Card',
  description: 'Diagram Shelly Pro 1 — ovládání relé, stav vstupů SW1/SW2 a restart.',
  preview: true,
  documentationURL: 'https://github.com/elvisek2020/fve-shelly-card',
});

console.info(
  `%c SHELLY-PRO1-DIAGRAM-CARD %c v${CARD_VERSION} `,
  'background:#0f1419;color:#69f0ae;font-weight:bold',
  'background:#69f0ae;color:#0f1419;font-weight:bold',
);
