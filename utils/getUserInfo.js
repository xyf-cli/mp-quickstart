import request from './request';
import config from '../config.js';

const getUserInfo = function (cb) {
  return new Promise((resolve, reject) => {
    wx.login({
      success: async function (res) {
        if (res.code) {
          const authRes = await request('post', '/uapp/user/authLogin', {
            appId: config.appId,
            code: res.code,
            type: 'wxmpPrinter',
          });
          wx.setStorageSync('openId', authRes.data.openId);
          wx.setStorageSync('token', authRes.data.token);
          wx.setStorageSync('userMobile', authRes.data.userMobile);
          getApp().globalData.token = authRes.data.token || '';
          getApp().globalData.userMobile = authRes.data.userMobile || '';
          if (cb) {
            cb(authRes);
          }
          resolve(authRes);
        } else {
          reject();
          console.log('登录失败！' + res.errMsg);
        }
      },
    });
  });
};

export default getUserInfo;
