"use strict";
const common_vendor = require("../../common/vendor.js");
const api_reservate = require("../../api/reservate.js");
const _sfc_main = {
  name: "feedback",
  data() {
    return {
      // 宝贝数量 1:一个 2:两个 3:三个以上
      babyType: 1,
      // 拍摄类型 1:儿童 2:亲子 3:新生儿 4:全家福
      shootType: 0,
      shootIndex: 0,
      typeList: {},
      way: 1,
      // 表单数据
      formData: {
        name: "",
        phone: "",
        remark: "",
        openid: "",
        type: "",
        num: ""
      }
    };
  },
  onLoad() {
    this.getData();
    this.Setway();
    if (!common_vendor.index.getStorageSync("openid")) {
      this.getOpenid();
    }
    this.formData.openid = common_vendor.index.getStorageSync("openid");
  },
  methods: {
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
              common_vendor.index.__f__("log", "at pages/reservate/index.vue:161", "登录成功");
            } else {
              common_vendor.index.__f__("error", "at pages/reservate/index.vue:164", "登录获取openid失败");
            }
          },
          fail: (err) => {
            common_vendor.index.__f__("error", "at pages/reservate/index.vue:169", "登录请求失败", err);
          }
        });
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/reservate/index.vue:174", err);
      }
    },
    getData() {
      api_reservate.getShootwayData().then((res) => {
        this.typeList = res.data || {};
        common_vendor.index.__f__("log", "at pages/reservate/index.vue:180", "首页数据", res);
      }).catch((err) => {
        common_vendor.index.__f__("log", "at pages/reservate/index.vue:182", "请求失败", err);
        common_vendor.index.showToast({ title: "数据加载失败", icon: "none" });
      });
    },
    Setway() {
      api_reservate.getConfig().then((res) => {
        const data = res.data || {};
        this.way = data.way;
      }).catch((err) => {
        common_vendor.index.__f__("log", "at pages/reservate/index.vue:192", "请求失败", err);
        common_vendor.index.showToast({ title: "数据加载失败", icon: "none" });
      });
    },
    // 表单提交
    onSubmit(e) {
      const { name, phone, remark } = this.formData;
      if (!name) {
        common_vendor.index.showToast({ title: "请输入称呼", icon: "none" });
        return;
      }
      if (!phone) {
        common_vendor.index.showToast({ title: "请输入微信/手机号", icon: "none" });
        return;
      }
      this.formData.type = this.shootType;
      this.formData.num = this.babyType;
      api_reservate.SubmitData(this.formData).then((res) => {
        common_vendor.index.showToast({ title: "提交成功", icon: "none" });
        this.babyType = 1;
        this.shootType = 0;
        this.shootIndex = 0;
        this.formData = { name: "", phone: "", remark: "" };
      }).catch((err) => {
        common_vendor.index.__f__("log", "at pages/reservate/index.vue:219", "请求失败", err);
        common_vendor.index.showToast({ title: "提交失败", icon: "none" });
      });
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
  return common_vendor.e({
    a: $data.babyType === 1 ? 1 : "",
    b: common_vendor.o(($event) => $data.babyType = 1, "ef"),
    c: $data.babyType === 2 ? 1 : "",
    d: common_vendor.o(($event) => $data.babyType = 2, "79"),
    e: $data.babyType === 3 ? 1 : "",
    f: common_vendor.o(($event) => $data.babyType = 3, "7c"),
    g: common_vendor.f($data.typeList, (item, idx, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: idx,
        c: $data.shootIndex === idx ? 1 : "",
        d: common_vendor.o(($event) => {
          $data.shootType = item.id;
          $data.shootIndex = idx;
        }, idx)
      };
    }),
    h: $data.way === 1
  }, $data.way === 1 ? {
    i: common_vendor.o(($event) => $data.formData.name = $event, "02"),
    j: common_vendor.p({
      placeholder: "您的称呼",
      border: "surround",
      modelValue: $data.formData.name
    }),
    k: common_vendor.o(($event) => $data.formData.phone = $event, "10"),
    l: common_vendor.p({
      placeholder: "您的微信或手机号",
      border: "surround",
      modelValue: $data.formData.phone
    }),
    m: common_vendor.o(($event) => $data.formData.remark = $event, "ce"),
    n: common_vendor.p({
      placeholder: "您的拍摄需求",
      modelValue: $data.formData.remark
    })
  } : {}, {
    o: $data.formData.name && $data.formData.phone ? 1 : "",
    p: common_vendor.o((...args) => $options.onSubmit && $options.onSubmit(...args), "9e")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a1f6d26a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/reservate/index.js.map
