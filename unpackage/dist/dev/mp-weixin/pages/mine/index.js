"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      showLoginPop: false
    };
  },
  onShow() {
    this.checkLogin();
  },
  methods: {
    // 一键微信登录
    async getOpenid() {
      try {
        const loginRes = await common_vendor.index.login({ provider: "weixin" });
        const code = loginRes.code;
        if (!code) {
          common_vendor.index.$u.toast("获取登录凭证失败");
          return;
        }
        common_vendor.index.showLoading({ title: "登录中" });
        common_vendor.index.request({
          url: "https://www.xiaojiaoyaya.cn/index.php/api/user/getOpen",
          method: "POST",
          data: {
            js_code: code
          },
          timeout: 8e3,
          // 延长超时时间8秒
          success: (res) => {
            common_vendor.index.hideLoading();
            if (res.data.openid) {
              common_vendor.index.setStorageSync("openid", res.data.openid);
              common_vendor.index.$u.toast("登录成功");
              this.closePop();
              this.checkLogin();
            } else {
              common_vendor.index.$u.toast("登录获取openid失败");
            }
          },
          fail: (err) => {
            common_vendor.index.$u.toast("登录请求超时，请重试");
            common_vendor.index.__f__("error", "at pages/mine/index.vue:130", "登录请求失败", err);
          }
        });
      } catch (err) {
        common_vendor.index.$u.toast("登录取消或异常");
        common_vendor.index.__f__("error", "at pages/mine/index.vue:135", err);
      }
    },
    // 退出登录
    loginOut() {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定退出登录？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.setStorageSync("openid", "");
            common_vendor.index.showLoading({ title: "退出中" });
            setTimeout(() => {
              common_vendor.index.hideLoading();
              this.checkLogin();
            }, 1500);
          }
        }
      });
    },
    goHome() {
      common_vendor.index.reLaunch({
        url: `/pages/index/index`
      });
    },
    goOrder() {
      common_vendor.index.navigateTo({
        url: `/pages/mine/order`
      });
    },
    goFavorite() {
      common_vendor.index.navigateTo({
        url: `/pages/mine/love`
      });
    },
    goInvite() {
      common_vendor.index.navigateTo({
        url: `/pages/reservate/index`
      });
    },
    goAlbum() {
      common_vendor.index.navigateTo({
        url: `/pages/mine/photo`
      });
    },
    // 关闭登录弹窗
    closePop() {
      this.showLoginPop = false;
    },
    // 校验登录状态
    checkLogin() {
      const openid = common_vendor.index.getStorageSync("openid");
      if (!openid) {
        this.showLoginPop = true;
      } else {
        this.showLoginPop = false;
      }
    },
    // 页面功能点击拦截登录
    handleClick(type) {
      const openid = common_vendor.index.getStorageSync("openid");
      if (!openid) {
        this.showLoginPop = true;
        return;
      }
      switch (type) {
        case "order":
          common_vendor.index.showToast({ title: "点击了预约记录", icon: "none" });
          break;
        case "favorite":
          common_vendor.index.showToast({ title: "点击了我的喜欢", icon: "none" });
          break;
        case "album":
          common_vendor.index.showToast({ title: "点击了我的影集", icon: "none" });
          break;
        case "invite":
          common_vendor.index.showToast({ title: "点击了预约服务", icon: "none" });
          break;
      }
    }
  }
};
if (!Array) {
  const _easycom_up_avatar2 = common_vendor.resolveComponent("up-avatar");
  const _easycom_up_image2 = common_vendor.resolveComponent("up-image");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  (_easycom_up_avatar2 + _easycom_up_image2 + _easycom_up_icon2)();
}
const _easycom_up_avatar = () => "../../node-modules/uview-plus/components/u-avatar/u-avatar.js";
const _easycom_up_image = () => "../../node-modules/uview-plus/components/u-image/u-image.js";
const _easycom_up_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_up_avatar + _easycom_up_image + _easycom_up_icon)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      size: "80",
      shape: "circle"
    }),
    b: common_vendor.p({
      ["show-loading"]: true,
      src: "/static/VIP.png",
      width: "40rpx",
      height: "40rpx"
    }),
    c: common_vendor.p({
      name: "setting-fill",
      size: "40rpx",
      color: "#FFFFFF"
    }),
    d: common_vendor.p({
      name: "order",
      size: "60rpx"
    }),
    e: common_vendor.o((...args) => $options.goOrder && $options.goOrder(...args), "46"),
    f: common_vendor.p({
      name: "heart",
      size: "60rpx"
    }),
    g: common_vendor.o((...args) => $options.goFavorite && $options.goFavorite(...args), "5f"),
    h: common_vendor.p({
      name: "moments",
      size: "60rpx"
    }),
    i: common_vendor.o((...args) => $options.goAlbum && $options.goAlbum(...args), "e0"),
    j: common_vendor.p({
      name: "server-man",
      size: "60rpx"
    }),
    k: common_vendor.p({
      name: "calendar-fill",
      size: "60rpx"
    }),
    l: common_vendor.o((...args) => $options.goInvite && $options.goInvite(...args), "00"),
    m: !$data.showLoginPop
  }, !$data.showLoginPop ? {
    n: common_vendor.p({
      ["show-loading"]: true,
      src: "/static/loginout.png",
      width: "60rpx",
      height: "60rpx"
    }),
    o: common_vendor.o((...args) => $options.loginOut && $options.loginOut(...args), "eb")
  } : {}, {
    p: $data.showLoginPop
  }, $data.showLoginPop ? {
    q: common_vendor.o((...args) => $options.closePop && $options.closePop(...args), "d9")
  } : {}, {
    r: $data.showLoginPop
  }, $data.showLoginPop ? {
    s: common_vendor.o((...args) => $options.getOpenid && $options.getOpenid(...args), "6e"),
    t: common_vendor.o((...args) => $options.goHome && $options.goHome(...args), "d0")
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-569e925a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/index.js.map
