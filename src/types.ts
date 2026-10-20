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

/** Vstup SW1 / SW2 (typicky `binary_sensor.*_vstup_N`). */
export interface InputConfig {
  /** Volitelný vlastní název (např. „Vypínač u dveří“). */
  name?: string;
  /** Entita stavu vstupu. */
  entity?: string;
}

/** YAML konfigurace karty `shelly-pro1-diagram-card`. */
export interface ShellyPro1DiagramCardConfig {
  type?: string;
  /** Titulek v headeru. */
  title?: string;
  /** Výstup relé (`switch.*`) — povinné, ovládá se kliknutím. */
  switch?: string;
  /** Název zátěže na výstupu O (např. „Čerpadlo“). */
  name?: string;
  /** Před přepnutím zobrazit potvrzovací dialog. */
  confirm?: boolean;
  /** Vstup SW1. */
  input_1?: InputConfig;
  /** Vstup SW2. */
  input_2?: InputConfig;
  /** Teplota zařízení (°C) — volitelně v headeru. */
  temperature?: string;
  /** Firmware `update.*` — v headeru upozorní na dostupnou aktualizaci. */
  firmware_update?: string;
  /** Síla Wi-Fi signálu — LED Wi-Fi svítí (hover = hodnota). */
  wifi_signal?: string;
  /** Rychlost LAN linky — LED LAN svítí (hover = hodnota). */
  lan_link_speed?: string;
  /** Shelly Restart `button.*` — Reset s potvrzením. */
  reset_button?: string;
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
