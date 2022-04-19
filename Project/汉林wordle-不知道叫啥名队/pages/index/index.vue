<template>
	<view class="container">
		<we-guide v-show="status ===1" @play="changeStatus"></we-guide>
		<we-play v-show="status ===2" @question="changeStatus"></we-play>
	</view>
</template>

<script>
export default {
	data() {
		return {
			status: 1
		};
	},
	onLoad() {
		uni.removeStorageSync('currentPlay');
	},
	methods: {
		changeStatus(status) {
			this.status = status
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixin.scss';
.container {
	margin: 0 auto;
	max-width: 100%;
	width: 375px;
	@include we-flex(column, center, flex-start);
}
</style>
