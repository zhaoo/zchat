module.exports = {
	publicPath: './',
	devServer: {
		open: true,
		overlay: {
			warnings: true,
			errors: true
		},
		proxy: {
			[process.env.VUE_APP_BASE_URL]: {
				target: `http://localhost:3000`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_BASE_URL]: ''
				}
			}
		},
	}
}