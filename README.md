# sykmelder-statistikk

TODO

Lever under:

-   prod-gcp: TODO
-   dev-gcp: TODO
-   dev-gcp (demo): TODO

Bygget på [nextjs](https://nextjs.org/).

## lokal utvikling

### Tilgang til Github Package Registry

Siden vi bruker avhengigheter som ligger i GPR,
så må man sette opp tilgang til GPR med en PAT (personal access token)
som har `read:packages`. Du kan [opprette PAT her](https://github.com/settings/tokens).
Dersom du har en PAT som du bruker for tilgang til maven-packages i github kan du gjenbruke denne.

I din `.bashrc` eller `.zshrc`, sett følgende miljøvariabel:

`export NPM_AUTH_TOKEN=<din PAT med read:packages>`

Installer dependencies og start appen i dev-modus

1. `yarn`
2. `yarn start`

## produksjonsbygg

Installer dependencies, bygg appen, og start i produksjonsmodus.

1. `yarn`
2. `yarn build`
3. `yarn start:prod`

### Kontakt/spørsmål

Prosjektet er vedlikeholdt av [teamsykmelding](CODEOWNERS)

Spørsmål og/eller feature requests? Vennligst lag ein [issue](https://github.com/navikt/sykmelder-statistikk/issues)

Dersom du jobber i [@navikt](https://github.com/navikt) kan du nå oss på slack
kanalen [#team-sykmelding](https://nav-it.slack.com/archives/CMA3XV997)
