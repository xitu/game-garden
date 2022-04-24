<template>
	<view class="idiom">
		<we-word
			v-for="(item, index) in exhibition.initial"
			:key="index"
			:initial="exhibition.initial[index]"
			:final="exhibition.final[index]"
			:num="exhibition.num[index]"
			:term="exhibition.term[index]"
		/>
		<view class="space" v-for="index in spaceLen" :key="`space${index}`"></view>
	</view>
</template>

<script>
import { idiomMatch, idiomExhibition } from '@/assets/utils.js';
export default {
	name: 'we-idiom',
	props: {
		idiom: {
			type: String,
			default: ''
		},
		action: {
			type: String,
			default: 'answer'
		}
	},
	data() {
		return {
			exhibition: {}
		};
	},
	computed: {
		spaceLen() {
			if(!this.exhibition.initial || !this.exhibition.initial.length) {
				return 4
			}
			return 4 - this.exhibition.initial.length
		}
	},
	watch: {
		idiom: {
			handler: function(newValue) {
				if(this.action === 'answer') {
					this.exhibition = idiomMatch(newValue);
				} else {
					this.exhibition = idiomExhibition(newValue);
				}
			},
			immediate: true
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixin.scss';
.idiom {
	padding: 0 16px;
	margin: 16px auto 0;
	width: 100%;
	box-sizing: border-box;
	@include we-flex(row, space-between);
}
.space {
	width: 80px;
	height: 80px;
	border: 2px solid rgba(156,163, 175, 0.1);
	box-sizing: border-box;
}
</style>
