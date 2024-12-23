/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fluidTypography: {},
			fontFamily: {
				pockoto: ["var(--pockota-font)"],
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			keyframes: {
				shimmer: {
					"100%": {
						transform: "translateX(100%)",
					},
				},
			},
		},
	},
	variants: {},
	plugins: [require("tailwind-fluid-typography"), require("tailwind-children")],
};
