/** Minimální typy HA objektů, které karta potřebuje. */
export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  language?: string;
  locale?: { language?: string };
  formatEntityState?: (stateObj: HassEntity) => string;
  /** HA API — volání služby (např. button.press). */
  callService?: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
  ) => Promise<unknown>;
}

/** Entity jedné fáze (A / B / C). */
export interface PhaseConfig {
  /** Volitelný vlastní název (vedle Napětí / nad proudem u CT). */
  name?: string;
  /** Napětí (V). */
  voltage?: string;
  /** Proud (A). */
  current?: string;
  /** Aktivní výkon (W). */
  power?: string;
}

/** YAML konfigurace karty `shelly-3em-diagram-card`. */
export interface Shelly3emDiagramCardConfig {
  type?: string;
  /** Titulek v headeru. */
  title?: string;
  phase_a?: PhaseConfig;
  phase_b?: PhaseConfig;
  phase_c?: PhaseConfig;
  /** Celkový výkon (W) — volitelně v headeru. */
  total_power?: string;
  /** Celková energie (kWh) — volitelně v headeru. */
  total_energy?: string;
  /** Proud neutrálu (A) — pokud vyplněno, zobrazí CT clamp TN. */
  neutral_current?: string;
  /**
   * Shelly Reset button entita (`button.*_reset` / `button.*_restart`).
   * Po potvrzení v dialogu se volá `button.press`.
   */
  reset_button?: string;
  /**
   * Síla Wi-Fi signálu (typicky RSSI v dBm).
   * Pokud je vyplněno → LED Wi-Fi svítí (hover ukáže sílu signálu).
   */
  wifi_signal?: string;
  /**
   * Rychlost LAN linky (typicky Mb/s).
   * Pokud je vyplněno → LED LAN svítí (hover ukáže rychlost).
   */
  lan_link_speed?: string;
}

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}
