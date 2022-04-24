<template>
	<view class="popup-con" @click.self="close">
		<view class="main">
			<icon class="close" type="cancel" size="26" color="#1d9c9c" @click.stop="close" />
			<view class="content">
				<text class="title">记分板</text>
				<text class="subtitle">最近对局</text>
				<view class="info">
					<view class="info-item">
						<text class="info-value">{{ recentPlay.count }}</text>
						<text class="info-label">猜对成语</text>
					</view>
					<view class="info-item">
						<text class="info-value">{{ calcDuration(recentPlay.time) }}</text>
						<text class="info-label">本次用时</text>
					</view>
				</view>
				<text class="subtitle">对局总览</text>
				<view class="info">
					<view class="info-item">
						<text class="info-value">{{ totalPlay.num }}</text>
						<text class="info-label">对局次数</text>
					</view>
					<view class="info-item">
						<text class="info-value">{{ totalPlay.count }}</text>
						<text class="info-label">累计成语</text>
					</view>
					<view class="info-item">
						<text class="info-value">{{ calcDuration(totalPlay.average) }}</text>
						<text class="info-label">平均用时</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name:"score-board",
	props:{
		playList: {
			type: Array,
			default(){
				return []
			}
		}
	},
	data() {
		return {
			recentPlay: {},
			totalPlay: {}
		}
	},
	computed: {
		calcDuration() {
			return time => {
				let secondTime = parseInt(time) / 1000; // 秒
				let minuteTime = 0; // 分
				let hourTime = 0; // 小时
				if (secondTime >= 60) {
					minuteTime = parseInt(secondTime / 60);
					secondTime = parseInt(secondTime % 60);
					if (minuteTime >= 60) {
						hourTime = parseInt(minuteTime / 60);
						minuteTime = parseInt(minuteTime % 60);
					}
				}
				let result = ''
				if(hourTime) {
					result += hourTime<10? `0${hourTime}时`: `${hourTime}时`
				}
				if(minuteTime) {
					result += minuteTime<10? `0${minuteTime}分`: `${minuteTime}分`
				}
				if(secondTime) {
					result += secondTime<10? `0${secondTime}秒`: `${secondTime}秒`
				}
				return result
			}
		}
	},
	methods: {
		close() {
			this.$emit('close')
		},
	},
	watch: {
		playList: {
			handler: function(newValue) {
				if(newValue.length) {
					this.recentPlay = newValue[newValue.length - 1]
					const totalPlay = {
						num: newValue.length,
						count: 0,
						time: 0
					}
					newValue.map(play => {
						totalPlay.count += play.count
						totalPlay.time += play.time
						console.log('totalPlay');
						console.log(totalPlay);
					})
					totalPlay.average = totalPlay.time / totalPlay.num
					this.totalPlay = totalPlay
				}
			},
			immediate: true,
			deep: true
		}
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixin.scss';
@import '@/assets/styles/variable.scss';
.popup-con {
	z-index: 999;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.6);

	.close {
		position: absolute;
		top: 8rpx;
		right: 10rpx;
	}
	.main {
		padding: 0 15rpx 40rpx;
		background: #ffffff;
		overflow: hidden;
	}
	.content {
		margin: 16px auto;
		width: 375px;
		max-width: 100%;
		font-family: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif;
		@include we-flex(column);
		> * {
			width: 100%;
		}
		.title {
			margin-bottom: 16px;
			font-size: 24px;
			text-align: center;
		}
		.subtitle {
			margin: 16px 0;
			font-size: 18px;
			color: $color-text-g;
		}
		.info {
			margin-bottom: 32px;
			@include we-flex(row, center);
			flex-wrap: wrap;
			&-item {
				width: 30%;
				font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif, 'Droid Sans Fallback';
				@include we-flex(column);
				text-align: center;
				&.space {
					visibility: hidden;
				}
			}
			&-label {
				width: 100%;
				font-size: 16px;
				color: $color-text-l;
			}
			&-value {
				width: 100%;
				font-size: 24px;
				color: $color-text-ll;
			}
		}
	}
}
</style>
