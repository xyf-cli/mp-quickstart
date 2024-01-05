// 小程序实时日志
// https://developers.weixin.qq.com/miniprogram/dev/framework/realtimelog/

// 使用方法
// import logManager from '../../utils/log'
// logManager.info({str: 'hello world'}, 'info log', 100, [1, 2, 3])
// logManager.error({str: 'hello world'}, 'error log', 100, [1, 2, 3])
// logManager.warn({str: 'hello world'}, 'warn log', 100, [1, 2, 3])

var log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null

module.exports = {
  debug() {
    if (!log) return
    log.debug.apply(log, arguments)
  },
  info() {
    if (!log) return
    log.info.apply(log, arguments)
  },
  warn() {
    if (!log) return
    log.warn.apply(log, arguments)
  },
  error() {
    if (!log) return
    log.error.apply(log, arguments)
  },
  setFilterMsg(msg) { // 从基础库2.7.3开始支持
    if (!log || !log.setFilterMsg) return
    if (typeof msg !== 'string') return
    log.setFilterMsg(msg)
  },
  addFilterMsg(msg) { // 从基础库2.8.1开始支持
    if (!log || !log.addFilterMsg) return
    if (typeof msg !== 'string') return
    log.addFilterMsg(msg)
  }
}