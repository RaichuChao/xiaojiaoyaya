<template>
  <view class="photo-container">
    <!-- 顶部轮播图 -->
    <up-swiper
      :list="swiperList"
      :autoplay="false"
      height="100vh"
    ></up-swiper>
  </view>

  <!-- 作品分类区域 -->
  <view class="section-wrap">
    <view class="section-title">
      <text class="title-cn">作品分类</text>
      <text class="title-en">Works Exhibition</text>
    </view>
    <view class="category-grid">
      <view 
        v-for="(item, idx) in categoryList" 
        :key="idx" 
        class="grid-item" @click="goFL(idx)"
      >
        <view style="height: 120px; box-shadow: none;">
          <up-lazy-load threshold="-100" :image="item.image" img-mode="aspectFill"></up-lazy-load>
        </view>
        <view class="grid-mask">
          <text class="grid-cn">{{ item.name }}</text>
          <text v-if="item.nickname" class="grid-en">{{ item.nickname }}</text>
        </view>
      </view>
    </view>
  </view>

  <!-- 视频展示区域 -->
  <view class="section-wrap">
    <view class="section-title">
      <text class="title-cn">视频展示</text>
      <text class="title-en">Video</text>
    </view>
    <view class="video-list">
      <view class="video-item" v-for="(item, idx) in videoList" :key="idx">
        <video 
          :src="item.url" 
          :poster="item.poster"
          class="video-player"
          object-fit="fill"
        ></video>
      </view>
    </view>
  </view>

  <!-- 关于我们 -->
  <view class="section-wrap">
    <view class="section-title">
      <text class="title-cn">关于我们</text>
      <text class="title-en">About Us</text>
    </view>
	<!-- 顶部品牌区域 -->
<!-- 	<view class="about-header">
	  <text class="brand-text">Little </text>
	  <text class="studio-text"> Feet </text>
	  <view class="dot"></view>
	</view> -->
	

	
	<!-- 核心文案卡片区域 -->
	<view class="card">
	  <!-- 左侧引号装饰 -->
	  <up-image class="quote-left" :show-loading="true" src="/static/y1.png" width="60rpx" height="60rpx" ></up-image>
	  
	
	  <!-- 文案内容 -->
	  <view class="card-content">
	  
		<text class="brand-text">Little </text>
		<text class="studio-text"> Feet </text>
	     <view style="padding: 10rpx;"> </view>
	    <text class="card-text">小脚丫丫，定格童年每一步可爱✨</text>
	    <text class="card-text">捕捉幼崽温柔瞬间，珍藏不可复刻的童年</text>
	    <text class="card-text">以光影为礼，记录孩子纯粹成长</text>
		<text class="card-text">小小的脚丫，大大的美好童年</text>
		<text class="card-text">不流水线拍照，只拍有温度的儿童写真</text>
	    <!-- 中间小logo -->
	    <view class="mini-logo">
	      <text class="logo-text">Little</text>
	      <text class="logo-subtext">Feet </text>
	    </view>
	  </view>
	  <!-- 右侧引号装饰 -->
	  <view style="float: right;">
		  <up-image class="quote-right" :show-loading="true" src="/static/y2.png" width="60rpx" height="60rpx" ></up-image>
		  
	  </view>
	  
	   
	</view>
	<!-- 工作室名称及标语区域 -->
	<view class="title-section">
<!-- 	  <text class="studio-name">小脚丫丫儿童摄影工作室</text> -->
	  <text class="slogan-en">Today, love yourself</text>
	  <!-- <text class="location">江西 南昌</text> -->
	</view>
<!--    <view class="about-img"></view> -->
  </view>

  <!-- 联系我们 -->
  <view class="section-wrap">
    <view class="section-title">
      <text class="title-cn">联系我们</text>
      <text class="title-en">Contact Us</text>
    </view>
    <map 
      :longitude="longitude"  
      :markers="markers" 
      :latitude="latitude" 
      scale="14" 
      :show-location="true" 
      style="width: 100%; height: 300px;"
    ></map>

    <!-- 地址：打开地图导航 -->
    <view class="contact-item" @click="handleOpenLocation">
    
	  <view class="icon-wrap">
			   <up-icon size="40rpx"  name="map-fill" class="icon-inner"></up-icon>
	  </view>
      <span class="label">地址：{{ store.store_area || '' }} <span  class="text-tip"> （点击查看）</span> </span>

    </view>

    <!-- 微信：复制微信号 -->
    <view class="contact-item" @click="handleCopyWechat">
  
	  <view class="icon-wrap"  style="width: 80rpx;">
	  		   <up-icon size="40rpx"  name="weixin-fill"></up-icon>
	  </view>
      <span class="label">微信：{{ store.store_vx || '' }}<span  class="text-tip"> （点击复制）</span></span>
    </view>

    <!-- 电话：拨打电话 -->
    <view class="contact-item" @click="handleCall">
    
	  <view class="icon-wrap" style="width: 80rpx;">
		   <up-icon size="40rpx"  name="phone-fill"></up-icon>
	  </view>
	 
	  
      <text class="label">电话：{{ store.store_phone || '' }} <text class="text-tip"> （点击拨打）</text></text>
    </view>
  </view>

  <fab></fab>
</template>

<script>
import fab from '@/common/fab.vue';
import { reactive } from 'vue';  
import { getHomeData } from '@/api/index.js';

export default {
  components: {
    fab
  },
  data() {
    return {
      // 地图坐标
      latitude: 28.31,
      longitude: 109.74,
      markers: [{
        id: 1,
        latitude: 28.31,
        longitude: 109.74,
        title: '小脚丫丫',
        iconPath: '/static/loc.png',
        width: 32,
        height: 32
      }],
      swiperList: reactive([]),
      categoryList: reactive([]),
      videoList: [
        { 
          url: 'https://www.xiaojiaoyaya.cn/uploads/20260615/de86f27c6f173ce4234a1b726a8204b4.mp4', 
          poster: 'https://www.xiaojiaoyaya.cn/uploads/20260616/91d17d505581f0fc4028527a8c007c39.jpg' 
        }
      ],
      // 重点：改为对象，不是数组！
      store: reactive({})
    }
  },
  onLoad() {
    this.getData();

  },
  methods: {

	  onShareAppMessage(res) {
	      const id = this.data?.id || ''
	      return {
	        title: '留存转瞬即逝的童年时光', // 分享标题
	        path: `/pages/index/index`, // 分享落地页（必须写相对路径）
	        imageUrl:'' // 分享封面图（网络/本地图片）
	      }
	    },
	  
	    // 2. 分享到朋友圈（右上角菜单触发）
	    onShareTimeline() {
	      return {
	        title: '小脚丫丫儿童摄影馆',
	       
	      }
	    },
    // 复制微信
    handleCopyWechat() {
      const wx = this.store.store_vx;
      if (!wx) {
        uni.showToast({ title: '暂无微信号', icon: 'none' });
        return;
      }
      uni.setClipboardData({
        data: wx,
        success: () => {
          uni.showToast({ title: '微信号已复制', icon: 'none' });
        }
      });
    },
	goFL(id){
		uni.reLaunch ({
			url: `/pages/works/index?id=${id}`
		})
	},
    // 打开地图导航
    handleOpenLocation() {
      const addr = this.store.store_area;
      if (!addr) {
        uni.showToast({ title: '暂无地址信息', icon: 'none' });
        return;
      }
      uni.openLocation({
        latitude: this.latitude,
        longitude: this.longitude,
        name: '小脚丫丫',
        address: addr,
        fail: () => {
          uni.showToast({ title: '暂无法打开地图', icon: 'none' });
        }
      });
    },

    // 拨打电话
    handleCall() {
      const phone = this.store.store_phone;
      if (!phone) {
        uni.showToast({ title: '暂无联系电话', icon: 'none' });
        return;
      }
      uni.makePhoneCall({
        phoneNumber: phone,
        fail: () => {
          uni.showToast({ title: '暂无法拨打电话', icon: 'none' });
        }
      });
    },

    // 请求首页数据
    getData() {
      getHomeData().then(res => {
        const data = res.data || {};
        this.swiperList = data.swiper || [];
        this.categoryList = data.category || [];
        this.store = data.store || {};

        // 动态更新地图坐标（如果接口返回经纬度，开启下面两行）
        // this.latitude = this.store.lat || 28.31;
        // this.longitude = this.store.lng || 109.74;
        // this.markers[0].latitude = this.latitude;
        // this.markers[0].longitude = this.longitude;

        console.log('首页数据', res);
      }).catch(err => {
        console.log('请求失败', err);
        uni.showToast({ title: '数据加载失败', icon: 'none' });
      })
    }
  }
}
</script>

<style scoped>
.photo-container {
  background-color: #fff;
  min-height: 100vh;
}

.u-swiper {
  height: 420rpx;
}

.section-wrap {
  padding: 40rpx 0;
}
.section-title {
  text-align: center;
  margin-bottom: 30rpx;
}
.title-cn {
  display: block;
  font-size: 36rpx;
  font-weight: 500;
  color: #222;
}
.title-en {
  display: block;
  font-size: 24rpx;
  color: #999;
  margin-top: 10rpx;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10rpx;
}
.grid-item {
  position: relative;
  overflow: hidden;
}
.grid-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%
}
.grid-cn {
  font-size: 30rpx;
  font-weight: 500;
}
.grid-en {
  font-size: 22rpx;
  margin-top: 8rpx;
  opacity: 0.8;
}

.video-list {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}
.video-item {
  border-radius: 12rpx;
  overflow: hidden;
}
.video-player {
  width: 100%;
  height: 380rpx;
}



/* 顶部品牌区域 */
.about-header {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 60rpx;
}
.brand-text {
  font-size: 48rpx;
  font-weight: bold;
  color: #333333;
}
.studio-text {
  font-size: 24rpx;
  color: #666666;
  margin-left: 10rpx;
  margin-bottom: 8rpx;
}
.dot {
  width: 16rpx;
  height: 16rpx;
  background-color: #f9c850;
  border-radius: 50%;
  margin-left: 10rpx;
  margin-bottom: 8rpx;
}

/* 工作室名称区域 */
.title-section {
  text-align: center;
  margin-top: 80rpx;
}
.studio-name {
  font-size: 36rpx;
  font-weight: 600;
  color: #333333;
  display: block;
  margin-bottom: 20rpx;
}
.slogan-en {
  font-size: 24rpx;
  color: #b89f7a;
  display: block;
  margin-bottom: 10rpx;
}
.location {
  font-size: 22rpx;
  color: #666666;
}

/* 核心文案卡片 */
.card {
  background-color: #f8f8f8;
  border-radius: 8rpx;
  padding: 120rpx 40rpx; /* 上下加大内边距，避免引号遮挡文字 */
  position: relative;
  width: 100%; /* 关键：给相对定位基准铺满整行 */
  box-sizing: border-box;
  overflow: visible; /* 允许引号超出卡片边缘 */
}
/* 引号装饰 统一修复 */
.quote-left {
  position: absolute !important;
  top: 30rpx;
  left: 30rpx;
  width: 120rpx;
  height: 120rpx;
  margin: 0 !important;
  padding: 0 !important;
  display: block !important;
}
.quote-right {
  position: absolute !important;
  bottom: 30rpx;
  right: 30rpx !important; /* 强制靠右，提升权重覆盖组件默认样式 */
  width: 120rpx;
  height: 120rpx;
  margin: 0 !important;
  padding: 0 !important;
  display: block !important;
}
/* 卡片内容 */
.card-content {
  text-align: center;
  position: relative;
  z-index: 1; /* 文字在引号上层，不被遮挡 */
}
.card-title {
  font-size: 28rpx;
  color: #333333;
  display: block;
  margin-bottom: 40rpx;
}
.card-text {
  font-size: 24rpx;
  color: #555555;
  line-height: 40rpx;
  display: block;
  margin-bottom: 20rpx;
}
/* 中间小logo */
.mini-logo {
  margin-top: 60rpx;
}
.logo-text {
  font-size: 20rpx;
  font-weight: bold;
  color: #333333;
}
.logo-subtext {
  font-size: 16rpx;
  color: #666666;
  margin-left: 4rpx;
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 30rpx 20rpx;
  border-bottom: 1rpx solid #e5e5e5;
  /* 提升点击区域 + 点击反馈 */
  cursor: pointer;
}
.contact-item:active {
  background-color: #f5f5f5;
}

.icon-wrap{
  width: 180rpx;
  height: 80rpx;
  /* 圆形关键 */
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.12);
  margin-right: 30rpx;
  
  /* 让内部图标居中 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-inner {
  width: 40rpx;
  height: 40rpx;
  flex-shrink: 0; /* 禁止压缩变形 */
}
.label {
	letter-spacing: 1rpx;
  font-size: 30rpx;
  color: #000000;
}
.text-tip{
	
	font-size: 20rpx;
	color: #909399;
}
</style>