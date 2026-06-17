<template>
	<view class="u-wrap">
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<view v-for="(item,index) in tabbar" :key="index" class="u-tab-item" :class="[current==index ? 'u-tab-item-active' : '']"
				 :style="{ backgroundColor: current==index ? upThemeVar('--up-card-bg-color') : upThemeVar('--up-bg-color'), color: upThemeVar('--up-content-color') }"
				 :data-current="index" @tap.stop="swichMenu(index)">
					<text class="u-line-1">{{item.name}}</text>
				</view>
			</scroll-view>
			<block v-for="(item,index) in tabbar" :key="index">
				<scroll-view scroll-y class="right-box" v-if="current==index" :style="{ backgroundColor: upThemeVar('--up-bg-color') }">
					<view class="page-view">
						<view class="class-item" :style="[upThemeCardStyle]">
							<view class="item-title">
								<text>{{item.name}}</text>
							</view>
							<view class="item-container">
								<!-- 循环图片项 -->
								<view class="thumb-box" v-for="(item1, index1) in item.list" :key="index1">
									<view class="img-wrapper" @click="goPage(item1.id)">
										<!-- 关键：mode="aspectFill" 保证不变形裁剪 -->
										<up-lazy-load  
											class="item-menu-image"  
											threshold="-250"  
											border-radius="10" 
											:image="item1.cover" 
											:index="index1"
											img-mode="aspectFill"
										></up-lazy-load>
									</view>
									<view class="item-menu-name">{{item1.name}}</view>
								</view>
								
							<view class="empty-box" v-if="item.list.length === 0">
									<image src="https://www.xiaojiaoyaya.cn/uploads/20260616/f7a108bbb25019e37028a97037f5a0ab.png" mode="widthFix"></image>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</block>
		</view>
	</view>
</template>

<script>
import {getList} from "@/api/works.js";
export default {
	data() {
		return {
			tabbar: [],
			scrollTop: 0,
			current: 0,
			menuHeight: 0,
			menuItemHeight: 0,
		}
	},
	onLoad() {
		this.getData();
	},
	methods: {
		getData(){
			getList().then(res => {
			   console.log('首页数据', res)
			   this.tabbar=res.data;
			 }).catch(err => {
			   console.log('请求失败', err)
			 })
		},
		// 点击左边的栏目切换
		async swichMenu(index) {
			if(index == this.current) return ;
			this.current = index;
			if(this.menuHeight == 0 || this.menuItemHeight == 0) {
				await this.getElRect('menu-scroll-view', 'menuHeight');
				await this.getElRect('u-tab-item', 'menuItemHeight');
			}
			this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
		},
		// 获取一个目标元素的高度
		getElRect(elClass, dataVal) {
			new Promise((resolve, reject) => {
				const query = uni.createSelectorQuery().in(this);
				query.select('.' + elClass).fields({size: true},res => {
					if(!res) {
						setTimeout(() => {
							this.getElRect(elClass);
						}, 10);
						return ;
					}
					this[dataVal] = res.height;
				}).exec();
			})
		},
		goPage(id) {
			  uni.navigateTo({
				url: `/pages/works/detail?id=${id}`
			})
		}
	}
}
</script>

<style lang="scss" scoped>
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}
	
	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}
	
	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid $u-primary;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}

	.right-box {
		background-color: rgb(250, 250, 250);
	}
	
	.page-view {
	    background-color: #fff;
		min-height: 100vh;
		padding: 16rpx;
	}
	
	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx 0;
		border-radius: 8rpx;
	}
	
	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}
	
	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
		margin-top: 8rpx;
		text-align: center;
	}
	
	.item-container {
	  display: flex;
	  flex-wrap: wrap;
	  /* 关键：让两张图片平分剩余空间 */
	  justify-content: space-between;
	}
	
	/* 图片容器优化：固定宽度 + 居中 */
	.thumb-box {
	  /* 不用 50%，用 calc 留出间隙 */
	  width: calc(50% - 5rpx); 
	  display: flex;
	  align-items: center;
	  justify-content: flex-start;
	  flex-direction: column;
	  margin-top: 20rpx;
	}
	
	/* 图片外层：固定宽高比，防止拉伸 */
	.img-wrapper {
	  width: 100%;
	  display: block;
	  /* 统一图片高度，更美观 */
	  	min-height: 200rpx;
	}
	
	/* 图片样式：铺满容器，不变形 */
	.item-menu-image {
	  width: 100%;
	  height: 100%;
	  object-fit: cover; /* 兼容多端，保证不变形 */
	}
	.empty-box {
		display: flex;
		justify-content: center;
		padding: 80rpx 0;
	}
</style>