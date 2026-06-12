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
          class="grid-item"
         
        ><view style="height: 120px; box-shadow: none;">
			   
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
   <view class="section-wrap">
      <view class="section-title">
        <text class="title-cn">关于我们</text>
        <text class="title-en">About Us</text>
      </view>
     <view class="about-img"  >
      </view>
    </view>
	<view class="section-wrap">
	   <view class="section-title">
	     <text class="title-cn">联系我们</text>
	     <text class="title-en">Contact Us</text>
	   </view>
	    <map :longitude="longitude"  :markers="markers" :latitude="latitude" scale="14" :show-location="true" style="width: 100%; height: 300px;" ></map>

        <view class="contact">
			<view style="padding: 50rpx 30rpx;">
				<view>客服热线：{{store.store_phone}}</view>
				<view>微信: {{store.store_vx}}</view>
				<view>地址: {{store.store_area}}</view>
			</view>
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
		latitude:28.31,
		longitude:109.74,
		  markers: [{
			    id:1,
		        latitude: 28.31, // 纬度
		        longitude: 109.74, // 经度
		        title: '小脚丫丫', // 标记点名称
		        iconPath:'/static/loc.png',
				width: 32,
				height: 32
		      }],
      // 轮播图数据
      swiperList:reactive([]),
      // 作品分类数据
      categoryList:reactive([]),
	 
      // 视频数据
      videoList: [
        { url: 'https://cdnfile.xiangfeiyue.com:8083/uploads/st202305261477f2/adv/20230530/1a701eae28d8f5903d241e3b3f6b07bf.mp4', poster: 'https://cdnfile.xiangfeiyue.com:8083/uploads/st202305261477f2/adv/20230530/thumb_64e3fa0374d875ce15f5c8e80f6feade.jpg' },
      ],
      store:reactive([]),
    }
  },
  onLoad() {
  	this.getData();
  },
  methods: {
 getData(){
	 getHomeData().then(res => {
		 this.swiperList=res.data.swiper;
		 this.categoryList=res.data.category;
		 this.store=res.data.store;
	    console.log('首页数据', res)
	  }).catch(err => {
	    console.log('请求失败', err)
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

/* 轮播图样式 */
.u-swiper {
  height: 420rpx;
}

/* 通用标题样式 */
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

/* 分类网格 */
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

/* 视频列表 */
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
.video-title {
  display: block;
  padding: 20rpx;
  font-size: 28rpx;
  color: #333;
  background-color: #f8f8f8;
}
.about-img{
	width: 100%; border-radius: 0px; height: 258px;
	background-image: url("https://cdnfile.xiangfeiyue.com:8083/uploads/st202305261477f2/adv/20230530/thumb_35d760b06024d96c00ea58b875f35b98.jpg");
	 background-size: 100% 100%; background-repeat: no-repeat;
	 
}
.contact{
	height: 360rpx;
	font-size: 28rpx;
	line-height: 60rpx;
	background-color: #222;
	color: #d0d0d0;
	font-weight: 800;
	letter-spacing: 2rpx;
}
</style>