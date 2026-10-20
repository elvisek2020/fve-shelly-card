import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, ShellyPro1DiagramCardConfig } from './types';
import { fireEvent } from './utils';

const SENSOR = { entity: { domain: 'sensor' } };
const TEXT = { text: {} };

const INPUT_SCHEMA = [
  {
    name: 'entity',
    selector: { entity: { domain: 'binary_sensor' } },
    custom_label: 'Stav vstupu',
    custom_helper: 'Typicky binary_sensor …_vstup_0 (SW1) nebo …_vstup_1 (SW2). Bez něj se vstup nezobrazí.',
  },
  {
    name: 'name',
    selector: TEXT,
    custom_label: 'Název vstupu',
    custom_helper: 'Volitelné — např. Vypínač u dveří.',
  },
];

/** Schéma vizuálního editoru — entity pickery přes ha-form. */
const SCHEMA = [
  { name: 'title', selector: TEXT },
  {
    name: 'output',
    type: 'expandable',
    flatten: true,
    expanded: true,
    title: 'Výstup relé (I / O)',
    icon: 'mdi:electric-switch',
    schema: [
      {
        name: 'switch',
        required: true,
        selector: { entity: { domain: ['switch', 'light', 'input_boolean'] } },
      },
      { name: 'name', selector: TEXT },
      { name: 'confirm', selector: { boolean: {} } },
    ],
  },
  {
    name: 'input_1',
    type: 'expandable',
    title: 'Vstup SW1',
    icon: 'mdi:numeric-1-box-outline',
    schema: INPUT_SCHEMA,
  },
  {
    name: 'input_2',
    type: 'expandable',
    title: 'Vstup SW2',
    icon: 'mdi:numeric-2-box-outline',
    schema: INPUT_SCHEMA,
  },
  {
    name: 'device',
    type: 'expandable',
    flatten: true,
    title: 'Zařízení',
    icon: 'mdi:restart',
    schema: [
      { name: 'temperature', selector: SENSOR },
      { name: 'firmware_update', selector: { entity: { domain: 'update' } } },
      { name: 'wifi_signal', selector: SENSOR },
      { name: 'lan_link_speed', selector: SENSOR },
      { name: 'reset_button', selector: { entity: { domain: 'button' } } },
    ],
  },
];

const LABELS: Record<string, string> = {
  title: 'Titulek karty',
  switch: 'Výstup (switch.*)',
  name: 'Název zátěže',
  confirm: 'Potvrzovat přepnutí',
  temperature: 'Teplota zařízení',
  firmware_update: 'Firmware (update.*)',
  wifi_signal: 'Síla Wi-Fi signálu',
  lan_link_speed: 'Rychlost LAN linky',
  reset_button: 'Restart (button.*)',
};

const HELPERS: Record<string, string> = {
  title: 'Zobrazí se uprostřed nahoře na kartě. Bez něj se použije název entity výstupu.',
  switch: 'Relé Shelly Pro 1 (typicky switch.<zařízení>). Klik na tlačítko nebo kontakt ho přepne.',
  name: 'Volitelné — co je na výstupu O připojené (např. Čerpadlo).',
  confirm: 'Před zapnutím i vypnutím se zobrazí potvrzovací dialog.',
  temperature: 'Volitelné — typicky sensor …_teplota (v HA bývá vypnutý, zapni ho v nastavení entity).',
  firmware_update: 'Volitelné — když je dostupná nová verze, ukáže se v headeru.',
  wifi_signal: 'Volitelné — typicky sensor …_sila_signalu. LED Wi-Fi svítí, hover ukáže sílu.',
  lan_link_speed: 'Volitelné — rychlost LAN linky. LED LAN svítí, hover ukáže rychlost.',
  reset_button:
    'Shelly button entita (typicky …_restartovat). Klik na Reset nejdřív zobrazí potvrzení, pak zavolá button.press.',
};

@customElement('shelly-pro1-diagram-card-editor')
export class ShellyPro1DiagramCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: ShellyPro1DiagramCardConfig;

  public setConfig(config: ShellyPro1DiagramCardConfig): void {
    this._config = config;
  }

  private _computeLabel = (schema: { name: string; custom_label?: string }): string =>
    schema.custom_label ?? LABELS[schema.name] ?? schema.name;

  private _computeHelper = (schema: { name: string; custom_helper?: string }): string | undefined =>
    schema.custom_helper ?? HELPERS[schema.name];

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
    const config = ev.detail.value as ShellyPro1DiagramCardConfig;
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
    'shelly-pro1-diagram-card-editor': ShellyPro1DiagramCardEditor;
  }
}
