// app.js
import checkUpdate from '/utils/checkUpdate'

App({
  onLaunch() {
    // 检测小程序版本更新
    checkUpdate()
  },
  globalData: {
    userInfo: null
  }
})
