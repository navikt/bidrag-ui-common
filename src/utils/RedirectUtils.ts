export function getSessionStateFromParam() {
    const sessionState = getParamFromUrl("sessionState");
    return sessionState ? `sessionState=${getParamFromUrl("sessionState")}` : "";
}

export const RedirectTo = {
    oppgaveListe: (bisysurl: string) => {
        window.location.href = `${bisysurl}Oppgaveliste.do?${getSessionStateFromParam()}`;
    },
    behandleSak: (saksnr: string, bisysurl: string, openInNewTab?: boolean) => {
        const url = `${bisysurl}Sak.do?saksnr=${saksnr}&${getSessionStateFromParam()}`;
        if (openInNewTab) {
            window.open(url, "_blank")?.focus();
        } else {
            window.location.href = url;
        }
    },

    nySoknad(saksnr: string, bisysurl: string) {
        window.location.href = `${bisysurl}Soknad.do?saksnr=${saksnr}&${getSessionStateFromParam()}`;
    },
    soknad(saksnr: string, søknadsid: string, bisysurl: string) {
        window.location.href = `${bisysurl}Soknad.do?saksnr=${saksnr}&hentSoknadsnr=${søknadsid}&${getSessionStateFromParam()}`;
    },

    sakshistorikk: (saksnr: string, bisysurl: string) => {
        window.location.href = `${bisysurl}Sakshistorikk.do?saksnr=${saksnr}&${getSessionStateFromParam()}`;
    },

    joarkJournalpostId: (journalpostId: string, joarkJournalpostId: string) => {
        const currentUrl = window.location.href.replace(journalpostId, joarkJournalpostId);
        window.location.href = currentUrl;
    },
};

function getParamFromUrl(paramKey: string) {
    const queryParams = window.location.search;
    const urlParams = new URLSearchParams(queryParams);
    return urlParams.get(paramKey);
}
