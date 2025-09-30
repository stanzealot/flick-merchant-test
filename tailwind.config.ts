import type { Config } from "tailwindcss";

const config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                primary: {
                    25: "#F5FAF9",
                    50: "#E9F5F4",
                    100: "#BBDFDD",
                    200: "#9BCFCD",
                    300: "#6DB9B6",
                    400: "#51ACA8",
                    500: "#259792",
                    600: "#228985",
                    700: "#1A6B68",
                    800: "#145350",
                    900: "#103F3D",
                    950: "#0C2E2C",
                },

                secondary: {
                    25: "#FAFAFA",
                    50: "#F5F5F5",
                    100: "#E8E8E8",
                    200: "#D1D1D1",
                    300: "#B8B8B8",
                    400: "#9E9E9E",
                    500: "#7F7F7F",
                    600: "#666666",
                    700: "#4D4D4D",
                    800: "#333333",
                    900: "#1A1A1A",
                    950: "#0D0D0D",
                },

                danger: {
                    25: "#FFFBFA",
                    50: "#FEF3F2",
                    100: "#FEE4E2",
                    200: "#FECDCA",
                    300: "#FDA29B",
                    400: "#F97066",
                    500: "#F04438",
                    600: "#D92D20",
                    700: "#B42318",
                    800: "#912018",
                    900: "#7A271A",
                    950: "#55160C",
                },

                warning: {
                    25: "#FFFCF5",
                    50: "#FFFAEB",
                    100: "#FEF0C7",
                    200: "#FEDF89",
                    300: "#FEC84B",
                    400: "#FDB022",
                    500: "#F79009",
                    600: "#DC6803",
                    700: "#B54708",
                    800: "#99370D",
                    900: "#7A2E0E",
                    950: "#4E1D09",
                },

                success: {
                    25: "#F6FEF9",
                    50: "#ECFDF3",
                    100: "#DCFAE6",
                    200: "#ABEFC6",
                    300: "#75E0A7",
                    400: "#47CD89",
                    500: "#17B26A",
                    600: "#079455",
                    700: "#067647",
                    800: "#085D3A",
                    900: "#074D31",
                    950: "#053321",
                },
            },

            fontFamily: {
                dancing: ['"Dancing Script"', "cursive"],
                pacifico: ['"Pacifico"', "cursive"],
                greatVibes: ['"Great Vibes"', "cursive"],
                allura: ['"Allura"', "cursive"],
                satisfy: ['"Satisfy"', "cursive"],
                tangerine: ['"Tangerine"', "cursive"],
                courgette: ['"Courgette"', "cursive"],
                sacramento: ['"Sacramento"', "cursive"],
                parisienne: ['"Parisienne"', "cursive"],
                kristi: ['"Kristi"', "cursive"],
                pinyon: ['"Pinyon Script"', "cursive"],
                homemade: ['"Homemade Apple"', "cursive"],
                zeyada: ['"Zeyada"', "cursive"],
                alex: ['"Alex Brush"', "cursive"],
                edu: ['"Edu AU VIC WA NT Pre"', "cursive"],
                Smooch: ['"Smooch"', "cursive"],
            },

            borderRadius: {
                // lg: "var(--radius)",
                // md: "calc(var(--radius) - 2px)",
                // sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
