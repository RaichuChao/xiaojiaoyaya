<template>
  <view class="personal-center">
    <!-- 顶部用户信息栏 -->
    <view class="user-info-bar">
       <view class="user-row">
               <view class="avatar">
                 <up-avatar size="80" shape="circle"></up-avatar>
               </view>
               <view class="user-name">微信用户</view> <up-image :show-loading="true" src="/static/VIP.png" width="40rpx" height="40rpx" ></up-image>
             </view>
       

  <view class="icon-group">
	   <up-icon name="setting-fill" size="40rpx" color="#FFFFFF"></up-icon>
	 
    
       </view>
     
    </view>

    <!-- 我的TVG中心 - 向上叠加 -->
    <view class="module tvg-center">
      <view class="module-title">个人中心</view>
      <view class="grid-layout">
        <view class="grid-item" @click="goOrder">
  <up-icon name="order" size="60rpx" ></up-icon>
			<view class="item-text">预约记录</view>
        </view>
        <view class="grid-item" @click="goFavorite">
  <up-icon name="heart" size="60rpx" ></up-icon>
			<view class="item-text">我的喜欢</view>
        </view>
      
  
    
        <view class="grid-item" @click="goAlbum">
<up-icon name="moments" size="60rpx" ></up-icon>
          <view class="item-text">我的影集</view>

        </view>
      </view>
    </view>

 
    <view class="module coupon-center">
      <view class="module-title">联系我们</view>
      <view class="grid-layout">
        <button  class="grid-item" open-type="contact" >
  <up-icon name="server-man" size="60rpx" ></up-icon>
			<view class="item-text">联系客服</view>
         
        </button >
        <view class="grid-item" @click="goInvite">
			  <up-icon name="calendar-fill" size="60rpx" ></up-icon>
     
          <view class="item-text">预约服务</view>
        </view>
       
      </view>
    </view>
	<view class="module coupon-center" v-if="!showLoginPop">
	    <view class="module-title">其他</view>
	    <view class="grid-layout">
	
	      <view class="grid-item" @click="loginOut">
	
	   <up-image :show-loading="true" src="/static/loginout.png" width="60rpx" height="60rpx" ></up-image>
	        <view class="item-text">退出登录</view>
	      </view>
	     
	    </view>
	  </view>
  </view>
  <!-- 遮罩层 -->
    <view class="mask" v-if="showLoginPop" @click="closePop"></view>
    <!-- 弹窗主体 -->
    <view class="popup-box" v-if="showLoginPop">
      <view class="pop-title">温馨提示</view>
      <view class="pop-desc">您还未登录，请登录后继续操作</view>
      <view class="btn-login" @click="getOpenid">一键微信登录</view>
      <view class="btn-cancel" @click="goHome">稍后再说</view>
    </view>
</template>

<script>
export default {
  data() {
    return {
      showLoginPop: false
    }
  },
  onShow() {
    this.checkLogin();
  },
  methods: {
	  
    // 一键微信登录
    async getOpenid() {
      try {
        // 1. 获取微信code
        const loginRes = await uni.login({ provider: 'weixin' })
        const code = loginRes.code
        if (!code) {
          uni.$u.toast('获取登录凭证失败')
          return
        }
       uni.showLoading({ title: '登录中' });
        // 2. 只请求自己后端，由后端调用微信jscode2session
        uni.request({
          url: 'https://www.xiaojiaoyaya.cn/index.php/api/user/getOpen',
          method: 'POST',
          data: {
            js_code: code
          },
          timeout: 8000, // 延长超时时间8秒
          success: (res) => {
			   uni.hideLoading();
            // 后端返回openid
            if (res.data.openid) {
              uni.setStorageSync('openid', res.data.openid);
              uni.$u.toast('登录成功')
              this.closePop(); // 关闭弹窗
              this.checkLogin(); // 刷新登录状态
            } else {
              uni.$u.toast('登录获取openid失败')
            }
          },
          fail: (err) => {
            uni.$u.toast('登录请求超时，请重试')
            console.error('登录请求失败', err)
          }
        })
      } catch (err) {
        uni.$u.toast('登录取消或异常')
        console.error(err)
      }
    },

    // 退出登录
    loginOut() {
      uni.showModal({
        title: '提示',
        content: '确定退出登录？',
        success: (res) => {
          if (res.confirm) {
            uni.setStorageSync('openid', '');
            uni.showLoading({ title: '退出中' });
            setTimeout(() => {
              uni.hideLoading();
              this.checkLogin();
            }, 1500);
          }
        }
      })
    },
	goHome(){
		uni.reLaunch({
			url: `/pages/index/index`
		})
	},
	
	goOrder(){
		uni.navigateTo({
			url: `/pages/mine/order`
		})
	},
	goFavorite(){
		uni.navigateTo ({
			url: `/pages/mine/love`
		})
	},
	goInvite(){
		uni.navigateTo ({
			url: `/pages/reservate/index`
		})
	},
	goAlbum(){
		uni.navigateTo ({
			url: `/pages/mine/photo`
		})
	},
    // 关闭登录弹窗
    closePop() {
      this.showLoginPop = false;
    },

    // 校验登录状态
    checkLogin() {
      const openid = uni.getStorageSync('openid')
      if (!openid) {
        this.showLoginPop = true;
      } else {
        this.showLoginPop = false;
      }
    },
    // 页面功能点击拦截登录
    handleClick(type) {
      const openid = uni.getStorageSync('openid')
      if (!openid) {
        this.showLoginPop = true
        return;
      }
      switch (type) {
        case 'order':
          uni.showToast({ title: '点击了预约记录', icon: 'none' });
          break;
        case 'favorite':
          uni.showToast({ title: '点击了我的喜欢', icon: 'none' });
          break;
        case 'album':
          uni.showToast({ title: '点击了我的影集', icon: 'none' });
          break;
        case 'invite':
          uni.showToast({ title: '点击了预约服务', icon: 'none' });
          break;
      }
    }
  }
};
</script>

<style scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
}
.popup-box {
  width: 620rpx;
  background: #fff;
  border-radius: 20rpx;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  padding: 40rpx;
}
.pop-title {
  font-size: 34rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20rpx;
}
.pop-desc {
  font-size: 28rpx;
  color: #666;
  text-align: center;
  margin-bottom: 40rpx;
  line-height: 1.6;
}
.btn-login {
  background: #07c160;
  color: #fff;
  text-align: center;
  height: 88rpx;
  line-height: 88rpx;
  border-radius: 44rpx;
  font-size: 30rpx;
  margin-bottom: 20rpx;
}
.btn-cancel {
  text-align: center;
  height: 88rpx;
  line-height: 88rpx;
  font-size: 30rpx;
  color: #999;
}	
	
.personal-center {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 20rpx;
}
.avatar {
  width: 200rpx;
  height: 200rpx;
  border-radius: 50%;
  box-shadow: 0 10rpx 30rpx rgba(0,0,0,0.15);
}
/* 顶部用户栏 */
.user-info-bar {
  background-color: #000;
  color: #fff;
  padding: 50rpx 30rpx; 
 
  
}

.user-row {
  display: flex;
  align-items: center; /* 垂直居中 */
}




.user-info {
  flex: 1;
}

.user-name {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
  margin-right: 10rpx;
}

.icon-group {
  display: flex;
  position: absolute;
  top:120rpx;
  right: 40rpx;
}

.icon {
  width: 40rpx;
  height: 40rpx;
}
/* 模块通用 */
.module {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  margin: 0 20rpx;
}

.module-title {
  font-size: 30rpx;
  font-weight: bold;
  margin-bottom: 30rpx;
  padding: 20rpx;
}

/* 核心：TVG中心向上叠加 */
.tvg-center {
  /* 向上偏移，覆盖顶部黑栏 */
  margin-top: -30rpx;
  position: relative;
  z-index: 2;
  /* 顶部圆角保留，视觉更自然 */
  border-top-left-radius: 16rpx;
  border-top-right-radius: 16rpx;
}

/* 卡券中心正常间距 */
.coupon-center {
  margin-top: 20rpx;
}

/* 网格布局 */
.grid-layout {

 display: flex;
  flex-wrap: wrap;
/*  justify-content: space-around; */
}
button.grid-item {
	background: transparent;
	border: none;
	padding: 0;
	margin: 0;
	line-height: normal;
}
button.grid-item::after {
	border: none;
}
.grid-item {
  	width: 33.33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20rpx;
}

.item-icon {
  width: 60rpx;
  height: 60rpx;
  margin-bottom: 15rpx;
}

.item-text {
	padding: 20rpx;
  font-size: 26rpx;
  color: #333;
}

.item-subtext {
  font-size: 20rpx;
  color: #999;
  margin-top: 5rpx;
}

.red-text {
  color: red !important;
}
</style>