<template>
	<view class="content">
     <view class="action-box">
       <navigator class="degree indoor" url="/pages/play/play?degree=0"></navigator>
       <view class="degree indoor" style="margin-top:49px;" @click="showList"></view>
     </view>
<!--		<navigator class="degree indoor" url="/pages/play/play?degree=0">入门</navigator>
		<navigator class="degree easy"   url="/pages/play/play?degree=1">简单</navigator>
		<navigator class="degree normal" url="/pages/play/play?degree=2">一般</navigator>
	-->
  </view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {

		},
		methods: {
      showList(){
        uni.showActionSheet({
          itemList: ['入门', '简单', '一般'],
          success: function (res) {
            // console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
            uni.navigateTo({
              url: `/pages/play/play?degree=${res.tapIndex}`
            });
          },
          fail: function (res) {
            console.log(res.errMsg);
          }
        });
      }
		}
	}
</script>

<style>
	@keyframes wave{
		from{background-position: 0 0;}
		to{background-position: 0 100vh;}
	}
	.content {
    position:relative;
    z-index:1;
		display: flex;
		flex-direction: column;
		align-items: center;
		row-gap:10px ;
		height: 100vh;
    width:100vw;
    background-size: 100% 100%;
    background-image: url('https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7df26cc2-27b5-45d1-bfb4-6fe6fd486dd3/8662a03a-99ff-4b39-9263-7d1b28ef657e.jpg');
	}
  .action-box {
      position:fixed;
      top: 48%;
      left: 21%;
      width: 230px;
   }
  .degree {
    height: 40px;
  }
</style>
