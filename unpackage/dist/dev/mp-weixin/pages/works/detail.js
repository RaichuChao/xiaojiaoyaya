"use strict";
const common_vendor = require("../../common/vendor.js");
const api_works = require("../../api/works.js");
const _sfc_main = {
  data() {
    return {
      data: null,
      imgNav: "",
      name: "",
      sku: [],
      imgList: [],
      layoutType: 1,
      isCollect: false,
      loading: false,
      showPopupFlag: false
    };
  },
  onLoad(options) {
    const id = options.id;
    if (id && !this.loading) {
      this.getData(id);
    }
  },
  methods: {
    async getData(id) {
      if (this.loading)
        return;
      this.loading = true;
      try {
        const res = await api_works.getWorksDetail({ id });
        common_vendor.index.__f__("log", "at pages/works/detail.vue:122", "数据加载成功", res);
        this.$nextTick(() => {
          this.data = res.data;
          this.imgList = res.data.list || [];
          this.imgNav = this.imgList.length > 0 ? this.imgList[0] : "";
          this.name = res.data.name || "";
          this.sku = res.data.sku;
        });
      } catch (err) {
        common_vendor.index.__f__("log", "at pages/works/detail.vue:133", "请求失败", err);
      } finally {
        this.loading = false;
      }
    },
    onShareAppMessage() {
      var _a, _b;
      const id = ((_a = this.data) == null ? void 0 : _a.id) || "";
      return {
        title: ((_b = this.data) == null ? void 0 : _b.name) || "精彩作品",
        path: `/pages/works/detail?id=${id}`,
        imageUrl: this.imgNav || ""
      };
    },
    onShareTimeline() {
      var _a;
      return {
        title: ((_a = this.data) == null ? void 0 : _a.name) || "精彩作品",
        imageUrl: this.imgNav || ""
      };
    },
    handleCollect() {
      this.isCollect = !this.isCollect;
      common_vendor.index.showToast({
        title: this.isCollect ? "收藏成功" : "取消收藏",
        icon: "none"
      });
    },
    handlePreSelect() {
      common_vendor.index.showToast({ title: "已加入预选", icon: "none" });
    },
    handleConsult() {
      common_vendor.index.navigateTo({
        url: "/pages/reservate/index"
      });
    },
    showPopup() {
      this.showPopupFlag = true;
    },
    closePopup() {
      this.showPopupFlag = false;
    }
  }
};
if (!Array) {
  const _easycom_up_image2 = common_vendor.resolveComponent("up-image");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_lazy_load2 = common_vendor.resolveComponent("up-lazy-load");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_up_popup2 = common_vendor.resolveComponent("up-popup");
  (_easycom_up_image2 + _easycom_up_icon2 + _easycom_up_lazy_load2 + _easycom_uni_icons2 + _easycom_up_popup2)();
}
const _easycom_up_image = () => "../../node-modules/uview-plus/components/u-image/u-image.js";
const _easycom_up_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_lazy_load = () => "../../node-modules/uview-plus/components/u-lazy-load/u-lazy-load.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_up_popup = () => "../../node-modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_up_image + _easycom_up_icon + _easycom_up_lazy_load + _easycom_uni_icons + _easycom_up_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["show-loading"]: true,
      width: "100vw",
      src: $data.imgNav,
      mode: "widthFix"
    }),
    b: common_vendor.t($data.name),
    c: common_vendor.p({
      name: "more-circle-fill",
      size: "18"
    }),
    d: common_vendor.o((...args) => $options.showPopup && $options.showPopup(...args), "de"),
    e: common_vendor.p({
      name: "list",
      size: "28",
      color: $data.layoutType === 1 ? "#000000" : "#999999"
    }),
    f: common_vendor.o(($event) => $data.layoutType = 1, "2d"),
    g: common_vendor.p({
      name: "coupon",
      size: "28",
      color: $data.layoutType === 2 ? "#000000" : "#999999"
    }),
    h: common_vendor.o(($event) => $data.layoutType = 2, "1e"),
    i: common_vendor.p({
      name: "grid",
      size: "28",
      color: $data.layoutType === 4 ? "#000000" : "#999999"
    }),
    j: common_vendor.o(($event) => $data.layoutType = 4, "0f"),
    k: common_vendor.f($data.imgList, (item, idx, i0) => {
      return {
        a: "dfde3efa-5-" + i0,
        b: common_vendor.p({
          threshold: "-250",
          ["border-radius"]: "10",
          image: item,
          ["img-mode"]: "widthFix"
        }),
        c: idx
      };
    }),
    l: common_vendor.n("col-" + $data.layoutType),
    m: common_vendor.p({
      name: "share",
      size: "24"
    }),
    n: common_vendor.p({
      type: "star",
      size: "24",
      color: $data.isCollect ? "#ff6600" : "#999999"
    }),
    o: common_vendor.o((...args) => $options.handleCollect && $options.handleCollect(...args), "8c"),
    p: common_vendor.o((...args) => $options.handleConsult && $options.handleConsult(...args), "21"),
    q: common_vendor.t($data.name),
    r: common_vendor.p({
      name: "close",
      size: "40rpx",
      color: "#333"
    }),
    s: common_vendor.o((...args) => $options.closePopup && $options.closePopup(...args), "16"),
    t: common_vendor.f($data.sku, (item1, idx1, i0) => {
      return {
        a: common_vendor.t(item1),
        b: idx1
      };
    }),
    v: $data.imgNav,
    w: common_vendor.o($options.closePopup, "d9"),
    x: common_vendor.p({
      show: $data.showPopupFlag,
      round: 10,
      mode: "bottom",
      ["close-on-click-overlay"]: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-dfde3efa"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/works/detail.js.map
