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
        >一个宝贝</view>
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
          class="item clamp" 
          :class="{ active: shootType === 1 }"
          @click="shootType = 1"
        >儿童拍摄</view>
        <view 
          class="item clamp" 
          :class="{ active: shootType === 2 }"
          @click="shootType = 2"
        >亲子拍摄</view>
        <view 
          class="item clamp" 
          :class="{ active: shootType === 3 }"
          @click="shootType = 3"
        >新生儿拍摄</view>
        <view 
          class="item clamp" 
          :class="{ active: shootType === 4 }"
          @click="shootType = 4"
        >全家福拍摄</view>
      </view>
    </view>

    <!-- 表单区域 -->
    <form @submit="onSubmit">
      <view class="content-wrapper">
        <view class="form-item">
          <view class="form-control">
            <input 
              class="uni-input" 
              v-model="formData.name" 
              placeholder="您的称呼"
              maxlength="140"
            />
          </view>
        </view>

        <view class="form-item">
          <view class="form-control">
            <input 
              class="uni-input" 
              v-model="formData.phone" 
              placeholder="您的微信或手机号"
              maxlength="140"
            />
          </view>
        </view>

        <view class="form-item">
          <view class="form-control">
            <textarea 
              class="uni-textarea" 
              v-model="formData.desc" 
              placeholder="您的拍摄需求"
              maxlength="140"
            ></textarea>
          </view>
        </view>

        <view class="form-item">
          <view class="form-control">
            <button class="submit-btn" form-type="submit">立即询价</button>
          </view>
        </view>
      </view>
    </form>
  </view>
</template>

<script>
export default {
  name: "feedback",
  data() {
    return {
      // 宝贝数量 1:一个 2:两个 3:三个以上
      babyType: 1,
      // 拍摄类型 1:儿童 2:亲子 3:新生儿 4:全家福
      shootType: 1,
      // 表单数据
      formData: {
        name: "",
        phone: "",
        desc: ""
      }
    };
  },
  methods: {
    // 表单提交
    onSubmit(e) {
      const { name, phone, desc } = this.formData;
      // 简单校验
      if (!name) {
        uni.showToast({ title: "请输入称呼", icon: "none" });
        return;
      }
      if (!phone) {
        uni.showToast({ title: "请输入微信/手机号", icon: "none" });
        return;
      }
      // 此处可对接后端接口
      console.log("提交数据：", {
        babyType: this.babyType,
        shootType: this.shootType,
        ...this.formData
      });
      uni.showToast({ title: "提交成功" });
      // 提交后清空
      // this.formData = { name: "", phone: "", desc: "" };
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
  margin-bottom: 15px;
  .title {
    color: #222;
    font-size: 14px;
    font-weight: 700;
    margin: 0 0 8px;
  }
  .category-inner {
    display: flex;
    flex-wrap: wrap;
    .item {
      flex: 1;
      text-align: center;
      font-size: 12px;
      color: #222;
      padding: 8px 0;
      border: 1px solid #eee;
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
  margin-bottom: 12px;
  .form-control {
    width: 100%;
  }
  .uni-input {
    width: 100%;
    height: 44px;
    padding: 0 10px;
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
}

// 底部技术支持
.section-tech {
  margin-top: 20px;
  padding-bottom: 70px; // 避开底部tabbar
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