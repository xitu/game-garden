<template>
	<view class="content">
		<view class="titleLine">
			<view @tap="initMap">
				<image src="../../static/imgs/dead.png" v-if="isGameOver"></image>
				<image src="../../static/imgs/smile.png" v-else-if="isGameSuccess"></image>
				<image src="../../static/imgs/smile2.png" v-else></image>
			</view>
			<text :class="{del:quiet}" class="music" @tap="switchMusic()">音效</text>
			<view>剩余：{{getRestBoomNum()}}</view>
		</view>
		<view class="contentMap">
			<view style="width: auto; height: auto; overflow: scroll;">
				<view class="placeInRow" v-for="(row,i) in mask" :key="'row-'+i">
					<view class="content" v-for="(block,j) in row" :key="'block-'+j">
						<view v-if="block === 1" class="block">
							<view v-if="maps[i][j] > 0" @tap="setMask(i,j,'open')">{{maps[i][j]}}</view>
							<view v-else-if="maps[i][j] === 0"></view>
							<view v-else>
								<image src="../../static/imgs/boom.png"></image>
							</view>
						</view>
						<view v-else-if="block === 0" class="block mask"
						 @tap="setMask(i,j,'open')" @longpress="setMask(i,j,'mask')"
						></view>
						<view v-else-if="block === -1" class="block mask" @longpress="setMask(i,j,'mask')">
							<image src="../../static/imgs/flag.png"></image>
						</view>
						<view v-else-if="block === 2" class="block mask">
							<image src="../../static/imgs/error.png"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<button v-if="isGameOver" class="again" type="default" v-on:click="initMap()">再来一局</button>
	</view>
</template>

<script>
	/**
	 * gwh 简单扫雷
	 * @description 扫雷游戏简单Demo
	 * @tutorial 
	 * @property {Number} width 扫雷地图宽
	 * @property {Number} height 扫雷地图高
	 * @property {Number} boomNum 雷个数     
	 * @property {Function} @init 地图初始化监听，返回游戏地图：-1表示雷，0-9表示周围有几个雷
	 * @property {Function} @result 游戏结束监听, code=0成功，其余失败
	 * */
	 

	export default {
		props:{
			width:{
				type:Number,
				default:8
			},
			height:{
				type:Number,
				default:8
			},
			boomNum:{
				type:Number,
				default:10,
			}
		},
		watch:{
			width(newVal){
				this.initMap()
			},
			height(newVal){
				this.initMap()
			},
			boomNum(newVal){
				this.initMap()
			}
		},
		data() {
			return {
				maps:[],
				mask:[],
				booms:[],
				isGameOver:false,
				isGameSuccess:false,
				lastAction:'',
				quiet:false
			};
		},
		onShow(){

		},
		onHide(){

		} ,
		
		mounted() {
			!this.startAudio && this.initMusic()
			this.initMap()
			// this.playStart()
			// this.playDida()
		},
		beforeUnmount() {
			console.log('unmount')
		},
		methods:{
			getRestBoomNum(){
				try{
					var maskNum = 0;
					var shownNum = 0;
					for (var i=0;i<this.width;i++){
						for (var j=0;j<this.height;j++){
							if(this.mask[i][j] == -1) maskNum ++;
							if(this.mask[i][j] == 1) shownNum ++;
						}
					}
					// console.log(shownNum, this.booms.length)
					this.$nextTick(function(){
						if(shownNum + this.booms.length == this.width*this.height && !this.isGameSuccess){
							this.isGameSuccess = true;
							for (var i=0;i<this.width;i++){
								for (var j=0;j<this.height;j++){
									if(this.mask[i][j] == 0 && this.maps[i][j] == -1) this.mask[i][j] = -1
								}
							}
							this.$forceUpdate()
							this.$emit('result', {code:0, msg:'success'})
						}
					})
					
					return this.booms.length - maskNum;
				}
				catch(e){
					return this.boomNum;
				}
			},
			initMap(){
				this.playStart();
				this.maps = []
				this.mask = []
				this.isGameOver = false
				this.isGameSuccess = false
				this.booms = []
				for (var i=0;i<this.width;i++){
					this.maps.push([])
					this.mask.push([])
					for (var j=0;j<this.height;j++){
						this.maps[i].push(0),
						this.mask[i].push(0)
					}
				}
				var initBooms = []
				while (initBooms.length < this.boomNum){
					var xy = [
						parseInt(Math.random()*this.width), 
						parseInt(Math.random()*this.height)
					]
					var hasSame = false;
					for (var b =0; b<initBooms.length;b++){
						if(initBooms[b][0] == xy[0] && initBooms[b][1] == xy[1]){
							hasSame = true;
							break;
						}
					}
					if (!hasSame){
						initBooms.push(xy)
						this.maps[xy[0]][xy[1]] = -1;
					}
				}
				this.booms = initBooms;
				for (var i=0;i<this.width;i++){
					for (var j=0;j<this.height;j++){
						if(this.maps[i][j] !== -1){
							var boomSum = 0;
							if(i > 0) {
								if (j > 0 && this.maps[i-1][j-1] == -1) boomSum ++;
								if (this.maps[i-1][j] == -1) boomSum ++;
								if (j < this.height - 1 && this.maps[i-1][j+1] == -1) boomSum ++;
							}
							if(i < this.width - 1) {
								if (j > 0 && this.maps[i+1][j-1] == -1) boomSum ++;
								if (this.maps[i+1][j] == -1) boomSum ++;
								if (j < this.height - 1 && this.maps[i+1][j+1] == -1) boomSum ++;
							}
							if (j > 0 && this.maps[i][j-1] == -1) boomSum ++;
							if (j < this.height - 1 && this.maps[i][j+1] == -1) boomSum ++;
							this.maps[i][j] = boomSum
						}
					}
				}
				this.$emit('init',{maps:this.maps})
			},
			initMusic(){
				this.startAudio = uni.createInnerAudioContext()
				this.startAudio.src ='https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3c5dd365-9db5-4687-8b00-e7c4a23710e1/d53274e0-321b-4e55-9ebc-e4dd86ef3e9b.mp3';    ;    // 开场音效
				this.didaAudio = uni.createInnerAudioContext()
				this.didaAudio.loop=true;
				
				this.didaAudio.src= 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3c5dd365-9db5-4687-8b00-e7c4a23710e1/edbc4906-940d-4add-b99b-94f014525cdc.mp3'// 氛围音效x
				
					// 	启动之后开始氛围渲染
					this.startAudio.onEnded( ()=>{
						this.playDida()
					})
					
				
				this.flagAudio = uni.createInnerAudioContext()
				this.flagAudio.src='https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3c5dd365-9db5-4687-8b00-e7c4a23710e1/a0a4d7c4-1b53-4554-9e71-7c79844458b8.wav';    // 插旗音效
				this.boomAudio = uni.createInnerAudioContext()
				this.boomAudio.src='https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3c5dd365-9db5-4687-8b00-e7c4a23710e1/d9ce405b-9410-4595-939b-7207cb8e2f72.mp3';    // 炸雷音效
				// 没踩到雷的
				this.normalAudio = uni.createInnerAudioContext() ;
				this.normalAudio.src = 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3c5dd365-9db5-4687-8b00-e7c4a23710e1/4b6ffade-9811-43e6-b378-fefc879e49b9.mp3'
			},
			switchMusic(){
				this.quiet = !this.quiet ;
				let volume = Number(!this.quiet)
				this.startAudio.volume = volume  ;
				this.didaAudio.volume = volume  ;
				this.flagAudio.volume = volume  ;
				this.boomAudio.volume = volume  ;
			},
			playStart(){ this.startAudio.play()} ,
			playDida(){ this.didaAudio.play()} ,
			pauseDida(){ this.didaAudio.pause()} ,
			playFlag(){ this.flagAudio.play()} ,
			playBoom(){ this.boomAudio.play()} ,
			playNormal(){ this.normalAudio.play()} ,
			setMask(i,j,action){
				// action 可以是 open 或 mask
				this.lastAction = action;
				if (this.isGameOver || this.isGameSuccess){
					return;
				}
				else if (action === 'open'){
					if (this.maps[i][j] === -1){
						for(var b=0;b<this.booms.length;b++){
							var theBoomXY = this.booms[b];
							if(this.mask[theBoomXY[0]][theBoomXY[1]] != -1){
								this.mask[theBoomXY[0]][theBoomXY[1]] = 1
							}
						}
						this.isGameOver = true;
						this.startAudio.pause() // 有可能片头曲还没完就炸了
						this.pauseDida()
						this.playBoom()
						for (var i=0;i<this.width;i++){
							for (var j=0;j<this.height;j++){
								if(this.mask[i][j] == -1 && this.maps[i][j] != -1) this.mask[i][j] = 2;
							}
						}
						this.$forceUpdate()
						this.$emit('result', {code:-1, msg:'failed'})
					}
					else{
						this.playNormal() // 先声夺人
						this.canIOpen(i,j);
						
					}
				}
				else{
					this.playFlag()
					if(this.mask[i][j] == 0)
						this.mask[i][j] = -1;
					else if(this.mask[i][j] == -1)
						this.mask[i][j] = 0;
					// console.log(i,j,this.mask[i][j])
					this.$nextTick(function(){
						this.$forceUpdate()
					})
				}
			},
			canIOpen(i,j,level=0){
				if (this.lastAction != 'open'){
					// 防止误触
					return;
				}
				if(this.maps[i][j] == -1){
					if (level <= 1){
						this.setMask(i,j,'open')
					}
					return;
				}
				this.mask[i][j] = 1;
				var boomSum = 0;
				if(i > 0) {
					if (j > 0 && this.mask[i-1][j-1] == -1) boomSum ++;
					if (this.mask[i-1][j] == -1) boomSum ++;
					if (j < this.height-1 && this.mask[i-1][j+1] == -1) boomSum ++;
				}
				if(i <this.width - 1) {
					if (j > 0 && this.mask[i+1][j-1] == -1) boomSum ++;
					if (this.mask[i+1][j] == -1) boomSum ++;
					if (j < this.height-1 && this.mask[i+1][j+1] == -1) boomSum ++;
				}
				if (j > 0 && this.mask[i][j-1] == -1) boomSum ++;
				if (j < this.height-1 && this.mask[i][j+1] == -1) boomSum ++;
				// console.log(boomSum)
				if (this.maps[i][j] <= boomSum && this.maps[i][j] != -1){
					if(i > 0) {
						if (j > 0 && this.mask[i-1][j-1] == 0) this.canIOpen(i-1,j-1,level+1);
						if (this.mask[i-1][j] == 0) this.canIOpen(i-1,j,level+1);
						if (j < this.height-1 && this.mask[i-1][j+1] == 0) this.canIOpen(i-1,j+1,level+1);
					}
					if(i <this.width - 1) {
						if (j > 0 && this.mask[i+1][j-1] == 0) this.canIOpen(i+1,j-1,level+1);
						if (this.mask[i+1][j] == 0) this.canIOpen(i+1,j,level+1);
						if (j < this.height-1 && this.mask[i+1][j+1] == 0) this.canIOpen(i+1,j+1,level+1);
					}
					if (j > 0 && this.mask[i][j-1] == 0) this.canIOpen(i,j-1,level+1);
					if (j < this.height-1 && this.mask[i][j+1] == 0) this.canIOpen(i,j+1,level+1);
				}
				
				this.$set(this,'mask',this.mask)
				// console.log(this.mask)
				this.$forceUpdate();
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		font-family: 宋体;
	}
	
	.contentMap {
		width: 100%;
		overflow: hidden;
	}
	
	.titleLine{
		width: 90%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding-top: 10px;
		padding-bottom: 10px;
	}
	
	.titleLine image{
		width: 60upx;
		height: 60upx;
	}
	
	.placeInRow{
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	
	.block{
		width: 60upx;
		height: 60upx;
		background-color: #d5d5d5;
		border: #9a9a9a solid 2px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.mask{
		border:  solid 2px;
		border-image: linear-gradient(202deg,#bbbb5d,#cff3ce)  2 ;
	}
	button.again{
		font-family:  华文新魏 ;
		color:#0000ff ;
		margin-top: 30px;
		
	}
	.music { color:#e010c7 ;}
	.del {
		text-decoration: line-through;
		color: #ccc;
	}
	
	image{
		width: 45upx;
		height: 45upx;
	}
</style>
