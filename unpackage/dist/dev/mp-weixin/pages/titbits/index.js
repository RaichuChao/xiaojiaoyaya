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
  methods: {}
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
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/titbits/index.js.map
