"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 图片数组，自行替换地址
      imgList: [
        "https://www.xiaojiaoyaya.cn/uploads/20250715/c6b7cc83deed362c05f6264175f455fb.jpg",
        "https://www.xiaojiaoyaya.cn/uploads/20250715/c6b7cc83deed362c05f6264175f455fb.jpg",
        "https://www.xiaojiaoyaya.cn/uploads/20250715/c6b7cc83deed362c05f6264175f455fb.jpg",
        "https://www.xiaojiaoyaya.cn/uploads/20250715/c6b7cc83deed362c05f6264175f455fb.jpg",
        "https://www.xiaojiaoyaya.cn/uploads/20250715/c6b7cc83deed362c05f6264175f455fb.jpg",
        "https://www.xiaojiaoyaya.cn/uploads/20250715/c6b7cc83deed362c05f6264175f455fb.jpg"
      ],
      // 默认布局：1列
      layoutType: 1,
      isCollect: false
    };
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    goHome() {
      common_vendor.index.switchTab({ url: "/pages/index/index" });
    },
    handleShare() {
      common_vendor.index.showActionSheet({
        itemList: ["分享到微信好友", "分享到朋友圈", "分享到QQ"]
      });
    },
    handleCollect() {
      this.isCollect = !this.isCollect;
      common_vendor.index.showToast({
        title: this.isCollect ? "收藏成功" : "取消收藏",
        icon: "success"
      });
    },
    handlePreSelect() {
      common_vendor.index.showToast({ title: "已加入预选", icon: "success" });
    },
    handleConsult() {
      common_vendor.index.navigateTo({ url: "/pages/consult/consult" });
    }
  }
};
if (!Array) {
  const _easycom_up_image2 = common_vendor.resolveComponent("up-image");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_up_image2 + _easycom_up_icon2 + _easycom_uni_icons2)();
}
const _easycom_up_image = () => "../../node-modules/uview-plus/components/u-image/u-image.js";
const _easycom_up_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_up_image + _easycom_up_icon + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["show-loading"]: true,
      height: "84vh",
      src: "https://www.xiaojiaoyaya.cn/uploads/20250715/c6b7cc83deed362c05f6264175f455fb.jpg",
      mode: "heightFix"
    }),
    b: common_vendor.p({
      name: "more-circle-fill",
      size: "18"
    }),
    c: common_vendor.p({
      name: "list",
      size: "28",
      color: $data.layoutType === 1 ? "#000000" : "#999999"
    }),
    d: common_vendor.o(($event) => $data.layoutType = 1, "26"),
    e: common_vendor.p({
      name: "coupon",
      size: "28",
      color: $data.layoutType === 2 ? "#000000" : "#999999"
    }),
    f: common_vendor.o(($event) => $data.layoutType = 2, "b4"),
    g: common_vendor.p({
      name: "grid",
      size: "28",
      color: $data.layoutType === 4 ? "#000000" : "#999999"
    }),
    h: common_vendor.o(($event) => $data.layoutType = 4, "30"),
    i: common_vendor.f($data.imgList, (item, idx, i0) => {
      return {
        a: item,
        b: idx
      };
    }),
    j: common_vendor.n("col-" + $data.layoutType),
    k: common_vendor.p({
      name: "share",
      size: "24"
    }),
    l: common_vendor.o((...args) => $options.handleShare && $options.handleShare(...args), "d9"),
    m: common_vendor.p({
      type: "star",
      size: "24",
      color: $data.isCollect ? "#ff6600" : "#999999"
    }),
    n: common_vendor.o((...args) => $options.handleCollect && $options.handleCollect(...args), "14"),
    o: common_vendor.o((...args) => $options.handlePreSelect && $options.handlePreSelect(...args), "91"),
    p: common_vendor.o((...args) => $options.handleConsult && $options.handleConsult(...args), "4f")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-dfde3efa"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/works/detail.js.map
