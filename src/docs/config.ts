export const bidragMDXTheme = {
    config: {
        useRootStyles: false,
    },
    fonts: {
        body: 'var(--a-font-family,"Source Sans Pro",Arial,sans-serif)',
    },
    fontWeights: {
        body: "var(--a-font-weight-regular)",
    },
    lineHeights: {
        body: "var(--a-font-line-height-medium)",
    },
    styles: {
        root: {
            fontFamily: 'var(--a-font-family,"Source Sans Pro",Arial,sans-serif)',
            lineHeight: "var(--a-font-line-height-medium)",
            fontWeight: "var(--a-font-weight-regular)",
            fontSize: "var(--a-font-size-large)",
        },
        p: {
            maxWidth: "65rem",
        },
        h1: {
            fontSize: "var(--a-font-size-heading-xlarge)",
        },
        h2: {
            fontSize: "var(--a-font-size-heading-large)",
            marginTop: 0,
        },
        h3: {
            fontSize: "var(--a-font-size-heading-medium)",
        },
        h4: {
            fontSize: "var(--a-font-size-heading-small)",
        },
        h5: {
            fontSize: "var(--a-font-size-heading-xsmall)",
            marginTop: "5px",
            marginBottom: "5px",
        },
    },
};
