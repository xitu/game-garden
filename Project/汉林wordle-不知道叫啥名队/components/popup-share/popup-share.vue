<template>
	<view class="popup-con" @click.self="close">
		<view class="main">
			<icon class="close" type="cancel" size="26" color="#1d9c9c" @click.stop="close" />
			<view class="canvas-con">
				<view class="tips" v-if="srcBase64 && sysInfo.model !== 'PC'">长按下图保存到相册</view>
				<canvas class="canvas" canvas-id="canvas" id="canvas" v-show="!srcBase64">
					<!-- <image src="../../assets/images/qr_code.png"/> -->
				</canvas>
				<image :src="srcBase64" v-show="srcBase64" class="share-img"></image>
			</view>
			<view class="row">
				<u-button class="btn" text="生成图片" color="rgb(10, 185, 156)" @click="createImg" v-if="!srcBase64"></u-button>
				<u-button class="btn" text="下载图片" color="rgb(10, 185, 156)" @click="downloadImg" v-if="srcBase64 && sysInfo.model === 'PC'"></u-button>
				<u-button class="btn" text="复制链接" color="rgb(10, 185, 156)" @click="copyText"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import { convertDate } from '@/assets/utils.js';
	export default {
		name:"popup-share",
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
				srcBase64: "",
				sysInfo: {},
				imgLoading: false,
				recentPlay: {},
				honorRemark: ''
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
		async mounted() {
			// console.log("compuent mounted")
			await this.calcHonor()
			await this.drawPoster()
			this.getSystemInfo()
		},
		methods: {
			getSystemInfo() {
				this.sysInfo = uni.getSystemInfoSync()
				console.log("this.sysInfo:");
				console.log(this.sysInfo);
				// model 为PC时点击下载 移动端长按保存
			},
			close() {
				this.$emit('close');
			},
			// 复制文本
			copyText() {
				const data = "汉林·双简版wordle小游戏等你来PK：http://wordle.lovetime.top/";
				// navigator.clipboard.writeText(text)
				// 	.then(
				// 	() => uni.showToast({title: '复制成功', duration: 2000}),
				// 	() => console.warn("复制失败"))
				// 使用uni提供API
				uni.setClipboardData({
					data,
					success: () => uni.showToast({
						title: '复制成功',
						duration: 2000
					}),
					fail: () => console.warn("复制失败")
				})
			},
			// 绘制海报图片
			async drawPoster() {
				uni.showLoading({
					title: '图片绘制中'
				})
				var context = uni.createCanvasContext('canvas')
				context.font = '20px ui-serif,Georgia,Cambria,"Times New Roman",Times,serif'
				context.fillStyle = '#FFFFFF'
				
				const honorBg = '/static/honor_bg.png'
				context.drawImage(honorBg, 0, 0, 360, 540)

				// const src = '/static/qr_code.png'
				const src = '/static/qrcode.png'
				context.drawImage(src, 28, 380, 120, 120)
				
				const { time, count } = this.recentPlay
				const usetime = this.calcDuration(time)
				const honorRemark = this.honorRemark
				const honor = count >= 5? '荣获': '差点荣获';
				const honorPos1 = count >= 5? 84: 124;
				const honorPos2 = count >= 5? 180: 224;
				const today = await convertDate()

				this.drawText(28, '#333', '学士证书', 120, 60, context)
				this.drawText(14, '#999', '不知道叫啥名队/汉林项目组颁发', 80, 90, context)
				this.drawText(22, '#666', '恭喜您完成本次对局！', 80, 140, context)
				if(time && count) {
					this.drawText(18, '#666', `用时：${usetime}`, 36, 180, context)
					this.drawText(18, '#666', `猜对成语：${count}`, 36, 210, context)
					this.drawText(18, '#666', honorRemark, 36, 240, context)
				} else {
					this.drawText(18, '#666', '成绩有点感人(ಥ_ಥ)', 36, 240, context)
				}
				this.drawText(18, '#666', `${honor}“`, 36, 280, context)
				this.drawText(24, '#333', '汉林学士', honorPos1, 280, context)
				this.drawText(18, '#666', '”称号', honorPos2, 280, context)
				this.drawText(18, '#666', '特发此证，以兹鼓励', 36, 360, context)
				this.drawText(20, '#333', '成长の️', 224, 425, context)
				this.drawText(20, '#1d9c9c', '️汉林', 284, 425, context)
				this.drawText(16, '#666', '汉林·双简版wordle', 190, 455, context)
				this.drawText(16, '#666', today, 208, 480, context)
				this.drawText(12, '#999', '起名小技巧：玩得转文字的翰林谓之汉林', 70, 510, context)
				// this.drawText(12, '#999', 'wordle.lovetime.top', 100, 510, context)

				context.draw()
				uni.hideLoading()
			},
			createImg() {
				const that = this
				uni.canvasToTempFilePath({
					canvasId: 'canvas',
					success: function(res) {
						// 目前先考虑H5下载，其他平台下载 可直接调用uni.saveFile
						// that.downloadImg(res.tempFilePath)
						that.srcBase64 = res.tempFilePath
					}
				})
			},
			/**
			 * 1、base64格式图片转换成blob对象
			 * 2、将blob对象封装到a标签中置入页面
			 * 3、模拟点击这个a标签触发下载请求
			 * H5 目前不支持保存图片到系统相册，浏览器可在或得用户授权后下载到文件中
			 * 微信浏览器下载有问题 目前方案改为提示用户长按保存
			 */
			downloadImg(base64 = this.srcBase64) {
				var arr = base64.split(',')
				var bytes = atob(arr[1])
				let ab = new ArrayBuffer(bytes.length)
				let ia = new Uint8Array(ab)
				for (let i = 0; i < bytes.length; i++) {
					ia[i] = bytes.charCodeAt(i)
				}

				const blob = new Blob([ab], {
					type: 'application/octet-stream'
				})
				const _URL = window.URL || window.webkitURL
				const url = _URL.createObjectURL(blob)

				let dom = document.createElement("a")
				dom.style.display = "none"
				dom.href = url
				dom.setAttribute("download", "汉林_猜成语游戏.png")
				document.body.appendChild(dom)
				dom.click()
				dom.remove()

			},
			// 绘制文本
			drawText(size, color, content, drawX, drawY, context) {
			    context.setFontSize(size)
			    context.setFillStyle(color)
			    context.fillText(content, drawX, drawY)
			},
			async calcHonor() {
				const playCount = await this.$api.playRecordCount()
				const score = playCount.result.count
				const { count } = this.recentPlay
				let result = ''
				if(count > score) {
					result = '猜对成语数是目前最高记录！'
				} else if (count === score) {
					result = '猜对成语数已比肩目前最高记录！'
				} else {
					result = '猜对成语数快赶上最高纪录啦'
				}
				this.honorRemark = result
			}

		},
		watch: {
			playList: {
				handler: function(newValue) {
					if(newValue.length) {
						this.recentPlay = newValue[newValue.length - 1]
					} else {
						this.recentPlay = {
							count: 0,
							time: 0
						}
					}
				},
				immediate: true,
				deep: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/styles/mixin.scss';

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

		.row {
			display: flex;
			width: 100%;
			padding: 0 16px;
			margin: 30rpx 0 0;
			box-sizing: border-box;
		}

		.btn {
			width: 30vw;
			max-width: 180px;
		}
		.tips {
			font-size: 14px;
			line-height: 1.25;
			color: #9BA0A8;
			text-align: center;
		}

		.main {
			padding: 0 15rpx 40rpx;
			background: #FFFFFF;
		}

		.canvas-con {
			padding: 60rpx 0 0;
			box-sizing: border-box;

			.canvas {
				width: 360px;
				height: 540px;
				margin: 0 auto;
				background: #FFFFFF;
				border: 1px solid #b6b7bc;
				border-radius: 3px;
			}
			.share-img {
				width: 360px;
				height: 540px;
				display: block;
				margin: 10px auto;
				border: 1px solid #b6b7bc;
			}
		}
	}
</style>
