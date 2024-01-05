const env = 'test' //test
// const env = "pre"; //pre
// const env = "prod"; //prod

const urlMap = {
	test: {
		host: 'https://test.xxx.com',
		webviewUrl: 'https://test.xxx.com',
	},
	pre: {
		host: 'https://pre.xxx.com',
		webviewUrl: 'https://pre.xxx.com',
	},
	prod: {
		host: 'https://prod.xxx.com',
		webviewUrl: 'https://prod.xxx.com',
	}
}

const config = {
	host: urlMap[env].host,
	webviewUrl: urlMap[env].webviewUrl,
	//过滤token,过滤掉后台免登的接口,以免传过期token返回401
	filtrationToken: [
		'/xxx/login',
	]
};

module.exports = config;