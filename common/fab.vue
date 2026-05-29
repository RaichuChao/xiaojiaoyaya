<template>
	<view class="container">
	
		<uni-fab ref="fab" :pattern="pattern"  :horizontal="horizontal" :vertical="vertical"
			:direction="direction" @fabClick="fabClick" />
	</view>
</template>

<script>

	export default {
			components: {},
			data() {
				return {
					title: 'uni-fab',
					directionStr: '垂直',
					horizontal: 'right',
					vertical: 'bottom',
					direction: 'horizontal',
					popMenu:false,
					pattern: {
						color: '#7A7E83',
						backgroundColor: '#fff',
						selectedColor: '#007AFF',
						buttonColor: '#000',
						iconColor: '#fff',
						icon:"chat-filled"
					},
					is_color_type: false,
					
				}
			},
			onBackPress() {
				if (this.$refs.fab.isShow) {
					this.$refs.fab.close()
					return true
				}
				return false
			},
			methods: {
				fabClick() {
					uni.navigateTo({
						url: '/pages/reservate/index'
						
					});
				
				},
		
			}
		}

</script>

<style lang="scss" scoped>
</style>