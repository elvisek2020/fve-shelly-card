import { css } from 'lit';

/** Společný vzhled diagramových karet (blok zařízení, svorky, LED, Reset). */
export const diagramStyles = css`
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

  .warn {
    padding: 16px;
    color: var(--error-color, #ff5252);
  }
`;
