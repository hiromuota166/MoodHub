import type { StorybookConfig } from "@storybook/nextjs";
const path = require("path");

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-onboarding",
		"@storybook/addon-interactions",
		{
			name: "@storybook/addon-postcss",
			options: {
				postcssLoaderOptions: {
					implementation: require("postcss"),
				},
			},
		},
		"@storybook/addon-styling-webpack",
		{
			name: "@storybook/addon-styling-webpack",

			options: {
				rules: [
					{
						test: /\.css$/,
						sideEffects: true,
						use: [
							require.resolve("style-loader"),
							{
								loader: require.resolve("css-loader"),
								options: {
									importLoaders: 1,
								},
							},
							{
								loader: require.resolve("postcss-loader"),
								options: {
									implementation: require.resolve("postcss"),
								},
							},
						],
					},
				],
			},
		},
	],
	framework: {
		name: "@storybook/nextjs",
		options: {},
	},
	docs: {
		autodocs: "tag",
	},
	webpackFinal: async (config, { configType }) => {
		// `configType`には 'DEVELOPMENT' または 'PRODUCTION' が入ります
		// 'PRODUCTION'はビルド時に、'DEVELOPMENT'は開発時のストーリーブック起動時に設定されます。

		// エイリアスの設定を追加
		if (config.resolve) {
			config.resolve.alias = {
				...config.resolve.alias,
				"@": path.resolve(__dirname, "../src"), // 通常は`../src`が正しいパスですが、プロジェクトに応じて調整してください。
			};
		}

		// カスタマイズした設定を返します
		return config;
	},
};
export default config;
