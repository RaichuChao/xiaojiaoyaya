<template>
  <view class="record-page">
    <!-- 顶部标题 -->
    <view class="page-title">我的预约记录</view>

    <!-- 空状态（无数据时显示） -->
    <view class="empty-box" v-if="list.length === 0">
      <image src="/static/empty.png" mode="widthFix" class="empty-img"></image>
      <text class="empty-text">暂无预约记录</text>
	  <button class="go-work-btn" @click="uni.navigateTo({url:'/pages/reservate/index'})">去预约拍摄</button>
	  
    </view>
	

    <!-- 预约记录列表（有数据时显示） -->
    <view class="record-card" v-for="(item, index) in list" :key="index">
      <!-- 状态 + 时间 -->
      <view class="card-top">
        <view class="status" :class="item.statusClass">{{ item.statusText }}</view>
        <view class="create-time">{{ item.createTime }}</view>
      </view>

      <!-- 预约信息 -->
      <view class="info-item">
        <text class="label">拍摄人数：</text>
        <text class="value">{{ item.personCount }} 人</text>
      </view>

      <view class="info-item">
        <text class="label">拍摄类型：</text>
        <text class="value">{{ item.shootType }}</text>
      </view>

      <view class="info-item">
        <text class="label">预约时间：</text>
        <text class="value">{{ item.appointTime }}</text>
      </view>

      <view class="info-item demand">
        <text class="label">拍摄需求：</text>
        <text class="value">{{ item.demand || '无' }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 模拟预约记录数据（实际项目从接口获取）
      list: []
    };
	
  },methods:{

  }
};
</script>

<style scoped>
/* 页面容器 */
.record-page {
  padding: 20rpx;
  background-color: #f7f8fa;
  min-height: 100vh;
}

/* 页面标题 */
.page-title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 24rpx;
  color: #333;
}
.go-work-btn {
  width: 240rpx;
  height: 80rpx;
  line-height: 80rpx;
  background: #333;
  color: #fff;
  border-radius: 40rpx;
  font-size: 28rpx;
}
/* 空状态 */
.empty-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 120rpx;
}
.empty-img {
  width: 200rpx;
  height: 200rpx;
  opacity: 0.4;
}
.empty-text {
  font-size: 28rpx;
  color: #999;
 margin: 30rpx 0 60rpx;
}

/* 卡片样式 */
.record-card {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);
}

/* 顶部状态 */
.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}
.status {
  font-size: 24rpx;
  padding: 6rpx 14rpx;
  border-radius: 30rpx;
}
.wait {
  background: #fff7e8;
  color: #ff9f29;
}
.done {
  background: #e8f8f2;
  color: #07c160;
}
.create-time {
  font-size: 24rpx;
  color: #999;
}

/* 信息行 */
.info-item {
  font-size: 28rpx;
  line-height: 1.6;
  margin-bottom: 16rpx;
  display: flex;
}
.label {
  color: #666;
  width: 160rpx;
}
.value {
  color: #333;
  flex: 1;
}

/* 拍摄需求换行 */
.demand {
  align-items: flex-start;
}
</style>