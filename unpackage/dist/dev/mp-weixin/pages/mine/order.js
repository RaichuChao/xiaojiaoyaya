"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      // 模拟预约记录数据（实际项目从接口获取）
      list: []
    };
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.list.length === 0
  }, $data.list.length === 0 ? {
    b: common_assets._imports_0,
    c: common_vendor.o(($event) => common_vendor.index.navigateTo({
      url: "/pages/reservate/index"
    }), "03")
  } : {}, {
    d: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: common_vendor.t(item.statusText),
        b: common_vendor.n(item.statusClass),
        c: common_vendor.t(item.createTime),
        d: common_vendor.t(item.personCount),
        e: common_vendor.t(item.shootType),
        f: common_vendor.t(item.appointTime),
        g: common_vendor.t(item.demand || "无"),
        h: index
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3e4c2118"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/order.js.map
