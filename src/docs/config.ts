export const bidragMDXTheme = {
    config: {
        useRootStyles: false,
    },
    fonts: {
        body: 'var(--ax-font-family,"Source Sans Pro",Arial,sans-serif)',
    },
    fontWeights: {
        body: "var(--ax-font-weight-regular)",
    },
    lineHeights: {
        body: "var(--ax-font-line-height-medium)",
    },
    styles: {
        root: {
            fontFamily: 'var(--ax-font-family,"Source Sans Pro",Arial,sans-serif)',
            lineHeight: "var(--ax-font-line-height-medium)",
            fontWeight: "var(--ax-font-weight-regular)",
            fontSize: "var(--ax-font-size-large)",
        },
        p: {
            maxWidth: "65rem",
        },
        h1: {
            fontSize: "var(--ax-font-size-heading-xlarge)",
        },
        h2: {
            fontSize: "var(--ax-font-size-heading-large)",
            marginTop: 0,
        },
        h3: {
            fontSize: "var(--ax-font-size-heading-medium)",
        },
        h4: {
            fontSize: "var(--ax-font-size-heading-small)",
        },
        h5: {
            fontSize: "var(--ax-font-size-heading-xsmall)",
            marginTop: "5px",
            marginBottom: "5px",
        },
    },
};
