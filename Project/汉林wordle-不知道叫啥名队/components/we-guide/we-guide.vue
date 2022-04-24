<template>
	<view class="weguide">
		<view class="caption">
			<text class="title">汉林</text>
			<text class="subtitle">双简版wordle</text>
			<text class="brief">
				wordle简体中文版本的简单实现，无限模式满足你的挑战欲！
			</text>
		</view>
		<view class="play">
			<u-button text="开始游戏" color="#1d9c9c" size="large" :customStyle="{padding: '0 32px'}" @click="handlePlay"></u-button>
		</view>
		<view class="line"></view>
		<view class="rule-title">
			<text>游戏规则</text>
		</view>
		<view class="rule-content center">
			<text>你有十次的机会猜一个</text><text class="text-ok">四字成语</text><text>。</text>
		</view>
		<view class="rule-content">
			<text class="text-ok">无限模式：</text><text>每次对局中，你猜对一个成语后可以继续下一个，直到你想结束。</text>
		</view>
		<view class="rule-content">
			<text class="text-ok">对局目标：</text><text>每次对局中，猜对5个及以上成语时，荣获</text><text class="text-ok">汉林学士</text><text>称号。</text>
		</view>
		<view class="rule-content">
			<text class="text-ok">结束对局：</text><text>每次对局中，猜对1个及以上成语时，可以主动触发按钮结束对局。或者在每次猜对成语时，选择结束对局。</text>
		</view>
		<view class="rule-content">
			<text>每次猜测后，汉字与拼音的颜色将会标识其与正确答案的区别。</text>
		</view>
		<we-idiom idiom="平安喜乐" action="preview"></we-idiom>
		<view class="rule-content">
			<text>每个格子的 </text><text class="text-weight">汉字、声母、韵母、声调</text><text>是否正确都会用独立的颜色进行标识。</text>
		</view>
		<view class="rule-content">
			<text class="text-ok">青色</text><text>代表它完全正确（即在成语中的位置也是正确的）。</text>
		</view>
		<view class="rule-content">
			<text class="text-mis">橙色</text><text>代表它出现在成语中（但是位置是不对的）。</text>
		</view>
		<view class="rule-content">
			<text class="text-grey">灰色</text><text>代表它是错误的，和当前成语没有半毛钱关系。</text>
		</view>
		<view class="rule-content">
			<text class="text-weight">为了方便，规则标识和汉兜几乎完全相同。</text>
		</view>
		<view class="line"></view>
		<view class="rule-content copyright">
			<text>汉林项目组©2022 不知道叫啥名队</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"we-guide",
		data() {
			return {
				
			};
		},
		methods: {
			handlePlay() {
				this.$emit('play', 2)
			}
		}
	}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variable.scss";
.text {
	&-ok {
		color: $color-text-ok;
	}
	&-mis {
		color: $color-text-mis;
	}
	&-grey {
		color: $color-text-g;
	}
	&-weight {
		color: $color-text;
		font-weight: 500;
	}
}
.weguide {
	margin: 0 auto;
	max-width: 100%;
	width: 375px;
	height: 100vh;
	background-color: #fff;
	@include we-flex(column, flex-start, center);
	.caption {
		margin-top: 32px;
		padding: 16px;
		width: 100%;
		font-family: ui-serif,Georgia,Cambria,"Times New Roman",Times,serif;
		box-sizing: border-box;
		@include we-flex(column);
		> * {
			margin-bottom: 8px;
		}
		.title {
			font-size: 32px;
			color: $color-text;
		}
		.subtitle {
			font-size: 16px;
			color: $color-text-l;
		}
		.brief {
			font-size: 14px;
			color: $color-text-ll;
		}
	}
	.play {
		letter-spacing: 4px;
		@include we-flex();
	}
	.rule{
		&-title {
			padding: 20px;
			width: 100%;
			box-sizing: border-box;
			font-size: 16px;
			font-weight: 500;
			text-align: center;
		}
		&-content {
			padding: 8px 16px;
			width: 100%;
			box-sizing: border-box;
			font-size: 15px;
			color: $color-text-l;
			&.center {
				text-align: center;
			}
		}
	}
	.line {
		margin: 8px auto;
		width: 60px;
		border-bottom: 2px solid $color-border;
	}
	.copyright {
		margin-top: 16px;
		text-align: center;
	}
}
</style>
