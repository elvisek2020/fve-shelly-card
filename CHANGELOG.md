# Changelog

Poznámky k vydání. Sekce `## vX.Y.Z` se při releasu automaticky použije jako
text vydání na GitHubu — a ten Home Assistant / HACS ukazuje v okně aktualizace.

Nejnovější verze je nahoře.

## v0.3.2 — 2026-07-18

### 🐛 Opravy

- Home Assistant a HACS u karty zobrazují správné číslo verze místo hashe
  commitu. Verze se při buildu bere z `package.json` a banner v konzoli
  prohlížeče ji vypisuje jako `vX.Y.Z`.

> [!TIP]
> Po aktualizaci obnov stránku bez cache.
