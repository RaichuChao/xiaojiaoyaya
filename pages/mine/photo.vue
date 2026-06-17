<template>
  <view class="collection-page">
    <!-- 顶部导航栏 -->
    <view class="page-header">
      
      <text class="header-title">我的影集</text>
      <text v-if="collectList.length > 0" class="edit-btn" @click="toggleEdit">
        {{ isEdit ? '完成' : '编辑' }}
      </text>
    </view>

    <!-- 空收藏状态 -->
    <view v-if="collectList.length === 0" class="empty-wrap">
<!--      <up-icon name="heart-empty" size="160rpx" color="#ccc"></up-icon -->
      <text class="empty-tip">暂无拍摄写真作品</text>
    <button class="go-work-btn" @click="uni.navigateTo({url:'/pages/reservate/index'})">去预约拍摄</button>

    </view>

    <!-- 收藏图片网格 -->
    <scroll-view v-else scroll-y class="scroll-wrap">
      <view class="collect-grid">
        <view
          v-for="(item, index) in collectList"
          :key="item.id"
          class="grid-item"
          @click="handleClickItem(item, index)"
        >
          <!-- 编辑模式多选框 -->
          <view v-if="isEdit" class="checkbox-wrap">
            <up-checkbox
              :checked="item.selected"
              shape="circle"
              active-color="#f56c6c"
            ></up-checkbox>
          </view>
          <!-- 收藏图片 -->
          <up-lazy-load
            class="collect-img"
            :image="item.image"
            img-mode="aspectFill"
          ></up-lazy-load>
          <!-- 作品名称遮罩 -->
          <view class="img-mask">
            <text class="img-name">{{ item.name }}</text>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 底部删除栏（编辑模式显示） -->
    <view v-if="isEdit && collectList.length > 0" class="bottom-bar">
      <text class="select-all" @click="selectAll">
        {{ isAllSelected ? '取消全选' : '全选' }}
      </text>
      <button class="del-btn" @click="batchDelete">
        删除选中({{ selectedCount }})
      </button>
    </view>
  </view>
</template>

<script>
export default {
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
      return this.collectList.every(item => item.selected);
    },
    // 选中数量
    selectedCount() {
      return this.collectList.filter(item => item.selected).length;
    }
  },
  onLoad() {
    // 页面加载请求收藏接口
    // this.getCollectData();
  },
  methods: {
	 onShareAppMessage(res) {
	     const id = this.data?.id || ''
	     return {
	       title: '留存转瞬即逝的童年时光', // 分享标题
	       path: `/pages/index/index`, // 分享落地页（必须写相对路径）
	       imageUrl:'https://www.xiaojiaoyaya.cn/uploads/20250715/539d7ec2ec75c5f2fdbc5dd62018fd0e.jpg' // 分享封面图（网络/本地图片）
	     }
	   },
	 
	   // 2. 分享到朋友圈（右上角菜单触发）
	   onShareTimeline() {
	     return {
	       title: '小脚丫丫儿童摄影馆',
	      
	     }
	   }, 
    // 切换编辑模式
    toggleEdit() {
      this.isEdit = !this.isEdit;
      // 退出编辑清空选中
      if (!this.isEdit) {
        this.collectList.forEach(item => item.selected = false);
      }
    },
    // 全选/取消全选
    selectAll() {
      const flag = !this.isAllSelected;
      this.collectList.forEach(item => item.selected = flag);
    },
    // 点击图片：编辑模式勾选 / 预览图片
    handleClickItem(item, index) {
			console.log(item.selected)
      if (this.isEdit) {
        item.selected = !item.selected;
		console.log(item.selected)
        return;
      }
      // 预览大图
      const imgArr = this.collectList.map(v => v.image);
      uni.previewImage({
        urls: imgArr,
        current: item.image
      });
    },
    // 批量删除收藏
    batchDelete() {
      const selectArr = this.collectList.filter(item => item.selected);
      if (selectArr.length === 0) {
        uni.showToast({ title: '请选择要删除的作品', icon: 'none' });
        return;
      }
      uni.showModal({
        title: '提示',
        content: `确定删除选中${selectArr.length}条收藏？`,
        confirmText: '删除',
        confirmColor: '#f56c6c',
        success: res => {
          if (res.confirm) {
            // 这里调用删除收藏接口，传选中id数组
            // const ids = selectArr.map(v => v.id);
            // api.delCollect({ ids }).then(() => { ... })

            // 本地过滤删除
            this.collectList = this.collectList.filter(item => !item.selected);
            this.isEdit = false;
            uni.showToast({ title: '删除成功' });
          }
        }
      });
    },
    // 去首页浏览作品
    goHome() {
      uni.switchTab({ url: '/pages/index/index' });
    },
    // 请求收藏列表接口示例
    getCollectData() {
      // getCollectApi().then(res => {
      //   this.collectList = res.data.map(item => ({
      //     ...item,
      //     selected: false
      //   }))
      // })
    }
  }
};
</script>

<style scoped>
page {
  background: #f7f7f7;
}
.collection-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 顶部导航 */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 120rpx;
  padding: 0 30rpx;
  background: #fff;
}
.back-btn {
  width: 80rpx;
  height: 100%;
  display: flex;
  align-items: center;
}
.header-title {
  font-size: 36rpx;
  font-weight: 500;
  color: #222;
}
.edit-btn {
  font-size: 30rpx;
  color: #666;
  padding: 10rpx 20rpx;
}

/* 空页面 */
.empty-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100rpx 40rpx;
}
.empty-tip {
  font-size: 28rpx;
  color: #999;
  margin: 30rpx 0 60rpx;
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

/* 滚动区域 */
.scroll-wrap {
  flex: 1;
  padding: 30rpx;
}
.collect-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}
.grid-item {
  position: relative;
  border-radius: 12rpx;
  overflow: hidden;
}
.collect-img {
  width: 100%;
  height: auto;
  aspect-ratio: 3/4;
}

/* 编辑多选框 */
.checkbox-wrap {
  position: absolute;
  top: 16rpx;
  left: 16rpx;
  z-index: 2;
}

/* 图片底部名称遮罩 */
.img-mask {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20rpx;
  background: linear-gradient(transparent, rgba(0,0,0,0.5));
}
.img-name {
  font-size: 24rpx;
  color: #fff;
}

/* 底部删除栏 */
.bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 120rpx;
  padding: 0 40rpx;
  background: #fff;
  border-top: 1rpx solid #eee;
}
.select-all {
  font-size: 30rpx;
  color: #333;
}
.del-btn {
  width: 200rpx;
  height: 80rpx;
  line-height: 80rpx;
  background: #f56c6c;
  color: #fff;
  border-radius: 40rpx;
  font-size: 28rpx;
}
</style>