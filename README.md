# Bidrag-ui commons
Inneholder felles types brukt tvers av mikrofrontend apper i Bidrag

## Hvordan bruke denne pakken
### Log in på https://npm.pkg.github.com
På github -> Settings -> Developer Settings -> Generate New Token
Select scopes `repo` og `read:packages`

eksporter miljøvariabel NPM_TOKEN, f eks ved å legge til
`export NPM_TOKEN=<ditt token>` i ~/.zshrc

Deretter må du legge til følgende kode i .npmrc under frontend appen som skal bruke avhengigheten

```
registry=https://registry.npmjs.org/
@navikt:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```





