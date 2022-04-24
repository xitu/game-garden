<template>
	<!-- 最外层的盒子写magin竟然毫无用处 -->
	<view class="wrapper">
		<saolei style="margin-top:128px;" ref="saolei" :width="width" :height="height" :boomNum="boomNum"></saolei>
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
		onHide() {
			console.log('hide')
			this.$refs.saolei.pauseDida()
		},
		onUnload() {
		this.$refs.saolei.pauseDida()	
		console.log('unload')
		},
		onShow(){
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
.wrapper {
  height: 100vh;
  width:100vw;
  background-attachment:fixed;
  background-position: center 190% ;
  background-image: url('https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7df26cc2-27b5-45d1-bfb4-6fe6fd486dd3/8662a03a-99ff-4b39-9263-7d1b28ef657e.jpg');
}
</style>
