<template>
  <view class="container">
	<view class="container-nav">
		 <up-image :show-loading="true" width="100vw" :src="imgNav" mode="widthFix"></up-image>
		
	</view>
	  
   <view class="info-box">
        <view class="title">{{name}}</view>
        <view class="tip-text" @click="showPopup">服装详情  <up-icon style="padding-left: 10rpx;" name="more-circle-fill"  size="18" ></up-icon></view>
      </view>
	  <view class="info-text">让镜头定格瞬间温柔，让影像留存岁月情深,以光影勾勒轮廓，用画面续写悠长故事。</view>
    <!-- 布局切换按钮 -->
    <view class="tab-btn">
      <view 
        class="tab-item" 
        @click="layoutType = 1"
      ><up-icon  name="list" size="28" :color="layoutType === 1 ? '#000000' : '#999999'"></up-icon></view>
	  
      <view 
        class="tab-item" 
        @click="layoutType = 2"
      ><up-icon  name="coupon" size="28" :color="layoutType === 2 ? '#000000' : '#999999'"></up-icon></view>
      <view 
        class="tab-item" 
        @click="layoutType = 4"
      ><up-icon  name="grid" size="28" :color="layoutType=== 4 ? '#000000' : '#999999'"></up-icon></view>
    </view>

    <!-- 滚动内容区 -->
    <scroll-view class="content-scroll" scroll-y   lazy-load>
      <!-- 图片列表 -->
      <view class="img-list" :class="['col-' + layoutType]">
        <view class="img-item" v-for="(item, idx) in imgList" :key="idx">
<!--          <image :src="item"  class="img"  mode="widthFix"></image> -->
		  <up-lazy-load
		  	class="item-menu-image"  
		  	threshold="-250"  
		  	border-radius="10" 
		  	:image="item" 
		  
		  	img-mode="widthFix"
		  ></up-lazy-load>
        </view>
      </view>

      <!-- 占位：防止内容被底部固定按钮遮挡 -->
      <view class="placeholder"></view>
    </scroll-view>

    <!-- 底部固定功能按钮 -->
    <view class="btn-box">
      <button class="btn-item"  open-type="share">
		<up-icon  name="share" size="24"></up-icon>
        <text class="btn-text">分享</text>
      </button>
     <view class="btn-item" @click="handleCollect">
        <uni-icons type="star" size="24" :color="isCollect ? '#ff6600' : '#999999'"></uni-icons>
        <text class="btn-text">收藏</text>
      </view>
	
		  <button class="primary-btn" @click="handleConsult" >预约服务</button>
		  <button class="consult-btn" open-type="contact" >咨询</button>
	
   
    </view>
  </view>
  <up-popup 
      :show="showPopupFlag" 
      :round="10" 
      mode="bottom" 
      @close="closePopup"
      :close-on-click-overlay="true"
    >
      <view class="popup-container">
        <!-- 标题栏 -->
        <view class="popup-header">
          <text class="popup-title">{{name}}</text>
          <view class="popup-close" @click="closePopup">
            <up-icon name="close" size="40rpx" color="#333"></up-icon>
          </view>
        </view>
  
        <!-- 服装条目 -->
        <view class="popup-item" v-for="(item1, idx1) in sku" :key="idx1" >
          <image class="item-img" :src="imgNav" mode="aspectFill"></image>
          <text class="item-text">{{item1}}</text>
        </view>
      </view>
    </up-popup>
</template>

<script>
import { getWorksDetail } from "@/api/works.js";
export default {
  data() {
    return {
      data: null,	
      imgNav: '',	
      name: '',
	  sku:[],
      imgList: [],
      layoutType: 1,
      isCollect: false,
      loading: false ,
	   showPopupFlag:false 
    };
  },
  onLoad(options) {
    const id = options.id
    if (id && !this.loading) {
      this.getData(id);
    }
  },
  methods: {	
    async getData(id) {
      if (this.loading) return
      this.loading = true
      
      try {
        const res = await getWorksDetail({ id })
        console.log('数据加载成功', res)
        
        this.$nextTick(() => {
          this.data = res.data;
          this.imgList = res.data.list || [] ;
          this.imgNav = this.imgList.length > 0 ? this.imgList[0] : '' ;
          this.name = res.data.name || '' ;
		  this.sku=res.data.sku;
        })
        
      } catch (err) {
        console.log('请求失败', err)
      } finally {
        this.loading = false
      }
    },

    onShareAppMessage() {
      const id = this.data?.id || ''
      return {
        title: this.data?.name || '精彩作品',
        path: `/pages/works/detail?id=${id}`,
        imageUrl: this.imgNav || ''
      }
    },
	  
    onShareTimeline() {
      return {
        title: this.data?.name || '精彩作品',
        imageUrl: this.imgNav || ''
      }
    },

    handleCollect() {
      this.isCollect = !this.isCollect
      uni.showToast({
        title: this.isCollect ? "收藏成功" : "取消收藏",
        icon: "none"
      })
    },
    handlePreSelect() {
      uni.showToast({ title: "已加入预选", icon: "none" })
    },
    handleConsult() {
	  	uni.navigateTo({
	  		url: '/pages/reservate/index'
	  	});
    },
	 showPopup() {
	      this.showPopupFlag = true;
	    },
	    closePopup() {
	      this.showPopupFlag = false;
	    }
  }
};
</script>

<style scoped>
.info-box{
	padding: 0 20rpx;
	margin-bottom: 60rpx;
	display: flex;
	justify-content: space-between;
	line-height: 40rpx;
	height: 40rpx;
}
.info-text{
	padding: 0 20rpx;
	color: #909399;
	font-size: 36rpx;
	margin-bottom: 60rpx;
}
.tip-text{
	display: flex;
	font-size: 36rpx;
	color: #909399	
}
.title{
	font-size: 40rpx;
}
.container {
	display: flex;
	flex-direction: column;
	background: #fff;
}
.container-nav{
	margin-bottom: 80rpx;
}

/* 布局切换按钮栏 */
.tab-btn {
	justify-content: right;
	display: flex;
	padding: 20rpx;
	background: #fff;
	border-bottom: 1rpx solid #eee;
}
.tab-item {
	padding-left: 30rpx;
}

/* 滚动区域 */
.content-scroll {
	flex: 1;
	overflow-y: auto;
}

/* 图片列表通用 */
.img-list {
	display: flex;
	flex-wrap: wrap;
	gap: 3rpx;
	box-sizing: border-box;
}
.img-list image {
	content-visibility: auto;
	backface-visibility: hidden;
	transform: translateZ(0);
}  

.img {
	width: 100%;
	display: block;
}

/* 1列：一行1个 */
.col-1 .img-item {
	width: 100%;
}
/* 2列：一行2个 */
.col-2 .img-item {
	width: calc((100% - 3rpx) / 2);
}
/* 4列：一行4个 */
.col-4 .img-item {
	width: calc((100% - 9rpx) / 4);
}

/* 底部占位（避开固定按钮） */
.placeholder {
	height: 140rpx;
}

/* 底部固定功能栏 */
.btn-box {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 120rpx;
	background: #fff;
	display: flex;
	align-items: center;
	padding: 0 30rpx;
	box-sizing: border-box;
	box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);
}
button.btn-item {
	background: transparent;
	border: none;
	padding: 0;
	margin: 0;
	line-height: normal;
}
button.btn-item::after {
	border: none;
}
.btn-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 80rpx;
}
.btn-text {
	font-size: 24rpx;
	color: #666;
	margin-top: 10rpx;
}
.primary-btn {
	flex: 1;
	height: 80rpx;
	line-height: 80rpx;
	background: #fff;
	color: #333;
	border: 1rpx solid #333;
	border-radius: 40rpx 0 0 40rpx;
	font-size: 28rpx;
	margin-left: 20rpx;
}
.consult-btn {
	width: 180rpx;
	height: 80rpx;
	line-height: 80rpx;
	background: #000;
	color: #fff;
	border-radius: 0 40rpx 40rpx 0;
	font-size: 28rpx;
}

/* 弹窗容器 */
.popup-container {
	min-height: 360rpx;
	background: #fff;
	border-radius: 20rpx;
	padding: 40rpx 30rpx;
	box-sizing: border-box;
}

/* 标题栏 */
.popup-header {
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	margin-bottom: 40rpx;
}
.popup-title {
	font-size: 36rpx;
	font-weight: 500;
	color: #333;
}
.popup-close {
	position: absolute;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
	width: 60rpx;
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

/* 服装条目 */
.popup-item {
	
	margin-top: 20rpx;
	display: flex;
	align-items: center;
	padding: 20rpx;
	border: 1rpx solid #eee;
	border-radius: 12rpx;
}
.item-img {
	width: 80rpx;
	height: 80rpx;
	border-radius: 8rpx;
	margin-right: 20rpx;
}
.item-text {
	font-size: 34rpx;
	color: #333;
}
</style>