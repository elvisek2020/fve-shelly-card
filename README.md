# Shelly 3EM Diagram Card

Custom Lovelace karta pro Home Assistant — live diagram **Shelly Pro 3EM**
ve stylu Shelly Cloud „Diagram view“ (napětí, proud a výkon po fázích).

![Shelly 3EM Diagram Card — náhled](docs/preview.png)

- Centrální blok elektroměru se svorkami C/N, A/B, IA/IB, IC/IN
- Vstupní linky LC / LB / LA s napětím (V)
- CT clampy TC / TB / TA / TN s proudem (A) a výkonem (W)
- Pulzující indikace toku úměrná proudu
- Klik na hodnotu otevře nativní HA more-info dialog
- Respektuje HA theme CSS proměnné

## Předpoklady

| Komponenta | Integrace | Co dodává |
| --- | --- | --- |
| **Shelly Pro 3EM** | nativní [Shelly](https://www.home-assistant.io/integrations/shelly/) | napětí, proud a výkon po fázích, celkový výkon / energie |

Konkrétní entity se mapují v YAML — karta není závislá na přesných názvech.

## Instalace

### HACS (doporučeno)

1. HACS → tři tečky → **Custom repositories**
2. URL tohoto repozitáře, kategorie **Dashboard**
3. Nainstaluj **Shelly 3EM Diagram Card** a reloadni prohlížeč

### Ručně

1. Stáhni `shelly-3em-diagram-card.js` z posledního [release](../../releases)
2. Zkopíruj do `/config/www/`
3. Nastavení → Dashboardy → ⋮ → Zdroje → Přidat:
   URL `/local/shelly-3em-diagram-card.js?v=0.3.1`, typ **JavaScript module**

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

## Omezení

- LED **Power** svítí vždy; **Count** pulsuje podle |výkonu|; **Wi-Fi** / **LAN** svítí trvale (hover = hodnota) — jen když jsou v configu příslušné entity.
- Tlačítko **Reset** je aktivní jen když je v configu `reset_button` (`button.*`) —
  po kliknutí se zobrazí potvrzení a pak se volá `button.press`.
- Zdánlivý výkon (VA) se **nezobrazuje**.

## Vývoj

```bash
npm install
npm run typecheck
npm run build      # → dist/shelly-3em-diagram-card.js
npm run watch
```

Stack: Lit 3 + TypeScript + Rollup (stejný jako [fve-flow-card](https://github.com/elvisek2020/fve-flow-card)).

## Licence

MIT — viz [LICENSE](LICENSE).
