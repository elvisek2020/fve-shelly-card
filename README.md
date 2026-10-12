# Shelly 3EM Diagram Card

[![HACS Custom](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![Release](https://img.shields.io/github/v/release/elvisek2020/fve-shelly-card)](https://github.com/elvisek2020/fve-shelly-card/releases)
[![Validate](https://github.com/elvisek2020/fve-shelly-card/actions/workflows/validate.yml/badge.svg)](https://github.com/elvisek2020/fve-shelly-card/actions/workflows/validate.yml)
[![Licence](https://img.shields.io/github/license/elvisek2020/fve-shelly-card)](LICENSE)

[![Otevřít v HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=elvisek2020&repository=fve-shelly-card&category=plugin)

Custom Lovelace karta pro Home Assistant — live diagram **Shelly Pro 3EM**
ve stylu Shelly Cloud „Diagram view“ (napětí, proud a výkon po fázích).

![Shelly 3EM Diagram Card — náhled](docs/preview.png)

- Centrální blok elektroměru se svorkami C/N, A/B, IA/IB, IC/IN
- Vstupní linky LC / LB / LA s napětím (V)
- CT clampy TC / TB / TA / TN s proudem (A) a výkonem (W)
- Pulzující indikace toku úměrná proudu
- Klik na hodnotu otevře nativní HA more-info dialog
- Respektuje HA theme CSS proměnné

## Předpoklady a závislosti

| Komponenta | Integrace | Co dodává |
| --- | --- | --- |
| **Shelly Pro 3EM** | nativní [Shelly](https://www.home-assistant.io/integrations/shelly/) | napětí, proud a výkon po fázích, celkový výkon / energie |

Konkrétní entity se mapují v YAML — karta není závislá na přesných názvech.

## Instalace

### HACS (doporučeno)

1. HACS → tři tečky vpravo nahoře → **Custom repositories**
2. Vlož URL `https://github.com/elvisek2020/fve-shelly-card`, kategorie **Dashboard**
3. Nainstaluj **Shelly 3EM Diagram Card**
4. Obnov stránku prohlížeče bez cache.

HACS nabízí aktualizace z GitHub releases.

### Ručně

1. Stáhni `shelly-3em-diagram-card.js` z posledního [release](../../releases)
2. Zkopíruj do `/config/www/`
3. Nastavení → Dashboardy → ⋮ → Zdroje → Přidat:
   URL `/local/shelly-3em-diagram-card.js?v=0.3.2`, typ **JavaScript module**
   (číslo verze zvyšuj při každé aktualizaci kvůli cache)

## Konfigurace

Kartu přidej přes výběr karet (**Shelly 3EM Diagram Card**) a nastav entity
ve vizuálním editoru (entity pickery pro fáze A/B/C + volitelné součty).

Ekvivalentní YAML:

```yaml
type: custom:shelly-3em-diagram-card
title: DUB-1NP-FVE-AC-OUT
phase_a:
  name: FVE výstup
  voltage: sensor.dub_1nb_grid_ac_in_phase_a_napeti
  current: sensor.dub_1nb_grid_ac_in_phase_a_proud
  power: sensor.1np_vstupni_chodba_dub_1nb_grid_ac_in_phase_a_vykon
phase_b:
  name: Bojler
  voltage: sensor.dub_1nb_grid_ac_in_phase_b_napeti
  current: sensor.dub_1nb_grid_ac_in_phase_b_proud
  power: sensor.1np_vstupni_chodba_dub_1nb_grid_ac_in_phase_b_vykon
phase_c:
  voltage: sensor.dub_1nb_grid_ac_in_phase_c_napeti
  current: sensor.dub_1nb_grid_ac_in_phase_c_proud
  power: sensor.1np_vstupni_chodba_dub_1nb_grid_ac_in_phase_c_vykon
total_power: sensor.1np_vstupni_chodba_dub_1nb_grid_ac_in_vykon
total_energy: sensor.1np_vstupni_chodba_dub_1nb_grid_ac_in_energie
# Wi-Fi vs LAN — podle vyplněných entit (lze i obě najednou):
wifi_signal: sensor.dub_1nb_grid_ac_in_rssi
lan_link_speed: sensor.dub_1nb_grid_ac_in_ethernet
reset_button: button.dub_1nb_grid_ac_in_restart
```

### Položky konfigurace

| Klíč | Povinné | Popis |
| --- | --- | --- |
| `title` | ne | Titulek v headeru |
| `phase_a` / `phase_b` / `phase_c` | ano* | Objekty s volitelným `name` + `voltage`, `current`, `power` |
| `total_power` | ne | Celkový výkon — vpravo nahoře |
| `total_energy` | ne | Celková energie — vpravo nahoře pod výkonem |
| `neutral_current` | ne | Proud neutrálu — bez něj se CT clamp **TN** nezobrazí |
| `wifi_signal` | ne | Síla Wi-Fi (RSSI) — LED **Wi-Fi** svítí; hover = síla signálu |
| `lan_link_speed` | ne | Rychlost LAN linky — LED **LAN** svítí; hover = rychlost |
| `reset_button` | ne | Shelly `button.*` (reset/restart) — aktivuje klikací Reset s potvrzením |

\* Alespoň jedna fáze s entitami dává smysl; chybějící entity se nezobrazí.
Volitelný `name` se ukáže vedle „Napětí“ (LA/LB/LC) a nad proudem u CT (TA/TB/TC).
Vstupní linky **LA / LB / LC** jen když je u fáze vyplněné napětí (pozice zůstávají).
CT clampy **TA / TB / TC** jen když je vyplněný proud nebo výkon — dynamicky vycentrované.

**Připojení:** vyplněný `wifi_signal` = Wi-Fi (žlutá LED svítí, hover = síla); vyplněný `lan_link_speed` = LAN (zelená LED svítí, hover = rychlost). Obě entity mohou být nastavené zároveň.

## Vývoj

```bash
npm install
npm run typecheck
npm run build      # → dist/shelly-3em-diagram-card.js
npm run watch
```

Stack: Lit 3 + TypeScript + Rollup (stejný jako [fve-flow-card](https://github.com/elvisek2020/fve-flow-card)).

## Vydání verze

1. Zvedni `version` v `package.json` (SemVer) — jediný zdroj verze, Rollup ji vloží do bundlu.
   V README uprav `?v=` u ruční instalace.
2. Doplň nahoru do `CHANGELOG.md` sekci `## vX.Y.Z — RRRR-MM-DD`; z ní vznikne text
   vydání, který HA / HACS ukazuje v okně aktualizace.
3. Commit `Release vX.Y.Z: krátký popis`, `git tag vX.Y.Z`, push commitu i tagu.
4. Workflow **Release** zbuildí kartu, přiloží `shelly-3em-diagram-card.js` a založí release.
   HACS nabídne aktualizaci.

## Známá omezení

- LED **Power** svítí vždy; **Count** pulsuje podle |výkonu|; **Wi-Fi** / **LAN** svítí trvale (hover = hodnota) — jen když jsou v configu příslušné entity.
- Tlačítko **Reset** je aktivní jen když je v configu `reset_button` (`button.*`) —
  po kliknutí se zobrazí potvrzení a pak se volá `button.press`.
- Zdánlivý výkon (VA) se **nezobrazuje**.

## Autor

**[elvisek2020](https://github.com/elvisek2020)** — karta vznikla jako detailní pohled
na jednotlivé elektroměry Shelly Pro 3EM ve vlastní instalaci, doplněk k
[Hybrid Energy Flow Card](https://github.com/elvisek2020/fve-flow-card). Licence MIT.
