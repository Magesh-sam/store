import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import * as biomePlugin from "vite-plugin-biome";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		// @ts-expect-error if compiler still complains, or access the default directly
		(biomePlugin.default || biomePlugin)({
			mode: "check",
			applyFixes: true,
			unsafe: true,
		}),
	],
	resolve: {
		alias: {
			"@": resolve(import.meta.dirname, "./src"),
		},
	},
});
