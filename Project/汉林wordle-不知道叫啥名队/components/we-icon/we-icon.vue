<template>
	<text :class="['iconfont', name]" :style="fontStyle"></text>
</template>

<script>
	export default {
		name:"we-icon",
		props: {
			name: {
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: ''
			},
			size: {
				type: Number,
				default: 12
			}
		},
		computed: {
			fontStyle() {
				if (this.size < 12) {
					return {
						fontSize: '12px',
						transform: `scale(${this.size/12}) translate(-${6+this.size/4}px, 0)`,
						color: this.color
					}
				}
				return {
					fontSize: `${this.size}px`,
					color: this.color
				}
			}
		}
	}
</script>

<style lang="scss">
@import "@/assets/fonts/iconfont.css";
</style>
