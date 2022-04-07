<template>
	<view>
		<saolei :width="width" :height="height" :boomNum="boomNum"></saolei>
	<view> 再来一局</view>
	</view>
	
</template>

<script>
	import saolei from '../../components/gwh-saolei/gwh-saolei.vue'
	export default {
		onLoad:function(data){
			console.log(data)
			const {degree} = data ;
			this.width+=(2*degree)
			this.height+=(2*degree)
			this.boomNum+=(4*degree)
		},
		data() {
			return {
				width:8,
				height:8,
				boomNum:10
			}
		},
		components:{
			saolei
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
