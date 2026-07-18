import { LitElement, html, css, svg, nothing, type TemplateResult, type SVGTemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, PhaseConfig, Shelly3emDiagramCardConfig } from './types';
import {
  clampPulseDuration,
  countBlinkDuration,
  formatCurrent,
  formatEnergy,
  formatEntityValue,
  formatPower,
  formatVoltage,
  moreInfo,
  toNum,
} from './utils';
import { openConfirmDialog } from './confirm-dialog';
import './editor';

/** Nahrazuje Rollup replace z package.json version. */
declare const __CARD_VERSION__: string;
const CARD_VERSION = __CARD_VERSION__;

/** Výchozí stub entity (shodné s typickou instalací DUB 1NB AC-IN). */
const STUB: Shelly3emDiagramCardConfig = {
  title: 'DUB-1NP-FVE-AC-OUT',
  phase_a: {
    voltage: 'sensor.dub_1nb_grid_ac_in_phase_a_napeti',
    current: 'sensor.dub_1nb_grid_ac_in_phase_a_proud',
    power: 'sensor.1np_vstupni_chodba_dub_1nb_grid_ac_in_phase_a_vykon',
  },
  phase_b: {
    voltage: 'sensor.dub_1nb_grid_ac_in_phase_b_napeti',
    current: 'sensor.dub_1nb_grid_ac_in_phase_b_proud',
    power: 'sensor.1np_vstupni_chodba_dub_1nb_grid_ac_in_phase_b_vykon',
  },
  phase_c: {
    voltage: 'sensor.dub_1nb_grid_ac_in_phase_c_napeti',
    current: 'sensor.dub_1nb_grid_ac_in_phase_c_proud',
    power: 'sensor.1np_vstupni_chodba_dub_1nb_grid_ac_in_phase_c_vykon',
  },
  total_power: 'sensor.1np_vstupni_chodba_dub_1nb_grid_ac_in_vykon',
  total_energy: 'sensor.1np_vstupni_chodba_dub_1nb_grid_ac_in_energie',
};

type PhaseKey = 'a' | 'b' | 'c';

/** CZ/EU barvy vodičů — na tmavém pozadí je „černá“ fáze světlejší grafit. */
const PHASE_COLOR: Record<PhaseKey, string> = {
  a: '#c4783a', // hnědá (L1 / LA)
  b: '#90a4ae', // černá → grafit (L2 / LB)
  c: '#b0bec5', // šedá (L3 / LC)
};
const NEUTRAL_COLOR = '#42a5f5';
const SHELLY_BLUE = '#1e88e5';

/**
 * Layout podle Shelly Cloud Diagram view (viewBox 680×600).
 * Meter záměrně vyšší — Reset nesmí zasahovat do Count.
 */
const VB = { w: 680, h: 600 };

const M = { x: 380, y: 24, w: 128, h: 470 };

const TERM = {
  leftX: M.x + 36,
  rightX: M.x + 92,
  cnY: M.y + 32,
  abY: M.y + 82,
  iaibY: M.y + M.h - 78,
  icinY: M.y + M.h - 32,
  tw: 42,
  th: 36,
};

const CT_SIZE = 50;

/**
 * Vstupní linky — tři rovnoběžky; do svorek C/A/B jako u IA/IC (bokem).
 * Napětí + custom name na jednom řádku; hodnota a vodič vpravo.
 */
const PHASE_LINE_STEP = 36;
const PHASE_LINES: Array<{
  key: PhaseKey;
  label: string;
  y: number;
  termX: number;
  termY: number;
}> = [
  {
    key: 'c',
    label: 'LC',
    y: TERM.cnY,
    termX: TERM.leftX,
    termY: TERM.cnY,
  },
  {
    key: 'b',
    label: 'LB',
    y: TERM.cnY + PHASE_LINE_STEP,
    termX: TERM.rightX,
    termY: TERM.abY,
  },
  {
    key: 'a',
    label: 'LA',
    y: TERM.cnY + 2 * PHASE_LINE_STEP,
    termX: TERM.leftX,
    termY: TERM.abY,
  },
];

/** CT clampy TC / TB / TA — níž, ať nekolidují s horními fázemi / custom name. */
const CLAMP_Y = 340;
const CLAMP_CENTER_X = 200;
const CLAMP_STEP = 110;

const CLAMPS: Array<{
  key: PhaseKey;
  label: string;
  y: number;
  termX: number;
  termY: number;
  /**
   * side = vodorovně do svorky (TA→IA, TC→IC).
   * around-right = IB doprava → dolů → spodkem → nahoru k TB (obchází IN).
   */
  route: 'side' | 'around-right';
  busY?: number;
}> = [
  { key: 'c', label: 'TC', y: CLAMP_Y, termX: TERM.leftX, termY: TERM.icinY, route: 'side' },
  {
    key: 'b',
    label: 'TB',
    y: CLAMP_Y,
    termX: TERM.rightX,
    termY: TERM.iaibY,
    route: 'around-right',
    busY: 530,
  },
  { key: 'a', label: 'TA', y: CLAMP_Y, termX: TERM.leftX, termY: TERM.iaibY, route: 'side' },
];

const TN = { x: 580, y: CLAMP_Y, termX: TERM.rightX, termY: TERM.icinY, route: 'side' as const };

@customElement('shelly-3em-diagram-card')
export class Shelly3emDiagramCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: Shelly3emDiagramCardConfig;

  public static getStubConfig(): Shelly3emDiagramCardConfig {
    return {
      ...STUB,
      phase_a: { ...STUB.phase_a },
      phase_b: { ...STUB.phase_b },
      phase_c: { ...STUB.phase_c },
    };
  }

  public static async getConfigElement(): Promise<HTMLElement> {
    return document.createElement('shelly-3em-diagram-card-editor');
  }

  public setConfig(config: Shelly3emDiagramCardConfig): void {
    if (!config) throw new Error('Missing configuration');
    this._config = { ...config };
  }

  public getCardSize(): number {
    return 9;
  }

  public getGridOptions(): Record<string, unknown> {
    return { columns: 12, rows: 7, min_rows: 5 };
  }

  private _phase(key: PhaseKey): PhaseConfig | undefined {
    if (!this._config) return undefined;
    if (key === 'a') return this._config.phase_a;
    if (key === 'b') return this._config.phase_b;
    return this._config.phase_c;
  }

  /** Entita je „vyplněná“ v configu (neprázdný string). */
  private _filled(entityId?: string): boolean {
    return typeof entityId === 'string' && entityId.trim().length > 0;
  }

  /** CT clamp fáze jen když je vyplněný proud nebo výkon. */
  private _showPhaseClamp(key: PhaseKey): boolean {
    const p = this._phase(key);
    return this._filled(p?.current) || this._filled(p?.power);
  }

  /** Vstupní linka napětí (LA/LB/LC) jen když je vyplněné napětí. */
  private _showPhaseLine(key: PhaseKey): boolean {
    return this._filled(this._phase(key)?.voltage);
  }

  /**
   * Aktivní CT clampy s X vycentrovaným podle počtu:
   * 3 → 90/200/310, 2 → 145/255, 1 → 200 (střed jako TB).
   */
  private _layoutPhaseClamps(): Array<(typeof CLAMPS)[number] & { x: number }> {
    const visible = CLAMPS.filter((c) => this._showPhaseClamp(c.key));
    const n = visible.length;
    if (n === 0) return [];
    const start = CLAMP_CENTER_X - ((n - 1) * CLAMP_STEP) / 2;
    return visible.map((c, i) => ({ ...c, x: start + i * CLAMP_STEP }));
  }

  private _onValueClick(entityId: string | undefined, ev: Event): void {
    ev.stopPropagation();
    moreInfo(this, entityId);
  }

  /** Reset Shelly přes button.press — nejdřív potvrzovací dialog. */
  private async _onResetClick(ev: Event): Promise<void> {
    ev.stopPropagation();
    const entityId = this._config?.reset_button;
    if (!this._filled(entityId) || !this.hass?.callService) return;

    const confirmed = await openConfirmDialog({
      title: 'Resetovat Shelly Pro 3EM?',
      message:
        'Zařízení se restartuje (Shelly Reset). Měření může na chvíli výpadnout. Opravdu pokračovat?',
      confirmLabel: 'Resetovat',
      accent: '#ff8a65',
    });
    if (!confirmed) return;

    await this.hass.callService('button', 'press', { entity_id: entityId });
  }

  protected render(): TemplateResult {
    if (!this._config) {
      return html`<ha-card><div class="warn">Chybí konfigurace karty.</div></ha-card>`;
    }

    const title = this._config.title ?? 'Shelly Pro 3EM';
    const totalP = this._config.total_power
      ? formatPower(toNum(this.hass, this._config.total_power))
      : null;
    const totalE = this._config.total_energy
      ? formatEnergy(toNum(this.hass, this._config.total_energy))
      : null;

    return html`
      <ha-card>
        <div class="header">
          <div class="header-main">
            <div class="title">${title}</div>
          </div>
          ${totalP || totalE
            ? html`<div class="totals">
                ${totalP
                  ? html`<button
                      class="value-btn"
                      type="button"
                      @click=${(e: Event) => this._onValueClick(this._config!.total_power, e)}
                    >
                      <span class="caption">Výkon</span>
                      <span class="num">${totalP}</span>
                    </button>`
                  : nothing}
                ${totalE
                  ? html`<button
                      class="value-btn"
                      type="button"
                      @click=${(e: Event) => this._onValueClick(this._config!.total_energy, e)}
                    >
                      <span class="caption">Energie</span>
                      <span class="num">${totalE}</span>
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
    const div4 = my + mh - 64;
    const nEnd = this._wireEnd(TERM.rightX, TERM.cnY, 'right');
    // LN u Shelly; vodič doprava (TN je níž, nahoře je volno) + popis na konci.
    const nWireOut = VB.w - 12;
    const nLabelLnX = nEnd.x + 22;

    return html`
      <svg
        viewBox="0 0 ${VB.w} ${VB.h}"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Shelly Pro 3EM diagram"
      >
        ${svg`<rect class="meter" x=${mx} y=${my} width=${mw} height=${mh} rx="3" />`}
        <!-- Jen jedna linka nad Power (mezi svorkami A/B/C/N a statusem) -->
        ${svg`<line class="meter-div" x1=${mx} y1=${div2} x2=${mx + mw} y2=${div2} />`}
        ${svg`<line class="meter-div" x1=${mx} y1=${div3} x2=${mx + mw} y2=${div3} />`}
        ${svg`<line class="meter-div" x1=${mx} y1=${div4} x2=${mx + mw} y2=${div4} />`}

        <!-- Horní vodiče až po meteru — viditelné na čele jako IA/IC -->
        ${PHASE_LINES.filter((line) => this._showPhaseLine(line.key)).map((line) =>
          this._renderPhaseLine(line),
        )}

        <!-- LN — do svorky N; na pravém konci vodiče „Nulový vodič“ -->
        ${svg`<path
          class="wire"
          fill="none"
          stroke=${NEUTRAL_COLOR}
          d=${`M ${nWireOut} ${TERM.cnY} L ${nEnd.x} ${nEnd.y}`}
        />`}
        ${svg`<text
          class="label"
          x=${nLabelLnX}
          y=${TERM.cnY - 10}
          text-anchor="start"
          fill=${NEUTRAL_COLOR}
        >LN</text>`}
        ${svg`<text
          class="phase-name"
          x=${nWireOut}
          y=${TERM.cnY - 10}
          text-anchor="end"
          fill=${NEUTRAL_COLOR}
        >Nulový vodič</text>`}

        <!-- Horní svorky až po vodičích -->
        ${this._terminal(TERM.leftX, TERM.cnY, 'C', PHASE_COLOR.c)}
        ${this._terminal(TERM.rightX, TERM.cnY, 'N', NEUTRAL_COLOR)}
        ${this._terminal(TERM.leftX, TERM.abY, 'A', PHASE_COLOR.a)}
        ${this._terminal(TERM.rightX, TERM.abY, 'B', PHASE_COLOR.b)}

        ${this._renderStatusPanel(mx + mw / 2, div2 + 20)}

        ${this._renderClampRowCaptions()}
        ${this._layoutPhaseClamps().map((c) => this._renderPhaseClamp(c))}
        ${this._renderNeutralClamp()}

        <!-- Spodní svorky až po vodičích — text nepřekryje linka -->
        ${this._terminal(TERM.leftX, TERM.iaibY, 'IA', PHASE_COLOR.a)}
        ${this._terminal(TERM.rightX, TERM.iaibY, 'IB', PHASE_COLOR.b)}
        ${this._terminal(TERM.leftX, TERM.icinY, 'IC', PHASE_COLOR.c)}
        ${this._terminal(TERM.rightX, TERM.icinY, 'IN', NEUTRAL_COLOR)}
      </svg>
    `;
  }

  /**
   * Status LEDs + Reset.
   * Wi-Fi / LAN svítí trvale když jsou entity v configu (hover = hodnota).
   * Count = krátký červený impuls podle |výkonu|.
   */
  private _renderStatusPanel(cx: number, topY: number): SVGTemplateResult {
    const countPower = this._countPowerAbs();
    const countPeriod = countBlinkDuration(countPower);
    const countFlash = 0.35; // s — délka impulzu
    const countOnEnd =
      countPeriod > 0 ? Math.min(0.49, countFlash / countPeriod) : 0;
    const wifiOn = this._filled(this._config?.wifi_signal);
    const lanOn = this._filled(this._config?.lan_link_speed);
    const wifiTip = wifiOn
      ? `Wi-Fi: ${formatEntityValue(this.hass, this._config?.wifi_signal)}`
      : undefined;
    const lanTip = lanOn
      ? `LAN: ${formatEntityValue(this.hass, this._config?.lan_link_speed)}`
      : undefined;

    const leds: Array<{
      name: string;
      color: string;
      active: boolean;
      title?: string;
      countPulse?: boolean;
    }> = [
      { name: 'Power', color: '#ff5252', active: true },
      {
        name: 'Wi-Fi',
        color: '#ffd740',
        active: wifiOn,
        title: wifiTip,
      },
      {
        name: 'LAN',
        color: '#69f0ae',
        active: lanOn,
        title: lanTip,
      },
      {
        name: 'Count',
        color: '#ff5252',
        active: countPeriod > 0,
        countPulse: countPeriod > 0,
      },
    ];
    const rowH = 32;
    const resetR = 28;
    const gapAfterCount = 56;
    const countY = topY + (leds.length - 1) * rowH;
    const resetTop = countY + gapAfterCount;
    // Baseline uprostřed mezery Count ↔ horní okraj Reset (+ drobný optický posun).
    const shellyY = (countY + resetTop) / 2 + 6;
    const resetCy = resetTop + resetR;
    const resetLive = this._filled(this._config?.reset_button);

    return svg`
      <g class="status-panel">
        ${leds.map((led, i) => {
          const cy = topY + i * rowH - 4;
          const lx = cx + 42;
          if (led.countPulse) {
            return svg`
              <text class="led-label" x=${cx - 44} y=${topY + i * rowH}>${led.name}</text>
              <circle
                class="led lit led-count"
                cx=${lx}
                cy=${cy}
                r="6.5"
                fill=${led.color}
                stroke=${led.color}
                opacity="0.08"
              >
                <animate
                  attributeName="opacity"
                  values="1;1;0.08;0.08"
                  keyTimes="0;${countOnEnd};${countOnEnd};1"
                  dur="${countPeriod}s"
                  repeatCount="indefinite"
                  calcMode="discrete"
                />
              </circle>
            `;
          }
          if (!led.active) {
            return svg`
              <text class="led-label dim" x=${cx - 44} y=${topY + i * rowH}>${led.name}</text>
              <circle class="led off" cx=${lx} cy=${cy} r="6.5" />
            `;
          }
          return svg`
            <text class="led-label" x=${cx - 44} y=${topY + i * rowH}>${led.name}</text>
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
          @click=${resetLive ? (e: Event) => void this._onResetClick(e) : nothing}
          @keydown=${resetLive
            ? (e: KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  void this._onResetClick(e);
                }
              }
            : nothing}
        >
          <circle class="reset-btn" cx=${cx} cy=${resetCy} r=${resetR} />
          <text class="reset-label" x=${cx} y=${resetCy + 5} text-anchor="middle">Reset</text>
        </g>
      </g>
    `;
  }

  /** |P| pro Count LED — total_power, jinak součet fází. */
  private _countPowerAbs(): number {
    if (this._filled(this._config?.total_power)) {
      return Math.abs(toNum(this.hass, this._config!.total_power));
    }
    let sum = 0;
    for (const key of ['a', 'b', 'c'] as PhaseKey[]) {
      const p = this._phase(key)?.power;
      if (this._filled(p)) sum += toNum(this.hass, p);
    }
    return Math.abs(sum);
  }

  private _terminal(cx: number, cy: number, label: string, color: string): SVGTemplateResult {
    const { tw: w, th: h } = TERM;
    return svg`
      <rect
        class="term"
        x=${cx - w / 2}
        y=${cy - h / 2}
        width=${w}
        height=${h}
        rx="2"
        stroke=${color}
      />
      <text class="term-label" x=${cx} y=${cy + 5} text-anchor="middle" fill=${color}>${label}</text>
    `;
  }

  /**
   * Vodič končí na okraji svorky (ne prochází textem).
   * approach: směr příchodu vodiče ke svorce.
   */
  private _wireEnd(
    termX: number,
    termY: number,
    approach: 'left' | 'right' | 'top' | 'bottom',
  ): { x: number; y: number } {
    const { tw: w, th: h } = TERM;
    switch (approach) {
      case 'left':
        return { x: termX - w / 2, y: termY };
      case 'right':
        return { x: termX + w / 2, y: termY };
      case 'top':
        return { x: termX, y: termY - h / 2 };
      case 'bottom':
        return { x: termX, y: termY + h / 2 };
    }
  }

  private _phaseName(key: PhaseKey): string | undefined {
    const name = this._phase(key)?.name;
    if (typeof name !== 'string') return undefined;
    const t = name.trim();
    return t.length > 0 ? t : undefined;
  }

  private _renderPhaseLine(line: (typeof PHASE_LINES)[number]): SVGTemplateResult {
    const phase = this._phase(line.key);
    const customName = this._phaseName(line.key);
    const vText = formatVoltage(toNum(this.hass, phase?.voltage));
    const color = PHASE_COLOR[line.key];
    // Napětí (+ name) vlevo; hodnota ve stejném středu jako TB (CLAMP_CENTER_X).
    // Vodič jako spodní linka pod celým textem Napětí + custom name.
    const valueX = CLAMP_CENTER_X;
    const wireStart = 14;
    const labelX = M.x - 18;
    // Stejný princip jako IA/IC: svisle na výšku svorky, pak vodorovně z boku.
    const riserX = M.x - 12;
    const midX = (TERM.leftX + TERM.rightX) / 2;

    let path: string;
    if (line.key === 'c') {
      const end = this._wireEnd(line.termX, line.termY, 'left');
      path = `M ${wireStart} ${line.y} L ${end.x} ${end.y}`;
    } else if (line.key === 'a') {
      const end = this._wireEnd(line.termX, line.termY, 'left');
      path = [
        `M ${wireStart} ${line.y}`,
        `L ${riserX} ${line.y}`,
        `L ${riserX} ${line.termY}`,
        `L ${end.x} ${end.y}`,
      ].join(' ');
    } else {
      // LB → B: svisle mezi A a B, pak zleva do B (ne přes střed A).
      const end = this._wireEnd(line.termX, line.termY, 'left');
      path = [
        `M ${wireStart} ${line.y}`,
        `L ${midX} ${line.y}`,
        `L ${midX} ${line.termY}`,
        `L ${end.x} ${end.y}`,
      ].join(' ');
    }

    return svg`
      <g class="phase-line">
        <path class="wire" fill="none" stroke=${color} d=${path} />
        <text class="caption" x="14" y=${line.y - 10}>Napětí</text>
        ${customName
          ? svg`<text class="phase-name" x="58" y=${line.y - 10} fill=${color}>${customName}</text>`
          : nothing}
        <text
          class="value clickable"
          x=${valueX}
          y=${line.y - 10}
          text-anchor="middle"
          fill=${color}
          @click=${(e: Event) => this._onValueClick(phase?.voltage, e)}
        >
          ${vText}
        </text>
        <text class="label" x=${labelX} y=${line.y - 10} text-anchor="end" fill=${color}>
          ${line.label}
        </text>
      </g>
    `;
  }

  /** Společné popisky Proud / Výkon vlevo od sloupců CT. */
  private _renderClampRowCaptions(): SVGTemplateResult | typeof nothing {
    const anyClamp =
      this._layoutPhaseClamps().length > 0 || this._filled(this._config?.neutral_current);
    if (!anyClamp) return nothing;
    return svg`
      <g class="clamp-captions">
        <text class="caption" x="14" y=${CLAMP_Y - 72}>Proud</text>
        <text class="caption" x="14" y=${CLAMP_Y - 46}>Výkon</text>
      </g>
    `;
  }

  private _renderPhaseClamp(
    c: (typeof CLAMPS)[number] & { x: number },
  ): SVGTemplateResult {
    const phase = this._phase(c.key);
    const customName = this._phaseName(c.key);
    const current = toNum(this.hass, phase?.current);
    const power = toNum(this.hass, phase?.power);
    const color = PHASE_COLOR[c.key];
    const clampBottom = c.y + CT_SIZE / 2;
    const path = this._clampWirePath(c.x, clampBottom, c.termX, c.termY, c.route, c.busY, 'left');

    return svg`
      <g class="phase-clamp">
        <path class="wire" fill="none" stroke=${color} d=${path} />
        ${customName
          ? svg`<text class="phase-name" x=${c.x} y=${c.y - 102} text-anchor="middle" fill=${color}>${customName}</text>`
          : nothing}
        ${this._filled(phase?.current)
          ? svg`
              <text
                class="value clickable"
                x=${c.x}
                y=${c.y - 72}
                text-anchor="middle"
                fill=${color}
                @click=${(e: Event) => this._onValueClick(phase?.current, e)}
              >
                ${formatCurrent(current)}
              </text>
            `
          : nothing}
        ${this._filled(phase?.power)
          ? svg`
              <text
                class="value clickable"
                x=${c.x}
                y=${c.y - 46}
                text-anchor="middle"
                fill=${color}
                @click=${(e: Event) => this._onValueClick(phase?.power, e)}
              >
                ${formatPower(power)}
              </text>
            `
          : nothing}
        ${this._ctIcon(
          c.x,
          c.y,
          c.label,
          this._filled(phase?.current) ? Math.abs(current) : 0,
          color,
          'left',
        )}
      </g>
    `;
  }

  /**
   * Vedení CT → svorka.
   * - side: svisle na výšku svorky, pak vodorovně (TA→IA, TC→IC, TN→IN).
   * - around-right: TB→IB — svisle dolů, spodkem doprava za IB, nahoru, zprava do IB
   *   (neprochází přes ikonu IN pod IB).
   */
  private _clampWirePath(
    clampX: number,
    clampBottom: number,
    termX: number,
    termY: number,
    route: 'side' | 'around-right',
    busY: number | undefined,
    approach: 'left' | 'right',
  ): string {
    if (route === 'side') {
      const end = this._wireEnd(termX, termY, approach);
      return [`M ${clampX} ${clampBottom}`, `L ${clampX} ${termY}`, `L ${end.x} ${end.y}`].join(' ');
    }

    // around-right (TB → IB)
    const bus = busY ?? termY + 80;
    const bypassX = termX + TERM.tw / 2 + 36;
    const end = this._wireEnd(termX, termY, 'right');
    return [
      `M ${clampX} ${clampBottom}`,
      `L ${clampX} ${bus}`,
      `L ${bypassX} ${bus}`,
      `L ${bypassX} ${termY}`,
      `L ${end.x} ${end.y}`,
    ].join(' ');
  }

  private _renderNeutralClamp(): SVGTemplateResult | typeof nothing {
    const entityId = this._config?.neutral_current;
    if (!this._filled(entityId)) return nothing;

    const current = toNum(this.hass, entityId);
    const clampBottom = TN.y + CT_SIZE / 2;
    // TN je vpravo → vodorovně doleva do IN (side zprava)
    const path = this._clampWirePath(
      TN.x,
      clampBottom,
      TN.termX,
      TN.termY,
      'side',
      undefined,
      'right',
    );

    return svg`
      <g class="neutral-clamp">
        <path class="wire" fill="none" stroke=${NEUTRAL_COLOR} d=${path} />
        <text class="caption" x=${TN.x} y=${TN.y - 72} text-anchor="middle">Proud</text>
        <text
          class="value clickable"
          x=${TN.x}
          y=${TN.y - 46}
          text-anchor="middle"
          fill=${NEUTRAL_COLOR}
          @click=${(e: Event) => this._onValueClick(entityId, e)}
        >
          ${formatCurrent(current)}
        </text>
        ${this._ctIcon(TN.x, TN.y, 'TN', Math.abs(current), NEUTRAL_COLOR)}
      </g>
    `;
  }

  /** CT clamp 50×50: zaoblený čtverec + otevřený kruh + pulzující střed. */
  private _ctIcon(
    cx: number,
    cy: number,
    label: string,
    currentAbs: number,
    color: string,
    labelSide: 'bottom' | 'left' = 'bottom',
  ): SVGTemplateResult {
    const dur = clampPulseDuration(currentAbs);
    const s = CT_SIZE;
    const h = s / 2;
    const r = 15;
    const gap = 48;
    const start = ((-90 + gap / 2) * Math.PI) / 180;
    const endAng = ((-90 - gap / 2 + 360) * Math.PI) / 180;
    const x1 = h + r * Math.cos(start);
    const y1 = h + r * Math.sin(start);
    const x2 = h + r * Math.cos(endAng);
    const y2 = h + r * Math.sin(endAng);
    const arc = `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 1 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;

    const labelEl =
      labelSide === 'left'
        ? svg`<text class="label" x=${-6} y=${h + 4} text-anchor="end" fill=${color}>${label}</text>`
        : svg`<text class="label" x=${h} y=${s + 16} text-anchor="middle" fill=${color}>${label}</text>`;

    return svg`
      <g class="ct-clamp" transform="translate(${cx - h}, ${cy - h})">
        <rect class="ct-body" x="1" y="1" width=${s - 2} height=${s - 2} rx="7" stroke=${color} />
        <path class="ct-ring" fill="none" stroke=${color} d=${arc} />
        <circle
          class="ct-dot ${dur > 0 ? 'pulse' : ''}"
          cx=${h}
          cy=${h}
          r="3.5"
          fill=${color}
          style=${dur > 0 ? `--pulse-dur:${dur}s` : ''}
        />
        ${labelEl}
      </g>
    `;
  }

  static styles = css`
    :host {
      display: block;
      --diagram-accent: #4fc3f7;
      --diagram-bg: #0f1419;
      --shelly-blue: #1e88e5;
    }

    ha-card {
      background: var(--card-background-color, var(--diagram-bg));
      overflow: hidden;
      padding: 10px 4px 2px;
      color: var(--primary-text-color, #fff);
    }

    .header {
      display: flex;
      align-items: flex-start;
      min-height: 2.4em;
      padding: 0 12px 4px;
      gap: 12px;
    }

    .header-main {
      flex: 1;
      min-width: 0;
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }

    .title {
      max-width: 100%;
      text-align: center;
      font-size: 1.25rem;
      font-weight: 600;
      letter-spacing: 0.01em;
      color: var(--primary-text-color, #fff);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .totals {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 6px;
      flex-shrink: 0;
    }

    .value-btn {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      font: inherit;
      display: inline-flex;
      flex-direction: row;
      align-items: baseline;
      gap: 8px;
      line-height: 1.2;
      text-align: right;
    }

    .value-btn .caption {
      color: var(--secondary-text-color, rgba(255, 255, 255, 0.55));
      font-size: 0.65rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .value-btn .num {
      color: var(--diagram-accent);
      font-size: 0.85rem;
      font-variant-numeric: tabular-nums;
      font-weight: 500;
    }

    .value-btn:hover .num {
      text-decoration: underline;
    }

    .diagram {
      width: 100%;
      line-height: 0;
    }

    svg {
      width: 100%;
      height: auto;
      display: block;
    }

    .wire {
      stroke-width: 2;
      stroke-linecap: square;
      stroke-linejoin: miter;
      fill: none;
    }

    .meter {
      fill: rgba(30, 136, 229, 0.08);
      stroke: var(--shelly-blue);
      stroke-width: 2;
    }

    .meter-div {
      stroke: var(--shelly-blue);
      stroke-width: 1.2;
      opacity: 0.55;
    }

    .term {
      fill: var(--card-background-color, var(--diagram-bg));
      stroke-width: 1.6;
    }

    .term-label {
      font-size: 13px;
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
      font-weight: 650;
    }

    .label {
      font-size: 12px;
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
      font-weight: 600;
    }

    .caption {
      fill: rgba(255, 255, 255, 0.45);
      font-size: 10px;
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
      font-weight: 500;
      letter-spacing: 0.02em;
    }

    .phase-name {
      font-size: 11px;
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
      font-weight: 600;
      letter-spacing: 0.01em;
      opacity: 0.92;
    }

    .value {
      font-size: 13px;
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
      font-variant-numeric: tabular-nums;
      font-weight: 600;
    }

    .value.clickable {
      cursor: pointer;
    }

    .value.clickable:hover {
      filter: brightness(1.2);
      text-decoration: underline;
    }

    .led-label {
      fill: rgba(255, 255, 255, 0.75);
      font-size: 12px;
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    }

    .led-label.dim {
      fill: rgba(255, 255, 255, 0.35);
    }

    .led.off {
      fill: none;
      stroke: rgba(255, 255, 255, 0.28);
      stroke-width: 1.2;
    }

    .led {
      stroke-width: 1.2;
    }

    .led.lit {
      filter: drop-shadow(0 0 4px var(--led-glow, #fff));
    }

    .led-count {
      filter: drop-shadow(0 0 4px #ff5252);
    }

    .shelly-brand {
      fill: rgba(255, 255, 255, 0.78);
      font-size: 20px;
      font-family: 'Segoe Script', 'Snell Roundhand', 'Apple Chancery', 'Brush Script MT', cursive;
      font-style: italic;
      font-weight: 600;
      letter-spacing: 0.01em;
      pointer-events: none;
      user-select: none;
    }

    .reset-btn {
      /* transparent fill = celá plocha klikací (fill:none chytá jen stroke) */
      fill: transparent;
      stroke: var(--shelly-blue);
      stroke-width: 1.8;
      pointer-events: all;
    }

    .reset-label {
      fill: var(--shelly-blue);
      font-size: 13px;
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
      font-weight: 600;
      pointer-events: none;
    }

    .reset-group.live {
      cursor: pointer;
      pointer-events: all;
    }

    .reset-group.live:hover .reset-btn,
    .reset-group.live:focus-visible .reset-btn {
      stroke: var(--diagram-accent);
      fill: rgba(79, 195, 247, 0.1);
    }

    .reset-group.live:hover .reset-label,
    .reset-group.live:focus-visible .reset-label {
      fill: var(--diagram-accent);
    }

    .reset-group.live:focus {
      outline: none;
    }

    .ct-body {
      fill: rgba(15, 20, 25, 0.92);
      stroke-width: 1.8;
    }

    .ct-ring {
      stroke-width: 1.8;
      stroke-linecap: round;
    }

    .ct-dot {
      opacity: 0.45;
    }

    .ct-dot.pulse {
      opacity: 1;
      animation: ct-pulse var(--pulse-dur, 1.5s) ease-in-out infinite;
      transform-origin: center;
      transform-box: fill-box;
    }

    @keyframes ct-pulse {
      0%,
      100% {
        opacity: 0.35;
        transform: scale(0.7);
      }
      50% {
        opacity: 1;
        transform: scale(1.25);
      }
    }

    .warn {
      padding: 16px;
      color: var(--error-color, #ff5252);
    }
  `;
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'shelly-3em-diagram-card',
  name: 'Shelly 3EM Diagram Card',
  description: 'Live diagram Shelly Pro 3EM — napětí, proud a výkon po fázích.',
  preview: true,
  documentationURL: 'https://github.com/elvisek2020/fve-shelly-card',
});

console.info(
  `%c SHELLY-3EM-DIAGRAM-CARD %c v${CARD_VERSION} `,
  'background:#0f1419;color:#4fc3f7;font-weight:bold',
  'background:#4fc3f7;color:#0f1419;font-weight:bold',
);
