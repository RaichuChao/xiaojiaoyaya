<template>
  <view class="container">
	<view class="nav">
		 <up-image :show-loading="true" height="84vh" src="https://www.xiaojiaoyaya.cn/uploads/20250715/c6b7cc83deed362c05f6264175f455fb.jpg" mode="heightFix"></up-image>
	</view>
	  
   <view class="info-box">
        <view class="title">1699元起拍个人写真</view>
        <view class="tip-text">服装详情  <up-icon style="padding-left: 10rpx;" name="more-circle-fill"  size="18" ></up-icon></view>
		
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
    <scroll-view class="content-scroll" scroll-y>
      <!-- 图片列表 -->
      <view class="img-list" :class="['col-' + layoutType]">
        <view class="img-item" v-for="(item, idx) in imgList" :key="idx">
          <image :src="item"  class="img"  mode="widthFix"></image>
        </view>
      </view>

      <!-- 占位：防止内容被底部固定按钮遮挡 -->
      <view class="placeholder"></view>
    </scroll-view>

    <!-- 底部固定功能按钮 -->
    <view class="btn-box">
      <view class="btn-item" @click="handleShare">
 
		<up-icon  name="share" size="24"></up-icon>
        <text class="btn-text">分享</text>
      </view>
     <view class="btn-item" @click="handleCollect">
        <uni-icons type="star" size="24" :color="isCollect ? '#ff6600' : '#999999'"></uni-icons>
        <text class="btn-text">收藏</text>
      </view>
      <button class="primary-btn" @click="handlePreSelect">加入预选</button>
      <button class="consult-btn" @click="handleConsult">咨询</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 图片数组，自行替换地址
      imgList: [
        "https://www.xiaojiaoyaya.cn/uploads/20250715/c6b7cc83deed362c05f6264175f455fb.jpg",
        "https://www.xiaojiaoyaya.cn/uploads/20250715/c6b7cc83deed362c05f6264175f455fb.jpg",
        "https://www.xiaojiaoyaya.cn/uploads/20250715/c6b7cc83deed362c05f6264175f455fb.jpg",
        "https://www.xiaojiaoyaya.cn/uploads/20250715/c6b7cc83deed362c05f6264175f455fb.jpg",
        "https://www.xiaojiaoyaya.cn/uploads/20250715/c6b7cc83deed362c05f6264175f455fb.jpg",
        "https://www.xiaojiaoyaya.cn/uploads/20250715/c6b7cc83deed362c05f6264175f455fb.jpg"
      ],
      // 默认布局：1列
      layoutType: 1,
      isCollect: false
    };
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    goHome() {
      uni.switchTab({ url: "/pages/index/index" });
    },
    handleShare() {
      uni.showActionSheet({
        itemList: ["分享到微信好友", "分享到朋友圈", "分享到QQ"]
      });
    },
    handleCollect() {
      this.isCollect = !this.isCollect;
      uni.showToast({
        title: this.isCollect ? "收藏成功" : "取消收藏",
        icon: "success"
      });
    },
    handlePreSelect() {
      uni.showToast({ title: "已加入预选", icon: "success" });
    },
    handleConsult() {
      uni.navigateTo({ url: "/pages/consult/consult" });
    }
  }
};
</script>

<style scoped>
page {
  background: #f5f5f5;
}
.nav{
	height: 100vh;
}
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

  
 /* padding: 20rpx; */
 gap: 3rpx;
  box-sizing: border-box;
}

.img {
	width: 100%;
	display: block;
/*  border-radius: 12rpx; */
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
</style>