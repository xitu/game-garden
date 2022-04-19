<template>
	<view class="word" :class="{status1: isMatch}">
		<view class="pinyin">
			<!-- 声母 -->
			<view class="pinyin-item">
				<view class="pinyin-tone">
				</view>
				<text :class="['pinyin-letter', `status${initial.status}`]">{{ initial.letter }}</text>
			</view>
			<!-- 韵母 -->
			<view class="pinyin-item">
				<view class="pinyin-tone">
					<we-icon :class="['tone', `status${num.status}`]" :size="6" :name="calcTone(num.letter, 1)"></we-icon>
				</view>
				<text :class="['pinyin-letter', `status${final.status}`]">{{ final.letter }}</text>
			</view>
		</view>
		<view :class="['term', `status${term.status}`]">{{ term.letter }}</view>
	</view>
</template>

<script>
	export default {
		name:"we-word",
		props: {
			initial: {
				type: Object,
				default(){
					return {}
				}
			},
			final: {
				type: Object,
				default(){
					return {}
				}
			},
			num: {
				type: Object,
				default(){
					return {}
				}
			},
			term: {
				type: Object,
				default(){
					return {}
				}
			}
		},
		computed: {
			isMatch() {
				if(!this.initial) {
					return false
				}
				const { initial, final, num, term } = this
				return initial.status===1&&final.status===1&&num.status===1&&term.status===1
			},
			calcTone() {
				const allownum = [1,2,3,4]
				const toneDict = ['', 'icon-tone-first', 'icon-tone-second', 'icon-tone-third', 'icon-tone-fourth']
				return (num) => {
					if(allownum.includes(parseInt(num))) {
						return toneDict[num]
					}
					return ''
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variable.scss";
.status{
	&1{
		color: $color-text-ok;
	}
	&2{
		color: $color-text-mis;
	}
	&3{
		color: $color-text-g;
	}
}
.word {
	width: 80px;
	height: 80px;
	background-color: $u-bg-color;
	@include we-flex(column);
	&.status1{
		background-color: $color-text-ok;
		.status1, .status2, .status3 {
			color: #fff;
		}
	}
	.pinyin {
		width: 100%;
		font-family: ui-serif,Georgia,Cambria,"Times New Roman",Times,serif;
		@include we-flex(row, center);
		
		&-item {
			@include we-flex(column, center, flex-start);
		}
		&-letter {
			height: 14px;
		}
		&-tone {
			width: 6px;
			height: 6px;
			position: relative;
			.tone {
				position: absolute;
				bottom: -6px;
			}
		}
	}
	.term {
		width: 100%;
		font-size: 28px;
		text-align: center;
	}
}
</style>
