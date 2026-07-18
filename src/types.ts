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
}

/** Entity jedné fáze (A / B / C). */
export interface PhaseConfig {
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
