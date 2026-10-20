# Changelog

Poznámky k vydání. Sekce `## vX.Y.Z` se při releasu automaticky použije jako
text vydání na GitHubu — a ten Home Assistant / HACS ukazuje v okně aktualizace.

Nejnovější verze je nahoře.

## v0.4.4 — 2026-10-20

### ⚠️ Změny, které vyžadují zásah

- Volba **Připojení** (`connection`) z verze 0.4.3 je zrušená. LED **Wi-Fi** a **LAN** svítí zase
  jen podle vyplněné entity (`wifi_signal` / `lan_link_speed`), protože bez dat nemají co ukazovat.
  Pokud jsi `connection` nastavil, z YAML ho můžeš odebrat — karta ho ignoruje.
- U Shelly Pro 1 LED připojení opět nezávisí na dostupnosti výstupu (stejně jako před 0.4.3).

> [!TIP]
> Po aktualizaci obnov stránku bez cache.

## v0.4.3 — 2026-10-20

### ✨ Novinky

- Nová volba **Připojení** (`connection: wifi` / `lan`) v obou kartách — LED **Wi-Fi** nebo
  **LAN** svítí podle typu připojení i bez entity (integrace Shelly pro LAN entitu nemá a síla
  Wi-Fi signálu bývá v HA vypnutá). Vyplněná entita dál ukáže hodnotu při najetí myší.
- Shelly Pro 1: LED připojení zhasnou, když je zařízení nedostupné.

### ⚠️ Změny, které vyžadují zásah

- Aby LED připojení svítila bez entity, vyber v editoru karty **Zařízení → Připojení**
  (nebo doplň `connection: wifi` / `connection: lan` do YAML). Stávající konfigurace s entitami
  fungují beze změny.

> [!TIP]
> Po aktualizaci obnov stránku bez cache.

## v0.4.2 — 2026-10-20

### 🐛 Opravy

- **Shelly Pro 1 Diagram Card** má stejnou velikost jako karta pro Pro 3EM — vedle sebe
  mají obě karty stejnou výšku a blok zařízení lícuje.

> [!TIP]
> Po aktualizaci obnov stránku bez cache.

## v0.4.1 — 2026-10-20

### 🎨 Vzhled

- Balíček se v HACS jmenuje **Shelly Diagram Cards** — obsahuje kartu pro Shelly Pro 3EM
  i Shelly Pro 1. Názvy karet ve výběru karet, soubor ani nastavení dashboardů se nemění.

## v0.4.0 — 2026-10-20

### ✨ Novinky

- Nová karta **Shelly Pro 1 Diagram Card** (`custom:shelly-pro1-diagram-card`) pro Shelly Pro 1
  a Pro 1 UL — diagram zařízení se svorkami L/N, SW1/SW2 a I/O ve stejném stylu jako 3EM.
- Výstup relé se přepíná velkým tlačítkem nebo kliknutím na kontakt relé; během přepínání
  karta ukazuje „Zapínám… / Vypínám…“, při sepnutí se rozsvítí vodič k zátěži.
- Volitelné potvrzení před přepnutím, stav vstupů SW1/SW2, LED Power / Out / Wi-Fi / LAN,
  restart s potvrzením, teplota zařízení a upozornění na nový firmware.
- Vizuální editor s výběrem entit. Obě karty jsou ve stejném souboru, instalace se nemění.

> [!TIP]
> Po aktualizaci obnov stránku bez cache.

## v0.3.2 — 2026-07-18

### 🐛 Opravy

- Home Assistant a HACS u karty zobrazují správné číslo verze místo hashe
  commitu. Verze se při buildu bere z `package.json` a banner v konzoli
  prohlížeče ji vypisuje jako `vX.Y.Z`.

> [!TIP]
> Po aktualizaci obnov stránku bez cache.
