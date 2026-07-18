import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, PhaseConfig, Shelly3emDiagramCardConfig } from './types';
import {
  clampPulseDuration,
  formatCurrent,
  formatEnergy,
  formatPower,
  formatVoltage,
  moreInfo,
  toNum,
} from './utils';

/** Nahrazuje Rollup replace z package.json version. */
const CARD_VERSION = '__CARD_VERSION__';

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

interface PhaseLayout {
  key: PhaseKey;
  /** Popisek vstupu (LA/LB/LC). */
  lineLabel: string;
  /** Popisek CT clampu (TA/TB/TC). */
  clampLabel: string;
  /** Y vstupní vodorovné linky. */
  lineY: number;
  /** X středu CT clampu. */
  clampX: number;
  /** Svorka fáze nahoře (A/B/C) — X uvnitř meteru. */
  termX: number;
  /** Svorka výstupu CT (IA/IB/IC). */
  outTerm: string;
  outTermX: number;
  outTermY: number;
}

/**
 * Layout viewBox 560×400 — měřítko odpovídá Shelly Cloud Diagram view.
 * Meter blok je vpravo od středu; CT clampy dole vlevo; TN vpravo.
 */
const METER = { x: 300, y: 48, w: 100, h: 280 };
const PHASES: PhaseLayout[] = [
  {
    key: 'c',
    lineLabel: 'LC',
    clampLabel: 'TC',
    lineY: 78,
    clampX: 70,
    termX: METER.x + 28,
    outTerm: 'IC',
    outTermX: METER.x + 28,
    outTermY: METER.y + METER.h - 28,
  },
  {
    key: 'b',
    lineLabel: 'LB',
    clampLabel: 'TB',
    lineY: 118,
    clampX: 150,
    termX: METER.x + 72,
    outTerm: 'IB',
    outTermX: METER.x + 72,
    outTermY: METER.y + METER.h - 68,
  },
  {
    key: 'a',
    lineLabel: 'LA',
    clampLabel: 'TA',
    lineY: 158,
    clampX: 230,
    termX: METER.x + 28,
    outTerm: 'IA',
    outTermX: METER.x + 28,
    outTermY: METER.y + METER.h - 68,
  },
];

@customElement('shelly-3em-diagram-card')
export class Shelly3emDiagramCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: Shelly3emDiagramCardConfig;

  public static getStubConfig(): Shelly3emDiagramCardConfig {
    return { ...STUB, phase_a: { ...STUB.phase_a }, phase_b: { ...STUB.phase_b }, phase_c: { ...STUB.phase_c } };
  }

  public setConfig(config: Shelly3emDiagramCardConfig): void {
    if (!config) throw new Error('Missing configuration');
    this._config = { ...config };
  }

  public getCardSize(): number {
    return 8;
  }

  public getGridOptions(): Record<string, unknown> {
    return { columns: 12, rows: 6, min_rows: 4 };
  }

  private _phase(key: PhaseKey): PhaseConfig | undefined {
    if (!this._config) return undefined;
    if (key === 'a') return this._config.phase_a;
    if (key === 'b') return this._config.phase_b;
    return this._config.phase_c;
  }

  private _onValueClick(entityId: string | undefined, ev: Event): void {
    ev.stopPropagation();
    moreInfo(this, entityId);
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
          <div class="header-left">
            <div class="title">${title}</div>
            ${totalP || totalE
              ? html`<div class="totals">
                  ${totalP
                    ? html`<button
                        class="value-btn"
                        type="button"
                        @click=${(e: Event) => this._onValueClick(this._config!.total_power, e)}
                      >
                        ${totalP}
                      </button>`
                    : nothing}
                  ${totalE
                    ? html`<button
                        class="value-btn"
                        type="button"
                        @click=${(e: Event) => this._onValueClick(this._config!.total_energy, e)}
                      >
                        ${totalE}
                      </button>`
                    : nothing}
                </div>`
              : nothing}
          </div>
          <div class="header-icons" aria-hidden="true">
            <svg class="status-icon" viewBox="0 0 24 24" width="18" height="18">
              <path
                fill="currentColor"
                d="M12 3C7.5 3 3.5 5.1 1 8.3l1.6 1.6C4.7 7.5 8.1 6 12 6s7.3 1.5 9.4 3.9L23 8.3C20.5 5.1 16.5 3 12 3zm0 6c-2.7 0-5.1 1-7 2.6L6.6 13C8 11.8 9.9 11 12 11s4 0.8 5.4 2l1.6-1.4C17.1 10 14.7 9 12 9zm0 6c-1.2 0-2.3.4-3.2 1.1L12 21l3.2-4.9C14.3 15.4 13.2 15 12 15z"
              />
            </svg>
            <svg class="status-icon" viewBox="0 0 24 24" width="18" height="18">
              <path
                fill="currentColor"
                d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"
              />
            </svg>
          </div>
        </div>
        <div class="diagram">${this._renderSvg()}</div>
      </ha-card>
    `;
  }

  private _renderSvg(): TemplateResult {
    const mx = METER.x;
    const my = METER.y;
    const mw = METER.w;
    const mh = METER.h;

    // Svorky: C/N nahoře, A/B pod nimi, IA/IB, IC/IN dole
    const termCN_Y = my + 22;
    const termAB_Y = my + 62;
    const termIAIB_Y = my + mh - 68;
    const termICIN_Y = my + mh - 28;

    const tnX = mx + mw + 70;
    const tnY = 250;
    const wireBottom = 340;

    return html`
      <svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Shelly Pro 3EM diagram">
        <!-- Vstupní fáze LC / LB / LA -->
        ${PHASES.map((p) => this._renderPhaseInput(p))}

        <!-- LN výstup z N doprava -->
        <line class="wire" x1=${mx + 72} y1=${termCN_Y} x2="520" y2=${termCN_Y} />
        <text class="label" x="500" y=${termCN_Y - 8} text-anchor="end">LN</text>

        <!-- Meter body -->
        <rect class="meter" x=${mx} y=${my} width=${mw} height=${mh} rx="4" />

        <!-- Vnitřní oddělovače -->
        <line class="meter-div" x1=${mx} y1=${my + 42} x2=${mx + mw} y2=${my + 42} />
        <line class="meter-div" x1=${mx} y1=${my + 82} x2=${mx + mw} y2=${my + 82} />
        <line class="meter-div" x1=${mx} y1=${my + mh - 88} x2=${mx + mw} y2=${my + mh - 88} />
        <line class="meter-div" x1=${mx} y1=${my + mh - 48} x2=${mx + mw} y2=${my + mh - 48} />

        <!-- Svorky C N -->
        ${this._terminal(mx + 28, termCN_Y, 'C')}
        ${this._terminal(mx + 72, termCN_Y, 'N')}

        <!-- Svorky A B -->
        ${this._terminal(mx + 28, termAB_Y, 'A')}
        ${this._terminal(mx + 72, termAB_Y, 'B')}

        <!-- Status LEDs + Reset (dekorativní) -->
        <g class="status-panel" transform="translate(${mx + 18}, ${my + 108})">
          ${(['Power', 'Wi-Fi', 'LAN', 'Count'] as const).map(
            (name, i) => html`
              <text class="led-label" x="0" y=${i * 22}>${name}</text>
              <circle class="led" cx="62" cy=${i * 22 - 4} r="5" />
            `,
          )}
          <circle class="reset-btn" cx="42" cy="108" r="22" />
          <text class="reset-label" x="42" y="112" text-anchor="middle">Reset</text>
        </g>

        <!-- Svorky IA IB -->
        ${this._terminal(mx + 28, termIAIB_Y, 'IA')}
        ${this._terminal(mx + 72, termIAIB_Y, 'IB')}

        <!-- Svorky IC IN -->
        ${this._terminal(mx + 28, termICIN_Y, 'IC')}
        ${this._terminal(mx + 72, termICIN_Y, 'IN')}

        <!-- CT clampy + smyčky fází -->
        ${PHASES.map((p) => this._renderPhaseClamp(p, wireBottom))}

        <!-- TN clamp + smyčka k IN -->
        ${this._renderCtClamp(tnX, tnY, 'TN', 0)}
        <path
          class="wire"
          fill="none"
          d="M ${mx + 72} ${termICIN_Y}
             L ${mx + 72} ${wireBottom}
             L ${tnX} ${wireBottom}
             L ${tnX} ${tnY + 22}"
        />
      </svg>
    `;
  }

  private _terminal(cx: number, cy: number, label: string): TemplateResult {
    return html`
      <rect class="term" x=${cx - 14} y=${cy - 12} width="28" height="24" rx="2" />
      <text class="term-label" x=${cx} y=${cy + 4} text-anchor="middle">${label}</text>
    `;
  }

  private _renderPhaseInput(p: PhaseLayout): TemplateResult {
    const phase = this._phase(p.key);
    const v = toNum(this.hass, phase?.voltage);
    const vText = formatVoltage(v);
    // C → horní svorka C; A/B → střední svorky
    const entryY = p.key === 'c' ? METER.y + 22 : METER.y + 62;
    const entryX = p.termX;

    return html`
      <g class="phase-in">
        <path
          class="wire"
          fill="none"
          d="M 16 ${p.lineY} L ${entryX} ${p.lineY} L ${entryX} ${entryY}"
        />
        <text class="label" x="20" y=${p.lineY - 8}>${p.lineLabel}</text>
        <text
          class="value clickable"
          x="90"
          y=${p.lineY - 8}
          @click=${(e: Event) => this._onValueClick(phase?.voltage, e)}
        >
          ${vText}
        </text>
      </g>
    `;
  }

  private _renderPhaseClamp(p: PhaseLayout, wireBottom: number): TemplateResult {
    const phase = this._phase(p.key);
    const current = toNum(this.hass, phase?.current);
    const power = toNum(this.hass, phase?.power);
    const clampY = 250;

    // Smyčka: z výstupní svorky dolů → doleva k clampu → nahoru do clampu
    const path = `
      M ${p.outTermX} ${p.outTermY}
      L ${p.outTermX} ${wireBottom}
      L ${p.clampX} ${wireBottom}
      L ${p.clampX} ${clampY + 22}
    `;

    return html`
      <g class="phase-clamp">
        <!-- Hodnoty nad clampem -->
        <text
          class="value clickable"
          x=${p.clampX}
          y=${clampY - 48}
          text-anchor="middle"
          @click=${(e: Event) => this._onValueClick(phase?.current, e)}
        >
          ${formatCurrent(current)}
        </text>
        <text
          class="value clickable"
          x=${p.clampX}
          y=${clampY - 30}
          text-anchor="middle"
          @click=${(e: Event) => this._onValueClick(phase?.power, e)}
        >
          ${formatPower(power)}
        </text>
        ${this._renderCtClamp(p.clampX, clampY, p.clampLabel, Math.abs(current))}
        <path class="wire" fill="none" d=${path} />
      </g>
    `;
  }

  private _renderCtClamp(cx: number, cy: number, label: string, currentAbs: number): TemplateResult {
    const dur = clampPulseDuration(currentAbs);
    const size = 36;
    const half = size / 2;

    return html`
      <g class="ct-clamp" transform="translate(${cx - half}, ${cy - half})">
        <rect class="ct-body" x="0" y="0" width=${size} height=${size} rx="3" />
        <circle class="ct-ring" cx=${half} cy=${half} r="11" />
        <circle
          class="ct-dot ${dur > 0 ? 'pulse' : ''}"
          cx=${half}
          cy=${half}
          r="3.5"
          style=${dur > 0 ? `--pulse-dur:${dur}s` : ''}
        />
        <text class="label" x=${half} y=${size + 14} text-anchor="middle">${label}</text>
      </g>
    `;
  }

  static styles = css`
    :host {
      display: block;
      --diagram-accent: var(--primary-color, #4fc3f7);
      --diagram-line: var(--primary-text-color, #e0e6ed);
      --diagram-muted: var(--secondary-text-color, #9aa5b1);
      --diagram-bg: var(--card-background-color, #0f1419);
    }

    ha-card {
      background: var(--diagram-bg);
      overflow: hidden;
      padding: 12px 8px 8px;
    }

    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 0 8px 4px;
      gap: 12px;
    }

    .title {
      font-size: 1.05rem;
      font-weight: 500;
      color: var(--diagram-line);
      letter-spacing: 0.02em;
    }

    .totals {
      display: flex;
      gap: 12px;
      margin-top: 4px;
    }

    .value-btn {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      color: var(--diagram-accent);
      font: inherit;
      font-size: 0.85rem;
      font-variant-numeric: tabular-nums;
    }

    .value-btn:hover {
      text-decoration: underline;
    }

    .header-icons {
      display: flex;
      gap: 8px;
      color: var(--diagram-muted);
      padding-top: 2px;
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
      stroke: var(--diagram-line);
      stroke-width: 1.2;
      fill: none;
      opacity: 0.85;
    }

    .meter {
      fill: transparent;
      stroke: var(--diagram-line);
      stroke-width: 1.4;
    }

    .meter-div {
      stroke: var(--diagram-line);
      stroke-width: 1;
      opacity: 0.55;
    }

    .term {
      fill: transparent;
      stroke: var(--diagram-line);
      stroke-width: 1.1;
    }

    .term-label {
      fill: var(--diagram-line);
      font-size: 11px;
      font-family: system-ui, -apple-system, sans-serif;
      font-weight: 500;
    }

    .label {
      fill: var(--diagram-muted);
      font-size: 11px;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .value {
      fill: var(--diagram-accent);
      font-size: 12px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-variant-numeric: tabular-nums;
    }

    .value.clickable {
      cursor: pointer;
    }

    .value.clickable:hover {
      text-decoration: underline;
    }

    .led-label {
      fill: var(--diagram-muted);
      font-size: 10px;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .led {
      fill: none;
      stroke: var(--diagram-line);
      stroke-width: 1.2;
    }

    .reset-btn {
      fill: none;
      stroke: var(--diagram-line);
      stroke-width: 1.4;
    }

    .reset-label {
      fill: var(--diagram-line);
      font-size: 10px;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .ct-body {
      fill: none;
      stroke: var(--diagram-line);
      stroke-width: 1.3;
    }

    .ct-ring {
      fill: none;
      stroke: var(--diagram-line);
      stroke-width: 1.3;
    }

    .ct-dot {
      fill: var(--diagram-accent);
      opacity: 0.35;
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
        transform: scale(0.75);
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
  `%c SHELLY-3EM-DIAGRAM-CARD %c ${CARD_VERSION} `,
  'background:#0f1419;color:#4fc3f7;font-weight:bold',
  'background:#4fc3f7;color:#0f1419;font-weight:bold',
);
