import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

function resolve(dir) {
	return path.join(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig({
	base: '/',
	assetsInclude: 'png',
	build: {
		outDir: resolve('dist')
	},
	server: {
		host: '0.0.0.0'
	},
	resolve: {
		alias: {
			'@': resolve('src'),
			A: resolve('src/A/index.js')
		}
	},
	plugins: [vue()]
});
