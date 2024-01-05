/** 解决精度丢失问题（函数） **/

// eg:
// import { add, sub, mul, div } from '../../utils/float'
// const result = add(1,2) 加
// const result = sub(1,2) 减
// const result = mul(1,2) 乘
// const result = div(1,2) 除


/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 ** 原理： 小数变成整数，相加后在变回小数， 如： 1.12 + 0.123 => (1.12 * 1000 + 0.123 * 1000) / 1000
 **/
const accAdd = function (arg1, arg2) {
  var r1, r2, m, c;
  try {
    // 获取参数1的小数长度，比如 12.12345，那么 r1 === 5
    r1 = arg1.toString().split(".")[1].length;
  }
  catch (e) {
    r1 = 0;
  }
  try {
    // 获取参数2的小数长度，比如 12.12345，那么 r2 === 5
    r2 = arg2.toString().split(".")[1].length;
  }
  catch (e) {
    r2 = 0;
  }
  c = Math.abs(r1 - r2); // 获取绝对值
  m = Math.pow(10, Math.max(r1, r2)); // 小数位数最多的，10的次幂
  if (c > 0) {
    // 确保小数转成整数的时候，一样大小，
    var cm = Math.pow(10, c);
    if (r1 > r2) {
      // 参数1的小数长度大于参数2，那么参数arg2去掉小数后，在乘上差的位数
      arg1 = Number(arg1.toString().replace(".", "")); // 小数变整数：12.123 => 12123
      arg2 = Number(arg2.toString().replace(".", "")) * cm;
    } else {
      arg1 = Number(arg1.toString().replace(".", "")) * cm;
      arg2 = Number(arg2.toString().replace(".", ""));
    }
  } else {
    // 小数位数一样，那么直接转成整数
    arg1 = Number(arg1.toString().replace(".", ""));
    arg2 = Number(arg2.toString().replace(".", ""));
  }
  // 或者不用上面的if else
  // 直接 return (arg1 * m  + arg2 * m) / m;
  // 整数相加后，变回小数
  return (arg1 + arg2) / m;
}

/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 调用：accSub(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
const accSub = function (arg1, arg2) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  }
  catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  }
  catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
  n = (r1 >= r2) ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

/**
 ** 乘法函数，用来得到精确的乘法结果
 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 ** 调用：accMul(arg1,arg2)
 ** 返回值：arg1乘以 arg2的精确结果
 **/
const accMul = function (arg1, arg2) {
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  }
  catch (e) {
  }
  try {
    m += s2.split(".")[1].length;
  }
  catch (e) {
  }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

/** 
 ** 除法函数，用来得到精确的除法结果
 ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 ** 调用：accDiv(arg1,arg2)
 ** 返回值：arg1除以arg2的精确结果
 **/
const accDiv = function (arg1, arg2) {
  var t1 = 0, t2 = 0, r1, r2;
  try {
    t1 = arg1.toString().split(".")[1].length;
  }
  catch (e) {
  }
  try {
    t2 = arg2.toString().split(".")[1].length;
  }
  catch (e) {
  }
  r1 = Number(arg1.toString().replace(".", ""));
  r2 = Number(arg2.toString().replace(".", ""));
  return (r1 / r2) * Math.pow(10, t2 - t1);
}

export {
  accAdd as add,
  accSub as sub,
  accMul as mul,
  accDiv as div
}