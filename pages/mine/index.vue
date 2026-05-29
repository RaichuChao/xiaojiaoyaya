<template>
	<view>
	
		<view class="u-flex u-flex-y-center u-flex-around user-box u-p-l-30 u-p-r-20 u-p-b-30" :style="[upThemeCardStyle]">
			<view class="u-m-r-10">
				<up-avatar :src="pic" size="140"></up-avatar>
					<view class="u-font-14 u-tips-color" style="text-align: center;">微信用户</view>
			</view>
		
	
			
		</view>
		
	
		<view class="u-m-t-20">
			<up-cell-group>
				<up-cell icon="heart" title="我的预约"></up-cell>
				<up-cell icon="star" title="我的收藏"></up-cell>
				<up-cell icon="photo" title="我的影集"></up-cell>
				<up-cell icon="coupon" title="打印订单"></up-cell>
				
			</up-cell-group>
		</view>
		
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic:'https://uview-plus.jiangruyi.com/h5/static/uview/common/logo.png',
				show:true
			}
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: transparent;
}
.u-cell-group {
	background-color: transparent;
}
</style>

