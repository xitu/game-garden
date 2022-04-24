<template>
	<view class="play">
		<u-navbar title="汉林" :placeholder="true">
			<view class="nav-tool" slot="left">
				<u-icon name="question-circle" size="24" @click="handleQuestion"></u-icon>
				<u-icon name="file-text" size="28" v-show="playData.time" @click="showBoard = true"></u-icon>
			</view>
			<view class="nav-title" slot="center">汉林</view>
			<!-- <view class="nav-tool" slot="right">
				<u-icon name="setting" size="24"></u-icon>
				<u-icon name="share" size="24" @click="showShare = true"></u-icon>
			</view> -->
		</u-navbar>
		<view class="play-title">
			<text>{{ convertTitle }}</text>
		</view>
		<we-idiom v-for="(item, index) in answerList" :key="index" :idiom="item"></we-idiom>

		<we-idiom :idiom="hanAnswer" action="preview"></we-idiom>

		<view class="exam">
			<u-input placeholder="输入四字成语.." v-model.trim="answer" @change="answerChange" clearable></u-input>
			<u-button text="确定" color="rgb(10, 185, 156)" :disabled="!isSubmit" @click="answerSubmit"></u-button>
			<u-button text="结束对局" :disabled="!correctList.length" @click="handleOver"></u-button>
			<view class="exam-tip">
				<u--text prefixIcon="info-circle" iconStyle="font-size: 19px" margin="0 8px" text="文字提示" align="right" @click="showTips" />
				<u--text prefixIcon="info-circle" iconStyle="font-size: 19px" margin="0 8px" text="位置提示" align="left" @click="showTips('index')" />
			</view>
			<view class="exam-honor">
				<text>{{ honorRoad }}</text>
			</view>
		</view>

		<popup-share v-if="showShare" :play-list="playData.play" @close="showShare = false" />
		<score-board v-if="showBoard" :play-list="playData.play" @close="showBoard = false" />
	</view>
</template>

<script>
import { convertToChinaNum, isSameDate } from '@/assets/utils.js';
export default {
	name: 'we-play',
	data() {
		return {
			showShare: false,
			showBoard: false,
			isSubmit: false,
			idiom: {},
			// 回答正确列表
			correctList: [],
			// 回答列表
			answerList: [],
			answer: '',
			// 当前对局
			currentPlay: {},
			// 对局数据
			playData: {}
		};
	},
	mounted() {
		this.getRandomIdiom();
		if (!this.playData.time) {
			const storageData = uni.getStorageSync('playData');
			if (storageData.time && isSameDate(storageData.time)) {
				this.playData = storageData;
			}
		}
	},
	computed: {
		convertTitle() {
			const index = convertToChinaNum(this.correctList.length + 1)
			return `题${index}`;
		},
		hanAnswer() {
			return this.answer.replace(/[^\u4E00-\u9FA5]/g,'')
		},
		honorRoad() {
			const len = this.correctList.length;
			let honor = ''
			switch (len){
				case 0:
					honor = '恭喜你开启了汉林学士的进阶之路，加油！'
					break;
				case 1:
					honor = '加油，你已经在汉林学士的道路上走了最重要的一步！'
					break;
				case 2:
					honor = '奥利给，你很有成为“汉林学士”的潜力哦！'
					break;
				case 3:
					honor = '“汉林学士”的称号已经在向你招手啦！'
					break;
				case 4:
					honor = '你距离成为“汉林学士”只差一小步啦！'
					break;
				case 5:
					honor = '大神，恭喜你成为“汉林学士”！'
					break;
				default:
					honor = `汉林学士，你已经猜对${len}个成语啦！`
					break;
			}
			return honor;
		}
	},
	methods: {
		getRandomIdiom() {
			if (uni.getStorageSync('currentIdiom')) {
				return;
			}
			this.$api.getRandomIdiom().then(res => {
				this.idiom = res.result.data[0];
				uni.setStorageSync('currentIdiom', this.idiom);
			});
		},
		answerChange(val) {
			// 对局存储开始时间
			if (!this.currentPlay.start) {
				const stroagePlay = uni.getStorageSync('currentPlay');
				this.currentPlay.start = stroagePlay.start || new Date().getTime();
				uni.setStorageSync('currentPlay', this.currentPlay);
			}
			// 输入包含四个汉字时允许提交验证
			const text = val.replace(/[^\u4E00-\u9FA5]/g, '');
			if (text && text.length === 4) {
				this.isSubmit = true;
			} else {
				this.isSubmit = false;
			}
		},
		answerSubmit() {
			if (this.answerList.includes(this.hanAnswer)) {
				uni.showToast({
					title: '这个成语已经尝试过啦，换一个吧'
				});
				return;
			}

			// this.answerList.push(this.answer);
			this.answerList.push(this.hanAnswer); // change by @wangxj
			uni.setStorageSync('answerList', this.answerList)
			const currentIdiom = uni.getStorageSync('currentIdiom')
			const todayIdiom = currentIdiom.word
			if(this.hanAnswer === todayIdiom) {
				// 猜对了
				this.correctList.push(this.hanAnswer)
				uni.setStorageSync('correctList', this.correctList)

				uni.showModal({
					title: '恭喜',
					content: '恭喜你猜对啦，继续下一题吧',
					success: res => {
						if (res.confirm) {
							this.modalConfirm();
						} else if (res.cancel) {
							this.playOver();
						}
					}
				});
			} else if (this.answerList.length >= 10) {
				// 猜词失败
				uni.showModal({
					title: '失败提醒',
					content: '你已经猜错10次啦，重新开局？',
					confirmText: '重新开局',
					cancelText: '歇一会儿',
					success: res => {
						if (res.confirm) {
							this.playReset();
						} else if (res.cancel) {
							this.playOver();
						}
					}
				});
			}
			this.answer = '';
		},
		handleQuestion() {
			this.$emit('question', 1);
		},
		// 用户触发主动结束对局行为
		handleOver() {
			if(!this.correctList.length) {
				uni.showToast({
					title: '请先至少猜对1个成语嘛'
				})
				return;
			}
			uni.showModal({
				title: '对局提醒',
				content: '确定要直接结束对局么',
				confirmText: '结束对局',
				success: res => {
					if (res.confirm) {
						this.playOver()
					}
				}
			});
		},
		modalConfirm() {
			// 继续下一题
			uni.removeStorageSync('currentIdiom');
			uni.removeStorageSync('answerList');
			this.answerList = [];
			this.getRandomIdiom();
		},
		playReset() {
			// 重置对局
			uni.removeStorageSync('currentIdiom');
			uni.removeStorageSync('answerList');
			uni.removeStorageSync('correctList');
			uni.removeStorageSync('currentPlay');
			this.answerList = [];
			this.correctList = [];
			this.currentPlay = [];
			this.getRandomIdiom();
		},
		playOver() {
			// 结束对局
			const num = this.correctList.length;
			const major = num >= 5 ? '荣升为汉林学士' : '差点就成为汉林学士啦';
			const content = num ? `本次对局中，您共计猜对了${num}个成语，${major}!` : '很遗憾，本次对局中没有猜对成语~';
			// 存储对局结束时间
			const stroagePlay = uni.getStorageSync('currentPlay');
			if (stroagePlay.start) {
				this.currentPlay = stroagePlay;
			}
			const currentPlay = { ...this.currentPlay, end: new Date().getTime(), count: num };
			this.currentPlay = currentPlay;
			uni.setStorageSync('currentPlay', this.currentPlay);
			const time = parseInt(this.currentPlay.end) - parseInt(this.currentPlay.start);
			if (!this.playData.time) {
				this.playData = {
					time: new Date().getTime(),
					play: []
				};
			}
			this.playData.play.push({
				count: num,
				time
			});
			this.$api.updatePlayRecord({count: num, time}).then(res => {
				console.log(res);
			})
			uni.setStorageSync('playData', this.playData);

			uni.showModal({
				title: '对局提醒',
				content: content,
				confirmText: '对局分享',
				success: res => {
					if (res.confirm) {
						// 生成分享海报或链接
						this.showShare = true;
					} else if (res.cancel) {
						// 取消，回到首页？
						this.handleQuestion();
					}
				},
				complete: () => {
					this.playReset();
				}
			});
		},
		showTips(type = 'term') {
			// 显示提示字
			const currentIdiom = uni.getStorageSync('currentIdiom');
			let title = '';
			if (type === 'term') {
				const tip = currentIdiom && currentIdiom.tip;
				title = `成语中包含：${tip}`;
			} else {
				const index = currentIdiom.word.indexOf(currentIdiom.tip) + 1;
				title = `提示文字在当前成语的第${index}个位置`;
			}
			uni.showToast({
				title,
				icon: 'none'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixin.scss';
@import '@/assets/styles/variable.scss';
.play {
	margin: 0 auto;
	max-width: 100%;
	width: 375px;
	@include we-flex(column, center, flex-start);
	&-title {
		margin: 16px auto;
		font-size: 18px;
		color: $color-text-l;
	}
}
.nav {
	&-tool {
		@include we-flex(row, flex-start);
		> * {
			margin-right: 8px;
		}
	}
	&-title {
		font-size: 24px;
		font-family: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif;
		color: #333;
	}
}
.exam {
	margin: 16px auto;
	padding: 0 16px;
	width: 100%;
	box-sizing: border-box;
	@include we-flex(column);
	> * {
		width: 100%;
		margin-bottom: 8px;
	}
	&-tip {
		margin: 8px auto;
		@include we-flex(row);
	}
	&-honor {
		margin: 16px auto;
		text-align: center;
		color: $color-text-ok;
	}
}
</style>
