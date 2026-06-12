<template>
  <view class="profile-page">
    <!-- 顶部设置按钮 -->
    <view class="top-settings">
      <view class="settings-icon">
        <image src="/static/settings.png" mode="aspectFit"></image>
      </view>
    </view>

    <!-- 用户信息头部 -->
    <view class="user-header">
      <view class="avatar-wrapper">
        <image class="avatar" src="/static/user-avatar.jpg" mode="aspectFill"></image>
        <view class="verified-badge">
          <image src="/static/verified.png" mode="aspectFit"></image>
        </view>
      </view>
      <text class="user-name">Jessica Liu</text>
      
    </view>

  
    <view class="stats-card">
      <view class="stat-item ">
         我的预约
      </view>
	
		  <up-icon  name="arrow-right" size="50rpx" class="item-left"></up-icon>
<!-- 			<up-image :show-loading="true" src="/static/jh.png" width="100rpx"  mode="widthFix" ></up-image> -->
	
    </view>
	<view class="stats-card">
	  <view class="stat-item ">
	     我的收藏
	  </view>
	    <up-icon  name="arrow-right" size="50rpx" class="item-left"></up-icon>
	</view>
	<view class="stats-card">
	  <view class="stat-item ">
	     打印订单
	  </view>
	    <up-icon  name="arrow-right" size="50rpx" class="item-left"></up-icon>
	</view>
	<view class="stats-card">
	  <view class="stat-item ">
	     我的影集
	  </view>
	   <up-icon  name="arrow-right" size="50rpx" class="item-left"></up-icon>
	
	</view>
	  <view class="text-bottom"> 小脚丫丫儿童摄影馆</view>
	  <view class="bottom-tip"> Little Footprints Children's Photography</view>
  </view>

</template>

<script>
export default {
  name: "MovieProfile",
  data() {
    return {
      activeTab: "wishlist",
      userInfo: {
        name: "Jessica Liu",
        handle: "@Jeje_liu",
        rank: "44920th",
        wishlist: 3,
        watching: 2,
        watched: 8
      },
      movieList: [
        {
          id: 1,
          title: "Ghana",
          rating: 7.2,
          poster: "/static/movie-ghana.jpg"
        },
        {
          id: 2,
          title: "Parasite",
          rating: 7.2,
          poster: "/static/movie-parasite.jpg"
        }
      ]
    };
  },
  methods: {
    // 切换标签
    switchTab(tab) {
      this.activeTab = tab;
      // 这里可以添加切换标签后的数据加载逻辑
    },
    // 跳转到设置页面
    goToSettings() {
      uni.navigateTo({
        url: "/pages/settings/settings"
      });
    },
    // 电影卡片点击事件
    onMovieClick(movieId) {
      uni.navigateTo({
        url: `/pages/movie-detail/movie-detail?id=${movieId}`
      });
    }
  }
};
</script>

<style scoped>
/* 全局样式重置 */
/* page {
  background-color: #f8f9fc;
  height: 100vh;
  overflow: hidden; 
} */

.profile-page {
overflow: hidden;
  padding: 40rpx 30rpx;
  box-sizing: border-box;
  background-color: #f4f4f5;
  
}

/* 顶部设置按钮 */
.top-settings {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 40rpx;
}
.settings-icon {
  width: 60rpx;
  height: 60rpx;
}
.settings-icon image {
  width: 100%;
  height: 100%;
}

/* 用户信息头部 */
.user-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60rpx;
}
.avatar-wrapper {
  position: relative;
  margin-bottom: 30rpx;
}
.avatar {
  width: 200rpx;
  height: 200rpx;
  border-radius: 50%;
  box-shadow: 0 10rpx 30rpx rgba(0,0,0,0.15);
}
.verified-badge {
  position: absolute;
  right: 10rpx;
  top: 10rpx;
  width: 60rpx;
  height: 60rpx;
}
.verified-badge image {
  width: 100%;
  height: 100%;
}
.user-name {
  font-size: 40rpx;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 10rpx;
}


/* 数据统计卡片 */
.stats-card {
	display: flex;
 
	justify-content: space-between;
  background-color: #ffffff;
  border-radius: 20rpx;
  padding: 30rpx 20rpx;
  margin-bottom: 40rpx;
/*  box-shadow: 0 8rpx 20rpx rgba(0,0,0,0.05); */
  line-height: 100rpx;
	height: 100rpx;
}
.stat-item {
	
	
font-weight: 600;
font-size: 36rpx;
}

.item-left{
	line-height: 100rpx;
		height: 100rpx;
}
.text-bottom{
	text-align: center;
	font-size: 36rpx;
	font-weight: 800;
}

.bottom-tip{
	color: #909399;
	text-align: center;
	font-size: 26rpx;
	letter-spacing:2rpx;
	padding-top: 10rpx;
	
}
</style>