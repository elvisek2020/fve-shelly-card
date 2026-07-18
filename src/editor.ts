import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, Shelly3emDiagramCardConfig } from './types';
import { fireEvent } from './utils';

const ENTITY = { entity: { domain: 'sensor' } };
const BUTTON = { entity: { domain: 'button' } };
const TEXT = { text: {} };

const PHASE_SCHEMA = [
  { name: 'voltage', selector: ENTITY, custom_label: 'Napětí (V)' },
  { name: 'current', selector: ENTITY, custom_label: 'Proud (A)' },
  { name: 'power', selector: ENTITY, custom_label: 'Výkon (W)' },
];

/** Schéma vizuálního editoru — entity pickery přes ha-form. */
const SCHEMA = [
  { name: 'title', selector: TEXT },
  {
    name: 'phase_a',
    type: 'expandable',
    title: 'Fáze A (LA / TA)',
    icon: 'mdi:alpha-a-circle',
    schema: PHASE_SCHEMA,
  },
  {
    name: 'phase_b',
    type: 'expandable',
    title: 'Fáze B (LB / TB)',
    icon: 'mdi:alpha-b-circle',
    schema: PHASE_SCHEMA,
  },
  {
    name: 'phase_c',
    type: 'expandable',
    title: 'Fáze C (LC / TC)',
    icon: 'mdi:alpha-c-circle',
    schema: PHASE_SCHEMA,
  },
  {
    name: 'totals',
    type: 'expandable',
    flatten: true,
    title: 'Celkové hodnoty (header)',
    icon: 'mdi:sigma',
    schema: [
      { name: 'total_power', selector: ENTITY, custom_label: 'Celkový výkon (W)' },
      { name: 'total_energy', selector: ENTITY, custom_label: 'Celková energie (kWh)' },
    ],
  },
  {
    name: 'neutral',
    type: 'expandable',
    flatten: true,
    title: 'Neutrál (TN)',
    icon: 'mdi:circle-outline',
    schema: [
      {
        name: 'neutral_current',
        selector: ENTITY,
        custom_label: 'Proud neutrálu (A)',
      },
    ],
  },
  {
    name: 'device',
    type: 'expandable',
    flatten: true,
    title: 'Zařízení',
    icon: 'mdi:restart',
    schema: [
      {
        name: 'wifi_signal',
        selector: ENTITY,
        custom_label: 'Síla Wi-Fi signálu',
      },
      {
        name: 'lan_link_speed',
        selector: ENTITY,
        custom_label: 'Rychlost LAN linky',
      },
      {
        name: 'reset_button',
        selector: BUTTON,
        custom_label: 'Reset (button.*)',
      },
    ],
  },
];

const LABELS: Record<string, string> = {
  title: 'Titulek karty',
  phase_a: 'Fáze A',
  phase_b: 'Fáze B',
  phase_c: 'Fáze C',
  voltage: 'Napětí (V)',
  current: 'Proud (A)',
  power: 'Výkon (W)',
  total_power: 'Celkový výkon (W)',
  total_energy: 'Celková energie (kWh)',
  neutral_current: 'Proud neutrálu (A)',
  reset_button: 'Reset (button.*)',
  wifi_signal: 'Síla Wi-Fi signálu',
  lan_link_speed: 'Rychlost LAN linky',
};

const HELPERS: Record<string, string> = {
  title: 'Zobrazí se vlevo nahoře na kartě (např. DUB-1NP-FVE-AC-OUT).',
  voltage: 'Sensor napětí dané fáze ze Shelly Pro 3EM.',
  current: 'Sensor proudu dané fáze — bez něj se CT clamp (TA/TB/TC) nezobrazí.',
  power: 'Sensor aktivního výkonu dané fáze — stačí i bez proudu pro zobrazení clampu.',
  total_power: 'Volitelné — zobrazí se vpravo nahoře (řádek Výkon).',
  total_energy: 'Volitelné — zobrazí se vpravo nahoře pod výkonem (řádek Energie).',
  neutral_current: 'Volitelné — pokud je vyplněno, zobrazí se CT clamp TN vpravo.',
  reset_button:
    'Shelly button entita (typicky …_reset nebo …_restart). Klik na Reset v diagramu nejdřív zobrazí potvrzení, pak zavolá button.press.',
  wifi_signal:
    'Typicky sensor …_rssi / …_signal_strength. Když je vyplněno, LED Wi-Fi svítí; při najetí myší se ukáže síla signálu.',
  lan_link_speed:
    'Typicky sensor …_link_speed / …_ethernet. Když je vyplněno, LED LAN svítí; při najetí myší se ukáže rychlost linky.',
};

@customElement('shelly-3em-diagram-card-editor')
export class Shelly3emDiagramCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: Shelly3emDiagramCardConfig;

  public setConfig(config: Shelly3emDiagramCardConfig): void {
    this._config = config;
  }

  private _computeLabel = (schema: { name: string; custom_label?: string }): string =>
    schema.custom_label ?? LABELS[schema.name] ?? schema.name;

  private _computeHelper = (schema: { name: string }): string | undefined => HELPERS[schema.name];

  protected render(): TemplateResult {
    if (!this.hass || !this._config) return html``;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._changed}
      ></ha-form>
    `;
  }

  private _changed(ev: CustomEvent): void {
    ev.stopPropagation();
    const config = ev.detail.value as Shelly3emDiagramCardConfig;
    this._config = config;
    fireEvent(this, 'config-changed', { config });
  }

  static styles = css`
    :host {
      display: block;
    }
    ha-form {
      display: block;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'shelly-3em-diagram-card-editor': Shelly3emDiagramCardEditor;
  }
}
