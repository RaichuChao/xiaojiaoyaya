"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 编辑状态
      isEdit: false,
      // 收藏列表（模拟数据，可替换接口请求）
      collectList: []
    };
  },
  computed: {
    // 是否全选
    isAllSelected() {
      return this.collectList.every((item) => item.selected);
    },
    // 选中数量
    selectedCount() {
      return this.collectList.filter((item) => item.selected).length;
    }
  },
  onLoad() {
  },
  methods: {
    // 切换编辑模式
    toggleEdit() {
      this.isEdit = !this.isEdit;
      if (!this.isEdit) {
        this.collectList.forEach((item) => item.selected = false);
      }
    },
    // 全选/取消全选
    selectAll() {
      const flag = !this.isAllSelected;
      this.collectList.forEach((item) => item.selected = flag);
    },
    // 点击图片：编辑模式勾选 / 预览图片
    handleClickItem(item, index) {
      common_vendor.index.__f__("log", "at pages/mine/photo.vue:103", item.selected);
      if (this.isEdit) {
        item.selected = !item.selected;
        common_vendor.index.__f__("log", "at pages/mine/photo.vue:106", item.selected);
        return;
      }
      const imgArr = this.collectList.map((v) => v.image);
      common_vendor.index.previewImage({
        urls: imgArr,
        current: item.image
      });
    },
    // 批量删除收藏
    batchDelete() {
      const selectArr = this.collectList.filter((item) => item.selected);
      if (selectArr.length === 0) {
        common_vendor.index.showToast({ title: "请选择要删除的作品", icon: "none" });
        return;
      }
      common_vendor.index.showModal({
        title: "提示",
        content: `确定删除选中${selectArr.length}条收藏？`,
        confirmText: "删除",
        confirmColor: "#f56c6c",
        success: (res) => {
          if (res.confirm) {
            this.collectList = this.collectList.filter((item) => !item.selected);
            this.isEdit = false;
            common_vendor.index.showToast({ title: "删除成功" });
          }
        }
      });
    },
    // 去首页浏览作品
    goHome() {
      common_vendor.index.switchTab({ url: "/pages/index/index" });
    }
  }
};
if (!Array) {
  const _easycom_up_checkbox2 = common_vendor.resolveComponent("up-checkbox");
  const _easycom_up_lazy_load2 = common_vendor.resolveComponent("up-lazy-load");
  (_easycom_up_checkbox2 + _easycom_up_lazy_load2)();
}
const _easycom_up_checkbox = () => "../../node-modules/uview-plus/components/u-checkbox/u-checkbox.js";
const _easycom_up_lazy_load = () => "../../node-modules/uview-plus/components/u-lazy-load/u-lazy-load.js";
if (!Math) {
  (_easycom_up_checkbox + _easycom_up_lazy_load)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.collectList.length > 0
  }, $data.collectList.length > 0 ? {
    b: common_vendor.t($data.isEdit ? "完成" : "编辑"),
    c: common_vendor.o((...args) => $options.toggleEdit && $options.toggleEdit(...args), "eb")
  } : {}, {
    d: $data.collectList.length === 0
  }, $data.collectList.length === 0 ? {
    e: common_vendor.o(($event) => common_vendor.index.navigateTo({
      url: "/pages/reservate/index"
    }), "f0")
  } : {
    f: common_vendor.f($data.collectList, (item, index, i0) => {
      return common_vendor.e($data.isEdit ? {
        a: "9040d7c4-0-" + i0,
        b: common_vendor.p({
          checked: item.selected,
          shape: "circle",
          ["active-color"]: "#f56c6c"
        })
      } : {}, {
        c: "9040d7c4-1-" + i0,
        d: common_vendor.p({
          image: item.image,
          ["img-mode"]: "aspectFill"
        }),
        e: common_vendor.t(item.name),
        f: item.id,
        g: common_vendor.o(($event) => $options.handleClickItem(item, index), item.id)
      });
    }),
    g: $data.isEdit
  }, {
    h: $data.isEdit && $data.collectList.length > 0
  }, $data.isEdit && $data.collectList.length > 0 ? {
    i: common_vendor.t($options.isAllSelected ? "取消全选" : "全选"),
    j: common_vendor.o((...args) => $options.selectAll && $options.selectAll(...args), "a5"),
    k: common_vendor.t($options.selectedCount),
    l: common_vendor.o((...args) => $options.batchDelete && $options.batchDelete(...args), "23")
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9040d7c4"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/photo.js.map
