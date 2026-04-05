import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const requiredEnvVars = ['VITE_GEOCODING_API_KEY'];

	for (const envVar of requiredEnvVars) {
		if (!env[envVar]) {
			console.warn(`⚠️  Warning: ${envVar} is not defined in environment`);
		}
	}

	return {
		plugins: [react()],
		envPrefix: 'VITE_',
		test: {
			environment: 'jsdom',
		},
	};
});
