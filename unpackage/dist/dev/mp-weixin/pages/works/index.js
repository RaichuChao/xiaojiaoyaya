"use strict";
const common_vendor = require("../../common/vendor.js");
const api_works = require("../../api/works.js");
const _sfc_main = {
  data() {
    return {
      tabbar: [],
      scrollTop: 0,
      current: 0,
      menuHeight: 0,
      menuItemHeight: 0
    };
  },
  onLoad() {
    this.getData();
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
    },
    getData() {
      api_works.getList().then((res) => {
        common_vendor.index.__f__("log", "at pages/works/index.vue:82", "首页数据", res);
        this.tabbar = res.data;
      }).catch((err) => {
        common_vendor.index.__f__("log", "at pages/works/index.vue:85", "请求失败", err);
      });
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
if (!Array) {
  const _easycom_up_lazy_load2 = common_vendor.resolveComponent("up-lazy-load");
  _easycom_up_lazy_load2();
}
const _easycom_up_lazy_load = () => "../../node-modules/uview-plus/components/u-lazy-load/u-lazy-load.js";
if (!Math) {
  _easycom_up_lazy_load();
}
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
        b: common_vendor.t(item.name),
        c: common_vendor.f(item.list, (item1, index1, i1) => {
          return {
            a: "b0782d84-0-" + i0 + "-" + i1,
            b: common_vendor.p({
              threshold: "-250",
              ["border-radius"]: "10",
              image: item1.cover,
              index: index1,
              ["img-mode"]: "aspectFill"
            }),
            c: common_vendor.o(($event) => $options.goPage(item1.id), index1),
            d: common_vendor.t(item1.name),
            e: index1
          };
        }),
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
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/works/index.js.map
