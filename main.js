import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import VueLazyload from 'vue-lazyload';
 

import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})

 
app.use(VueLazyload, {
  preLoad: 1.3, // 预加载高度的比例
  attempt: 1, // 尝试加载的次数
  // 其他选项...
});
 
app.$mount()
// #endif
import uviewPlus from 'uview-plus'
// #ifdef VUE3
import { createSSRApp } from 'vue'
import MixinShare from './common/share.js';

export function createApp() {
  const app = createSSRApp(App)
    app.use(uviewPlus);
	app.mixin(MixinShare);
  return {
    app
  }
}
// #endif