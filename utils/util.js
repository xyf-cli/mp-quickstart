/**
 * 消息提示
 * @param {*} title 
 * @param {*} type 
 * @param {*} duration 
 */
const toast = (title, type, duration = 1500) => {
  setTimeout(function () {
    wx.showToast({
      title: title,
      icon: type ? type : "none",
      mask: true,
      duration: duration
    });
  }, 10);
}


// 设置当前页面
const setCurrentPageStorage = function () {
  const page = getCurrentPages()
  const currPage = page[page.length - 1]
  let redirect = `/${currPage.route}?`
  for (const item in currPage.options) {
    redirect += `${item}=${currPage.options[item]}&`
  }
  redirect = redirect.slice(0, -1)
  wx.setStorage({
    key: 'redirectPage',
    data: redirect,
  })
  return redirect
}


/**
 * 微信客户端版本号比较
 * @param {*} v1 
 * @param {*} v2 
 * eg: 
 * compareVersion('2.0.1','1.0.1') => 1
 * compareVersion('1.0.1','1.0.1') => 0
 */
const compareVersion = (v1, v2) => {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)
  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }
  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }
  return 0
}

/**
 * 动态计算自定义navbar距离胶囊按钮的样式集合
 */
const calcCustomNavBoundRect = () => {
  return new Promise(function (resolve, reject) {
    let rect = null
    rect = wx.getMenuButtonBoundingClientRect()
    wx.getSystemInfo({
      success: (res) => {
        const ios = !!(res.system.toLowerCase().search('ios') + 1);
        const navbarHeight = ios ? 44 : 48;
        const boxStyleList = [];
        boxStyleList.push(`--narbar-padding-top:${(rect.bottom + rect.top) / 2 - navbarHeight / 2}px;`);
        if (rect && (res === null || res === void 0 ? void 0 : res.windowWidth)) {
          boxStyleList.push(`--navbar-right:${res.windowWidth - rect.left}px;`); // 导航栏右侧小程序胶囊按钮宽度
        }
        boxStyleList.push(`--capsule-height:${rect.height}px;`); // 胶囊高度
        boxStyleList.push(`--capsule-wight:${rect.width}px;`); // 胶囊宽度
        boxStyleList.push(`--navbar-height:${navbarHeight}px;`); // navbar高度
        resolve(boxStyleList.join(';'))
      },
      fail: (err) => {
        console.error('navbar 获取系统信息失败', err);
        reject(err)
      },
    })
  })
}

/**
 * 格式化手机号
 * @param {*} mobile 
 * eg: 15136101177 => 151****1177
 */
function formatPhone(mobile) {
  let reg = new RegExp("(\\d{3})(\\d{4})(\\d{4})");
  mobile = mobile.toString();
  if (mobile.length != 11) {
    return mobile
  }
  return mobile.replace(reg, "$1****$3");
}

/**
 * 格式化名称
 * @param {*} name 
 * eg: xyfei => x***i
 */
function formatName(name) {
  let newStr;
  if (!name) return ''
  if (name.length === 2) {
    newStr = name.substr(0, 1) + '*';
  } else if (name.length > 2) {
    let char = '';
    for (let i = 0, len = name.length - 2; i < len; i++) {
      char += '*';
    }
    newStr = name.substr(0, 1) + char + name.substr(-1, 1);
  } else {
    newStr = name;
  }
  return newStr;
}

/**
 * 解析url?参数
 * @param {url} 原始路由地址
 * @param {text} 需要匹配的路由含有参数
 * eg: getUrlQuery('http://xyf.com?a=1&b=2', 'b') => 2
 */
function getUrlQuery(url, text) {
  var reg = new RegExp("(^|&)" + text + "=([^&]*)(&|$)");
  var r = url.split('?')[1];
  if (r != null && r != "" && r != undefined) {
    r = r.match(reg);
    console.log(r, 'reg match')
    if (r != null) {
      return decodeURIComponent(r[2]);
    } else {
      return null;
    }
  } else {
    return null;
  }
}

/**
 * 解析url
 * @param {*} url 
 * eg: paramsToQuery('http://xyf.com?a=1&b=2') => {a:'1',b:'2'}
 */
function paramsToQuery(url) {
  var params = {};
  var arr = url.split("?");
  if (arr.length <= 1)
    return params;
  arr = arr[1].split("&");
  for (var i = 0, l = arr.length; i < l; i++) {
    var a = arr[i].split("=");
    params[a[0]] = a[1];
  }
  return params;
}


export {
  toast,
  setCurrentPageStorage,
  compareVersion,
  calcCustomNavBoundRect,
  formatPhone,
  formatName,
  getUrlQuery,
  paramsToQuery
}
