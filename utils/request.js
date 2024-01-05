import appConfig from '../config.js'
import { setCurrentPageStorage, toast } from './util'
import logManager from './log'
import getUserInfo from './getUserInfo'

/**
 * 封装一个Promise风格的通用请求
 * @param {*} method 请求方法
 * @param {*} url 地址
 * @param {*} data 主体
 * @param {*} requestConfig 请求配置：timeout、isCustomUrl、isHideErrToast
 * 配置说明：
 * timeout-超时时间
 * isCustomUrl-自定义完整接口地址
 * isHideErrToast-请求异常是否隐藏提示，默认提示
 */
const request = async function (method = 'get', url = '/', data = {}, requestConfig = {}) {
	const isInwhiteList = appConfig.filtrationToken.includes(url)
	const token = wx.getStorageSync('token')
	// // 没token且不在白名单则静默登录
	// if (!isInwhiteList && !token) {
	//   await getUserInfo()
	// }
	return new Promise((resolve, reject) => {
		if (typeof method === 'object') {
			const config = method
			const isCustomUrl = config.requestConfig?.isCustomUrl
			url = isCustomUrl ? (config.url || '/') : appConfig.host + url
			data = config.data || {}
			method = config.method || 'get'
		}
		// if (/put|post|patch/i.test(method)) {
		//   data = JSON.stringify(data)
		// }
		const isCustomUrl = requestConfig?.isCustomUrl
		const requestUrl = isCustomUrl ? url : appConfig.host + url
		wx.request({
			url: requestUrl,
			method: method,
			data: data,
			header: {
				'Authorization': isInwhiteList ? '' : `Bearer ${token}`
			},
			timeout: requestConfig.timeout ?? 60000,
			success: async (res) => {
				if (res.statusCode === 200) {
					const resCode = res.data.code
					if (resCode === 200) {
						resolve(res.data)
					} else if (resCode === 401) {
						setCurrentPageStorage()
						wx.redirectTo({
							url: `/pages/login/index`
						});
					} else if (/^5\d+/.test(resCode.toString())) {
						if (!requestConfig.isHideErrToast) {
							toast(res.data.msg || res.data.message || '请求出错...')
						}
						reject(res)
						logManager.warn('request.error.5xx:', requestUrl, res)
					} else {
						reject(res)
						logManager.warn('request.error:', requestUrl, res)
					}
				} else {
					toast('请求失败了')
					reject(res)
				}
			},
			fail: (err) => {
				if (!requestConfig.isHideErrToast) {
					toast('请求失败')
				}
				reject(err)
				logManager.warn('request.fail:', requestUrl, err)
			}
		})
	})
}

export default request