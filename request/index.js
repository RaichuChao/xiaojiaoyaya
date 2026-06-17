/**
 * Uniapp 通用请求封装
 * 支持 Promise + 拦截器 + 统一错误处理
 */

// 基础配置
const baseUrl = 'https://www.xiaojiaoyaya.cn/index.php/api/'; // 替换成真实接口域名

const request = (options) => {
  // 返回 Promise 风格请求
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json;charset=UTF-8',
        // 可在这里加 token
        // 'token': uni.getStorageSync('token') || ''
      },
      // 请求成功
      success: (res) => {
        const { data } = res;
        
        // 根据后端返回格式判断
        if (res.statusCode === 200) {
          resolve(data); // 正常返回数据
        } else {
          uni.showToast({
            title: data.msg || '请求失败',
            icon: 'none'
          });
          reject(data);
        }
      },
      // 请求失败
      fail: (err) => {
        uni.showToast({
          title: '网络异常，请稍后重试',
          icon: 'none'
        });
        reject(err);
      }
    });
  });
};

export default request;