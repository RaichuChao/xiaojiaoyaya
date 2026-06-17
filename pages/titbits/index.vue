<template>
  <view class="container">
    <!-- 标题区域 -->
    <view class="title-section">
      <text class="main-title">摄影花絮</text>
      <text class="sub-title">Film and television tidbits</text>
    </view>
    
    <!-- 花絮内容区域（可扩展） -->
    <view class="content-section">
      <!-- 这里可以添加图片/视频列表、文字描述等内容 -->
      <view class="empty-tip" v-if="!hasContent">
        暂无花絮内容，敬请期待...
      </view>
    </view>
  </view>
    <fab></fab>
</template>

<script>
import fab from '@/common/fab.vue';	
export default {
	components: {
	  fab
	},
  data() {
    return {
      hasContent: false // 控制是否显示空提示，后续可替换为真实数据
    };
  },
  methods:{
  }
};
</script>

<style scoped>
/* 页面容器 */
.container {
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx 20rpx;
  box-sizing: border-box;
}

/* 标题区域 */
.title-section {
  text-align: center;
  margin-bottom: 60rpx;
}

/* 主标题 */
.main-title {
  font-size: 48rpx;
  font-weight: bold;
  color: #000000;
  display: block;
  margin-bottom: 16rpx;
}

/* 副标题（英文） */
.sub-title {
  font-size: 28rpx;
  color: #333333;
  font-style: italic;
  display: block;
  letter-spacing: 2rpx;
}

/* 内容区域 */
.content-section {
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 空提示 */
.empty-tip {
  font-size: 28rpx;
  color: #999999;
}
</style>