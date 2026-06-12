"use strict";
const common_vendor = require("../../common/vendor.js");
const api_works = require("../../api/works.js");
const _sfc_main = {
  data() {
    return {
      tabbar: [],
      scrollTop: 0,
      //tab标题的滚动条位置
      current: 0,
      // 预设当前项的值
      menuHeight: 0,
      // 左边菜单的高度
      menuItemHeight: 0
      // 左边菜单item的高度
    };
  },
  computed: {},
  onLoad() {
    this.getData();
  },
  methods: {
    getData() {
      api_works.getList().then((res) => {
        common_vendor.index.__f__("log", "at pages/works/index.vue:69", "首页数据", res);
        this.tabbar = res.data;
      }).catch((err) => {
        common_vendor.index.__f__("log", "at pages/works/index.vue:72", "请求失败", err);
      });
    },
    getImg() {
      return Math.floor(Math.random() * 35);
    },
    // 点击左边的栏目切换
    async swichMenu(index) {
      if (index == this.current)
        return;
      this.current = index;
      if (this.menuHeight == 0 || this.menuItemHeight == 0) {
        await this.getElRect("menu-scroll-view", "menuHeight");
        await this.getElRect("u-tab-item", "menuItemHeight");
      }
      this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
    },
    // 获取一个目标元素的高度
    getElRect(elClass, dataVal) {
      new Promise((resolve, reject) => {
        const query = common_vendor.index.createSelectorQuery().in(this);
        query.select("." + elClass).fields({ size: true }, (res) => {
          if (!res) {
            setTimeout(() => {
              this.getElRect(elClass);
            }, 10);
            return;
          }
          this[dataVal] = res.height;
        }).exec();
      });
    },
    goPage(id) {
      common_vendor.index.navigateTo({
        url: `/pages/works/detail?id=${id}`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.tabbar, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: index,
        c: common_vendor.n($data.current == index ? "u-tab-item-active" : ""),
        d: $data.current == index ? _ctx.upThemeVar("--up-card-bg-color") : _ctx.upThemeVar("--up-bg-color"),
        e: index,
        f: common_vendor.o(($event) => $options.swichMenu(index), index)
      };
    }),
    b: _ctx.upThemeVar("--up-content-color"),
    c: $data.scrollTop,
    d: common_vendor.f($data.tabbar, (item, index, i0) => {
      return common_vendor.e({
        a: $data.current == index
      }, $data.current == index ? common_vendor.e({
        b: common_vendor.f(item.list, (item1, index1, i1) => {
          return {
            a: item1.cover,
            b: common_vendor.t(item1.name),
            c: common_vendor.o(($event) => $options.goPage(item1.id), index1),
            d: index1
          };
        }),
        c: item.list,
        d: item.list.length === 0
      }, item.list.length === 0 ? {} : {}, {
        e: common_vendor.s(_ctx.upThemeCardStyle),
        f: _ctx.upThemeVar("--up-bg-color")
      }) : {}, {
        g: index
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b0782d84"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/works/index.js.map
