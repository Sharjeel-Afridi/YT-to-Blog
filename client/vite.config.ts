import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
globalThis.__VITE_PRELOAD__ = []
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		preact({
			prerender: {
				enabled: true,
				renderTarget: '#app',
				additionalPrerenderRoutes: ['/404'],
			},
		}),
	],
});
