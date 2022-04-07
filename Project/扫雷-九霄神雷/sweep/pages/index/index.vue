<template>
	<view class="content">
	                    	<text>选择难度</text>
		<navigator class="title" url="/pages/play/play?degree=0">入门</navigator>
		<navigator class="title" url="/pages/play/play?degree=1">简单</navigator>
		<navigator class="title" url="/pages/play/play?degree=2">一般</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
	
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
