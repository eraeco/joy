import {
	LynxEncodePlugin,
	LynxTemplatePlugin,
} from '@lynx-js/template-webpack-plugin';
import { defineConfig } from '@rspack/cli';

export default defineConfig({
	entry: {
		main: './examples/lynx/app.js',
	},
	output: {
		publicPath: '/',
		filename: '[name].js',
	},
	cache: false,
	plugins: [
		new LynxEncodePlugin(),
		new LynxTemplatePlugin({
			filename: 'main.lynx.bundle',
			intermediate: 'main',
		}),
		/**
		 * @param {import("@rspack/core").Compiler} compiler
		 */
		(compiler) => {
			compiler.hooks.thisCompilation.tap(
				'MarkMainThreadWebpackPlugin',
				/**
				 * @param {import("@rspack/core").Compilation} compilation
				 */
				(compilation) => {
					compilation.hooks.processAssets.tap(
						'MarkMainThreadWebpackPlugin',
						() => {
							const mainAsset = compilation.getAsset(`main.js`);
							if (mainAsset) {
								compilation.updateAsset(mainAsset.name, mainAsset.source, {
									...mainAsset.info,
									'lynx:main-thread': true,
								});
							}
						}
					);
				}
			);
		},
	],
	experiments: {
		css: true,
	},
});