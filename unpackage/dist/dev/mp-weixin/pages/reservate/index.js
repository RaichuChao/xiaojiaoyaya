"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "feedback",
  data() {
    return {
      // 宝贝数量 1:一个 2:两个 3:三个以上
      babyType: 1,
      // 拍摄类型 1:儿童 2:亲子 3:新生儿 4:全家福
      shootType: 1,
      // 表单数据
      formData: {
        name: "",
        phone: "",
        desc: ""
      }
    };
  },
  methods: {
    // 表单提交
    onSubmit(e) {
      const { name, phone, desc } = this.formData;
      if (!name) {
        common_vendor.index.showToast({ title: "请输入称呼", icon: "none" });
        return;
      }
      if (!phone) {
        common_vendor.index.showToast({ title: "请输入微信/手机号", icon: "none" });
        return;
      }
      common_vendor.index.__f__("log", "at pages/reservate/index.vue:133", "提交数据：", {
        babyType: this.babyType,
        shootType: this.shootType,
        ...this.formData
      });
      common_vendor.index.showToast({ title: "提交成功" });
    }
  }
};
if (!Array) {
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  const _easycom_up_textarea2 = common_vendor.resolveComponent("up-textarea");
  (_easycom_up_input2 + _easycom_up_textarea2)();
}
const _easycom_up_input = () => "../../node-modules/uview-plus/components/u-input/u-input.js";
const _easycom_up_textarea = () => "../../node-modules/uview-plus/components/u-textarea/u-textarea.js";
if (!Math) {
  (_easycom_up_input + _easycom_up_textarea)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.babyType === 1 ? 1 : "",
    b: common_vendor.o(($event) => $data.babyType = 1, "aa"),
    c: $data.babyType === 2 ? 1 : "",
    d: common_vendor.o(($event) => $data.babyType = 2, "37"),
    e: $data.babyType === 3 ? 1 : "",
    f: common_vendor.o(($event) => $data.babyType = 3, "3a"),
    g: $data.shootType === 1 ? 1 : "",
    h: common_vendor.o(($event) => $data.shootType = 1, "88"),
    i: $data.shootType === 2 ? 1 : "",
    j: common_vendor.o(($event) => $data.shootType = 2, "96"),
    k: $data.shootType === 3 ? 1 : "",
    l: common_vendor.o(($event) => $data.shootType = 3, "fd"),
    m: $data.shootType === 4 ? 1 : "",
    n: common_vendor.o(($event) => $data.shootType = 4, "fc"),
    o: common_vendor.o(($event) => $data.formData.name = $event, "bf"),
    p: common_vendor.p({
      placeholder: "您的称呼",
      border: "surround",
      modelValue: $data.formData.name
    }),
    q: common_vendor.o(($event) => $data.formData.phone = $event, "7f"),
    r: common_vendor.p({
      placeholder: "您的微信或手机号",
      border: "surround",
      modelValue: $data.formData.phone
    }),
    s: common_vendor.o(($event) => $data.formData.desc = $event, "ba"),
    t: common_vendor.p({
      placeholder: "您的拍摄需求",
      modelValue: $data.formData.desc
    }),
    v: common_vendor.o((...args) => $options.onSubmit && $options.onSubmit(...args), "21")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a1f6d26a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/reservate/index.js.map
