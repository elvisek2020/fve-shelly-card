import type { HomeAssistant } from './types';

/** Bezpečně převede stav entity na číslo; NaN → fallback. */
export function toNum(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
  fallback = 0,
): number {
  if (!hass || !entityId) return fallback;
  const st = hass.states[entityId];
  if (!st) return fallback;
  const v = parseFloat(st.state);
  return Number.isFinite(v) ? v : fallback;
}

/** True, pokud entita existuje a má číselný stav. */
export function hasNum(hass: HomeAssistant | undefined, entityId: string | undefined): boolean {
  if (!hass || !entityId) return false;
  const st = hass.states[entityId];
  return !!st && Number.isFinite(parseFloat(st.state));
}

const nf0 = new Intl.NumberFormat('cs-CZ', { maximumFractionDigits: 0 });
const nf1 = new Intl.NumberFormat('cs-CZ', { maximumFractionDigits: 1 });
const nf2 = new Intl.NumberFormat('cs-CZ', { maximumFractionDigits: 2 });
const nf3 = new Intl.NumberFormat('cs-CZ', { maximumFractionDigits: 3 });

/** Formát napětí: 228.4 V. */
export function formatVoltage(v: number): string {
  if (!Number.isFinite(v)) return '—';
  return `${nf1.format(v)} V`;
}

/**
 * Formát proudu: pod 1 A → mA (430 mA), jinak A (1.053 A).
 */
export function formatCurrent(a: number): string {
  if (!Number.isFinite(a)) return '—';
  const abs = Math.abs(a);
  if (abs > 0 && abs < 1) {
    return `${nf0.format(Math.round(a * 1000))} mA`;
  }
  if (abs >= 10) return `${nf2.format(a)} A`;
  return `${nf3.format(a)} A`;
}

/** Formát výkonu: 194.4 W / 1,3 kW. */
export function formatPower(w: number): string {
  if (!Number.isFinite(w)) return '—';
  const abs = Math.abs(w);
  if (abs >= 10000) return `${nf1.format(w / 1000)} kW`;
  if (abs >= 1000) return `${nf2.format(w / 1000)} kW`;
  return `${nf1.format(w)} W`;
}

/** Formát energie v kWh. */
export function formatEnergy(kwh: number): string {
  if (!Number.isFinite(kwh)) return '—';
  if (Math.abs(kwh) >= 1000) return `${nf2.format(kwh / 1000)} MWh`;
  return `${nf1.format(kwh)} kWh`;
}

/**
 * Perioda pulzu CT clampu podle |I| (s).
 * Vyšší proud → kratší perioda. Pod prahem → 0 (animace stop).
 * Kvantováno na 0.25 s, aby se CSS animace nerestartovala při drobných změnách.
 */
export function clampPulseDuration(currentAbs: number): number {
  const threshold = 0.02;
  if (currentAbs < threshold) return 0;
  const minDur = 0.4;
  const maxDur = 2.8;
  const maxCurrent = 32; // Pro 3EM typický rozsah
  const pct = Math.min(1, currentAbs / maxCurrent);
  const dur = maxDur - pct * (maxDur - minDur);
  return Math.round(dur * 4) / 4;
}

/** Vystřelí HA event (bubbles + composed). */
export function fireEvent(node: HTMLElement, type: string, detail?: unknown): void {
  node.dispatchEvent(
    new CustomEvent(type, { detail, bubbles: true, composed: true, cancelable: false }),
  );
}

/** Otevře nativní HA more-info dialog. */
export function moreInfo(node: HTMLElement, entityId?: string): void {
  if (!entityId) return;
  fireEvent(node, 'hass-more-info', { entityId });
}
