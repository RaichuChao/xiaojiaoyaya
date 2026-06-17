"use strict";
const common_vendor = require("../../common/vendor.js");
const fab = () => "../../common/fab.js";
const _sfc_main = {
  components: {
    fab
  },
  data() {
    return {
      hasContent: false
      // 控制是否显示空提示，后续可替换为真实数据
    };
  },
  methods: {
    onShareAppMessage(res) {
      var _a;
      ((_a = this.data) == null ? void 0 : _a.id) || "";
      return {
        title: "留存转瞬即逝的童年时光",
        // 分享标题
        path: `/pages/index/index`,
        // 分享落地页（必须写相对路径）
        imageUrl: "https://www.xiaojiaoyaya.cn/uploads/20250715/539d7ec2ec75c5f2fdbc5dd62018fd0e.jpg"
        // 分享封面图（网络/本地图片）
      };
    },
    // 2. 分享到朋友圈（右上角菜单触发）
    onShareTimeline() {
      return {
        title: "小脚丫丫儿童摄影馆"
      };
    }
  }
};
if (!Array) {
  const _component_fab = common_vendor.resolveComponent("fab");
  _component_fab();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.hasContent
  }, !$data.hasContent ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-46f307a2"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/titbits/index.js.map
