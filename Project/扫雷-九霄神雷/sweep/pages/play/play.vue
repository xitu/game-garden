<template>
	<!-- 最外层的盒子写magin竟然毫无用处 -->
	<view style="padding-top:20px">
		<saolei ref="saolei" :width="width" :height="height" :boomNum="boomNum"></saolei>
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
	
.again {
	margin-top: 40px; 
	padding: 15px 30px; 
	border-radius: 30px;
	font-size: 10vw; 
	background: ;
}
</style>
