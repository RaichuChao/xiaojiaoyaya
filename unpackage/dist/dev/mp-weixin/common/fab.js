"use strict";
const common_vendor = require("./vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      title: "uni-fab",
      directionStr: "垂直",
      horizontal: "right",
      vertical: "bottom",
      direction: "horizontal",
      popMenu: false,
      pattern: {
        color: "#7A7E83",
        backgroundColor: "#fff",
        selectedColor: "#007AFF",
        buttonColor: "#000",
        iconColor: "#fff",
        icon: "chat-filled"
      },
      is_color_type: false
    };
  },
  onBackPress() {
    if (this.$refs.fab.isShow) {
      this.$refs.fab.close();
      return true;
    }
    return false;
  },
  methods: {
    fabClick() {
      common_vendor.index.navigateTo({
        url: "/pages/reservate/index"
      });
    }
  }
};
if (!Array) {
  const _component_uni_fab = common_vendor.resolveComponent("uni-fab");
  _component_uni_fab();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sr("fab", "2b3f7bbf-0"),
    b: common_vendor.o($options.fabClick, "bd"),
    c: common_vendor.p({
      pattern: $data.pattern,
      horizontal: $data.horizontal,
      vertical: $data.vertical,
      direction: $data.direction
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/fab.js.map
