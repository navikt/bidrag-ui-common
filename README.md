# Bidrag-ui commons
Inneholder felles types brukt tvers av mikrofrontend apper i Bidrag

## Hvordan bruke bidrag-ui-commons i din applikasjon
### Logg in på https://npm.pkg.github.com
På github -> Settings -> Developer Settings -> Generate New Token
Select scopes `repo` og `read:packages`

eksporter miljøvariabel NPM_TOKEN, f.eks ved å legge til
`export NPM_TOKEN=<ditt token>` i ~/.zshrc

Deretter må du legge til følgende kode i `.npmrc` under frontend appen som skal bruke avhengigheten

```
registry=https://registry.npmjs.org/
@navikt:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

# Lage og publisere ny release
Push til alle andre brancher enn `main` vil bare kjøre lint og bygg. Pass på at bygget kjører grønt før det merges til main.

Ved merge til main så kjører [release.yaml](.github/workflows/release.yaml) pipelinen som bruker [release-please](https://github.com/googleapis/release-please) action.

Release Please sjekker om commit meldingen inneholder [conventionalcommits](https://www.conventionalcommits.org/en/v1.0.0/) format.

Det vil si at hvis commit meldingen har prefix:

* `fix:` som representerer bug fix så vil den bumpe versjonen med patch (0.0.X)
* `feat:` som representerer ny featyre vil bumpe versjonen med minor (0.X.0)
* `feat!:`, or `fix!:`, `refactor!:`, etc., som representerer "breaking change" (indikert av !) vil bumpe versjon med major (X.0.0)

Release please vil opprette en PR som oppdaterer CHANGELOG.md filen med commit meldingen siden forrige release. Når PR er merget til main så vil nye release publiseres til GPR (Github package registry) med oppdaterte versjonen

# Bruke React componenter
### Styling
React componentene bruker tailwindcss for styling. Når du skal bruke React componentene må derfor også en felles css fil fra bidrag-ui-common importeres for at stylingen skal fungere.
Det kan gjøres ved å legge inn følgende importd


```React
import "@navikt/bidrag-ui-common/styles/index.css";
```