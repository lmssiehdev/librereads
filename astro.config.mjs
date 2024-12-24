import vercel from "@astrojs/vercel";
// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	redirects: {
		"/book/show/[...slugs]": "/book/[...slugs]",
	},
	output: "server",
	adapter: vercel(),
	integrations: [tailwind()],
});
