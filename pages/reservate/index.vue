<template>
  <view class="container">
    <!-- 顶部标题区域 -->
    <view class="top-inner">
      <view class="top-item center">
        <view class="title">QUOTATION SYSTEM</view>
        <view class="sub-title">致力精致画面，抓住童年瞬间</view>
      </view>
    </view>

    <!-- 家有几宝 单选分类 -->
    <view class="category-wrapper">
      <view class="title">家有几宝</view>
      <view class="category-inner">
       
		<view
		  class="item clamp" 
		  :class="{ active: babyType === 1 }"
		  @click="babyType = 1"
		>两个宝贝</view>
        <view 
          class="item clamp" 
          :class="{ active: babyType === 2 }"
          @click="babyType = 2"
        >两个宝贝</view>
        <view 
          class="item clamp" 
          :class="{ active: babyType === 3 }"
          @click="babyType = 3"
        >三个以上宝贝</view>
      </view>
    </view>

    <!-- 拍摄类型 单选分类 -->
    <view class="category-wrapper">
      <view class="title">拍摄类型</view>
      <view class="category-inner">
        <view 
		v-for="(item, idx) in typeList"
		:key="idx" 
          class="item clamp" 
          :class="{ active: shootIndex === idx }"
          @click="shootType = item.id;shootIndex=idx"
        >{{item.name}}</view>
       
      </view>
    </view>

    <!-- 表单区域 -->
	
    <form @submit="onSubmit">
      <view class="content-wrapper">
		<view  v-if="way===1">
			<view class="form-item">
			  <view class="form-control">
			
				<up-input
				   placeholder="您的称呼"
				   border="surround"
				   v-model="formData.name"
				 ></up-input>
			  </view>
			</view>

			<view class="form-item">
			  <view class="form-control">
				   <up-input
					  placeholder="您的微信或手机号"
					  border="surround"
					  v-model="formData.phone"
					></up-input>

			  </view>
			</view>

			<view class="form-item">
			  <view class="form-control">
				  <up-textarea v-model="formData.remark" placeholder="您的拍摄需求" ></up-textarea>
			
			  </view>
			</view>
        </view>
        <view class="form-item">
          <view class="form-control">
             <button class="submit-btn" :class="{ filled: formData.name && formData.phone  }" form-type="submit">立即询价</button>
          </view>
        </view>
      </view>
    </form>
  </view>
</template>

<script>
import { getShootwayData,SubmitData,getConfig } from '@/api/reservate.js';	
export default {
  name: "feedback",
  data() {
    return {
      // 宝贝数量 1:一个 2:两个 3:三个以上
      babyType: 1,
      // 拍摄类型 1:儿童 2:亲子 3:新生儿 4:全家福
      shootType: 0,
	  shootIndex: 0,
	  typeList:{},
	  way:1,
      // 表单数据
      formData: {
        name: "",
        phone: "",
        remark: "",
		openid:"",
		type:"",
		num:""
      }
    };
  },
  onLoad() {

  	this.getData();
	this.Setway();
	// #ifdef H5
	// H5 逻辑
	// uni.showToast({ title: 'H5端', icon: 'none' })
	// #endif
	
	// #ifdef MP-WEIXIN
	// 微信小程序逻辑
	if(!uni.getStorageSync('openid')){
		this.getOpenid();
		
	}
	this.formData.openid=uni.getStorageSync('openid');
	// #endif
	
  },
  methods: {
	  
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
	          console.log('登录成功')
	          } else {
	           
				 console.error('登录获取openid失败')
	          }
	        },
	        fail: (err) => {
	        
	          console.error('登录请求失败', err)
	        }
	      })
	    } catch (err) {
	    
	      console.error(err)
	    }
	  },
	 getData() {
	   getShootwayData().then(res => {
	     this.typeList = res.data || {};
	     console.log('首页数据', res);
	   }).catch(err => {
	     console.log('请求失败', err);
	     uni.showToast({ title: '数据加载失败', icon: 'none' });
	   })
	 }, 
	 Setway(){
		 getConfig().then(res => {
		   const data = res.data || {};
		   this.way=data.way;
		  
		 }).catch(err => {
		   console.log('请求失败', err);
		   uni.showToast({ title: '数据加载失败', icon: 'none' });
		 })
	 },
    // 表单提交
    onSubmit(e) {
      const { name, phone, remark } = this.formData;
      // 简单校验
      if (!name) {
        uni.showToast({ title: "请输入称呼", icon: "none" });
        return;
      }
      if (!phone) {
        uni.showToast({ title: "请输入微信/手机号", icon: "none" });
        return;
      }
	  this.formData.type=this.shootType;
	   this.formData.num=this.babyType;
	  SubmitData(this.formData).then(res => {
	    uni.showToast({ title: '提交成功', icon: 'none' });
	  this.babyType=1;
	  
	  this.shootType=0;
	  this.shootIndex=0;
	  // 提交后清空
	  this.formData = { name: "", phone: "", remark: "" };
	  }).catch(err => {
	    console.log('请求失败', err);
	    uni.showToast({ title: '提交失败', icon: 'none' });
	  })
 
     
    }
  }
};
</script>

<style scoped lang="scss">
// 全局基础样式
page {
  background-color: #fff;
  font-size: 14px;
}
.container {
  padding: 0 5px;
}

// 顶部标题区
.top-inner {
  width: 100%;
  margin: 0 0 15px;
  height: 85px;
  .top-item {
    text-align: center;
    .title {
      color: #222;
      font-size: 16px;
      font-weight: 700;
    }
    .sub-title {
      color: #222;
      margin-top: 6px;
    }
  }
}

// 分类模块通用
.category-wrapper {
  padding: 20rpx;
  margin-bottom: 15px;
  .title {
    padding: 12rpx 0;
    color: #222;
    font-size: 14px;
    font-weight: 700;
    margin: 0 0 8px;
  }
  
  // 一行3个核心布局
  .category-inner {
    display: flex;
    flex-wrap: wrap;
    gap: 20rpx; /* 横向、纵向间距统一20rpx */
    
    .item {
      /* 3列：总宽度减去2条间隙(20*2=40rpx)，平分3份 */
      width: calc((100% - 60rpx) / 3);
      text-align: center;
      font-size: 12px;
      color: #222;
      padding: 8px 0;
      border: 1px solid #eee;
      border-radius: 6rpx;
      
      &.active {
         border-color: #424c50 !important;
         color: #fff !important;
         background-color: #424c50;
      }
    }
  }
}

// 文本溢出省略
.clamp {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}

// 表单样式
.form-item {
  padding: 10rpx 20rpx;
  margin-bottom: 12px;
  .form-control {
    width: 100%;
  }
  .uni-input {
    width: 100%;
    height: 44px;
    border: 1px solid #eee;
    border-radius: 4px;
    font-size: 14px;
  }
  .uni-textarea {
    width: 100%;
    min-height: 80px;
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    font-size: 14px;
  }
}

// 提交按钮
.submit-btn {
  width: 100%;
  height: 44px;
  border-radius: 4px;
  background-color: #88d5b9;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  line-height: 44px;
  border: none;
  transition: background 0.3s;
  &.filled {
    background-color: #19be6b;
  }
}

// 底部技术支持
.section-tech {
  margin-top: 20px;
  padding-bottom: 70px;
  .support-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    .support-logo {
      width: 24px;
      height: 24px;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .sep {
      color: #999;
    }
    .version {
      font-size: 12px;
      color: #666;
    }
  }
}
</style>
