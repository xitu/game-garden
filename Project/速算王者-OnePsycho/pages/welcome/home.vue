<template name="components">
	<view class="page">
		<view class="logo">
			<image src="../../static/logo.png" mode="widthFix" class="logo-image"></image>
			<image src="../../static/myLogo.png" mode="widthFix"></image>
		</view>
		<view class="btn-start">
			<image class="btns-item" src="../../static/btn_start.png" mode="widthFix" @click="onStart"></image>
			<image class="btns-item" src="../../static/btn_rank.png" mode="widthFix" @click="onShowRule"></image>
			<button open-type="share">
				<image src="../../static/btn_share.png" mode="widthFix" @click="onShare"></image>
			</button>
		</view>
		<view class="cu-modal" :class="isShowModal?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<image class="mode-image" src="../../static/modeTitle.png" mode="aspectFit"></image>
				<image class="mode-image" src="../../static/mode1.png" mode="aspectFit" @click="goStart('twoAdd',10)"></image>
				<image class="mode-image" src="../../static/mode2.png" mode="aspectFit" @click="goStart('twoReduce',10)"></image>
				<image class="mode-image" src="../../static/mode3.png" mode="aspectFit" @click="goStart('twoRide',10)"></image>
				<image class="mode-image" src="../../static/mode4.png" mode="aspectFit" @click="goStart('threeAdd',10)"></image>
			</view>
		</view>
		<view class="cu-modal" :class="ruleModal?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<image src="../../static/rules.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="cu-modal" :class="challengeModal?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<image class="mode-image"  src="../../static/challenge_title.png" mode="aspectFit"></image>
				<image style="height: 100px;" src="../../static/challenge_1.png" mode="aspectFit"></image>
				<p class="challenge-time">{{ challengeTime }}</p>
				<view style="display: flex;margin-top: 20px;">
					<image style="height: 40px;" src="../../static/challenge_3.png" mode="aspectFit" @click="challengeModal = false"></image>
					<image style="height: 40px;" src="../../static/challenge_2.png" mode="aspectFit" @click="doChallenge"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				challengeModal:false,
				ruleModal:false,
				isShowModal: false,
				challengeList:[],
				challengeTime:'',
				options:null
			};
		},
		onLoad(options) {
			if(options.list){
				this.options = options
				this.challengeModal = true
				this.challengeTime = options.time
				this.challengeList = options.list
			}
		},
		created() {

		},
		onShareAppMessage() {
		      return {
		        title: '速算王者-你速算有我厉害吗?',
		        imageUrl: 'https://psycho-1300960840.cos.ap-chengdu.myqcloud.com/bg_share.png',
		        path: '/pages/welcome/home',
		      }
		},
		onShareTimeline(){
			return {
			  title: '速算王者-你速算有我厉害吗?'
			}
		},
		methods: {
			hideModal() {
				this.isShowModal = false
				this.ruleModal = false
			},
			
			doChallenge(){
				this.challengeModal = false
				uni.showLoading({
					title: '题目马上来'
				})
				
				setTimeout(() => {
					uni.navigateTo({
						url: '../main/home?list=' + this.challengeList + '&type=' + this.options.type + '&time=' + this.options.time
					})
					uni.hideLoading()
				}, 1000)
			},

			onShare() {
				
			},

			getRandom(min, max) {
				min = Math.ceil(min);
				max = Math.floor(max);
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			onStart() {
				this.isShowModal = true
			},

			onShowRule() {
				this.ruleModal = true
			},

			goStart(type, count) {
				this.isShowModal = false
				uni.showLoading({
					title: '题目马上来'
				})

				setTimeout(() => {
					uni.navigateTo({
						url: '../main/home?type=' + type + '&count=' + count
					})
					uni.hideLoading()
				}, 1000)

			}
		},
		mounted() {},
		destroyed() {}

	}
</script>

<style lang="less">
	.page {
		height: 100vh;
		position: relative;
		padding-bottom: 150rpx;
		font-family: 'myFont';
		font-weight: 200;
		// background: #fff;
		
		.mode-image{
			height: 50px !important;
			margin: 10px 0;
		}

		.logo {
			width: 100%;

			image {
				width: 80%;
				margin-left: 10%;
				margin-top: 20px;
			}

			.logo-image {
				width: 34%;
				margin-left: 33%;
				margin-top: 15%;
			}
		}
		
		.challenge-time{
			font-size: 30px;
			margin: 10px 0;
			color: #11bd75;
		}



		.btn-start {
			position: absolute;
			width: 100%;
			bottom: 10%;
			left: 0;

			.btns-item {
				width: 40%;
				margin-left: 30%;
				border: 1px solid #d1d1d1;
				margin-bottom: 30rpx;
			}
			
			button{
				width: 40%;
				margin-left: 30%;
				padding: 0;
				border: none;
				border-radius: 0;
				height: 119rpx;
				background: none;
				
				&::after{
					border: none;
					border-color: #d1d1d1;
					border-bottom: 1px solid #d1d1d1;
					border-bottom-color:transparent;
					border-radius: 0;
				}
				
				image{
					width: 100%;
					border: 1px solid #d1d1d1;
				}
			}

			&-txt {
				width: 60%;
				margin-left: 20%;
				border: 2px solid #e0e0e0;
				text-align: center;
				height: 150rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 32px;
				color: #7a7a7a;
			}
		}
	}

	.type-title {
		margin-top: 50rpx;
		font-size: 22px;

	}

	.cu-dialog {
		padding-bottom: 40rpx;
	}

	.type-item {
		padding: 20rpx 0;
		margin: 40rpx 0;
		font-size: 18px;
		border: 1px solid #e0e0e0;
		box-shadow: 0 0 5px 2px #626262;
		width: 50%;
		margin-left: 25%;
		background: #868686;
		color: #fff;
	}

	.type-tips {
		width: 60%;
		margin-left: 20%;
		color: #888888;
	}
</style>
