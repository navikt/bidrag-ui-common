# Bidrag-ui commons

Inneholder felles types brukt tvers av mikrofrontend apper i Bidrag

## Hvordan bruke bidrag-ui-commons i din applikasjon

### Logg in på https://npm.pkg.github.com

På github -> Settings -> Developer Settings -> Generate New Token
Select scopes `repo` og `read:packages`

eksporter miljøvariabel NPM_TOKEN, f.eks ved å legge til2
`export NPM_TOKEN=<ditt token>` i ~/.zshrc

Deretter må du legge til følgende kode i `.npmrc` under frontend appen som skal bruke avhengigheten

```
registry=https://registry.npmjs.org/
@navikt:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

# Lage og publisere ny release

Push til alle andre brancher enn `main` vil bare kjøre lint og bygg. Pass på at bygget kjører grønt før det merges til main.

Ved push til `main` så kjører [release.yaml](.github/workflows/release.yaml), men release skjer kun hvis commit-meldinger har støttet prefix.

Versjonsbump bestemmes fra commit-meldinger i pushen:

* uten støttet prefix -> ingen release
* `feat:`, `fix:`, `bugfix:` eller `refactor:` -> minor (0.X.0)
* `major:` -> major (X.0.0)

Workflowen oppdaterer `package.json`, lager commit + tag (`vX.Y.Z`) og publiserer pakken.

Du kan også trigge workflowen manuelt (`workflow_dispatch`).

* Fra `main`: velg `main_bump` (`patch`, `minor` eller `major`) for å bestemme release-versjon.
* Fra andre brancher: workflow publiserer prerelease fra branch.

Formatet blir:

* `X.Y.Z-<branch-prefix>-XXXX`

`<branch-prefix>` settes til første del av branchnavn før `/` (f.eks. `aksel4/changes` -> `aksel4`). Hvis branch ikke inneholder `/`, brukes hele branchnavnet.

# Bruke React componenter

### Styling

React componentene bruker tailwindcss for styling. Når du skal bruke React componentene må derfor også en felles css fil fra bidrag-ui-common importeres for at stylingen skal fungere.
Det kan gjøres ved å legge inn følgende importd

```React
import "@navikt/bidrag-ui-common/styles/index.css";
```
