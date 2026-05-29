"use strict";
const common_vendor = require("../common/vendor.js");
const baseUrl = "http://www.xiaojiaoyaya.cn/index.php/api/";
const request = (options) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseUrl + options.url,
      method: options.method || "GET",
      data: options.data || {},
      header: {
        "Content-Type": "application/json;charset=UTF-8"
        // 可在这里加 token
        // 'token': uni.getStorageSync('token') || ''
      },
      // 请求成功
      success: (res) => {
        const { data } = res;
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          common_vendor.index.showToast({
            title: data.msg || "请求失败",
            icon: "none"
          });
          reject(data);
        }
      },
      // 请求失败
      fail: (err) => {
        common_vendor.index.showToast({
          title: "网络异常，请稍后重试",
          icon: "none"
        });
        reject(err);
      }
    });
  });
};
exports.request = request;
//# sourceMappingURL=../../.sourcemap/mp-weixin/request/index.js.map
