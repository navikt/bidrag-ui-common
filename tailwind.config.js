/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    safelist: [
        {
            pattern: /col-span-(.*)/,
            variants: ["lg", "md", "sm", "md"],
        },
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                auto: "repeat(auto-fill, minmax(50px, auto))",
                autosmall: "repeat(auto-fill, minmax(max-content, 1092px))",
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
};
