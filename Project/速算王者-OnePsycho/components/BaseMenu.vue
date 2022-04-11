<template>
	<view>
		<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
			<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2">
				<!-- <view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view> -->
				<!-- <view :class="['iconfont','icon-' + item.cuIcon,'text-' + item.color]" style="font-size: 60rpx;"></view> -->
				<view>
					<image :src="item.cuIcon" mode="widthFix" style="width: 90rpx;"></image>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
	</view>
</template>
	
<script>
	export default {
		data() {
			return {
				cuIconList: [{
					cuIcon: 'https://cdn.nlark.com/yuque/0/2020/png/280373/1589254836122-assets/web-upload/d48630fc-841d-4d70-8cd9-f2d535099dfe.png',
					color: 'red',
					badge: 120,
					name: 'VR'
				}, {
					cuIcon: 'https://cdn.nlark.com/yuque/0/2020/png/280373/1589254836507-assets/web-upload/ddb97e83-eec0-4eb5-b86a-9db0f30d1533.png',
					color: 'orange',
					badge: 1,
					name: '录像'
				}, {
					cuIcon: 'https://cdn.nlark.com/yuque/0/2020/png/280373/1589254836341-assets/web-upload/2c731475-4713-43e5-94d3-a4b0ac7e65cd.png',
					color: 'yellow',
					badge: 0,
					name: '图像'
				}, {
					cuIcon: 'https://cdn.nlark.com/yuque/0/2020/png/280373/1589254837422-assets/web-upload/bae7e010-4010-4a22-a54a-54559c0161b8.png',
					color: 'olive',
					badge: 22,
					name: '通知'
				}, {
					cuIcon: 'https://cdn.nlark.com/yuque/0/2020/png/280373/1589254835922-assets/web-upload/28c03185-ddd8-48d0-ad71-54c6e1b1d44a.png',
					color: 'cyan',
					badge: 0,
					name: '排行榜'
				}, {
					cuIcon: 'https://cdn.nlark.com/yuque/0/2020/png/280373/1589254835879-assets/web-upload/7a913f0c-16df-4059-a9b5-5ec8da18be94.png',
					color: 'blue',
					badge: 0,
					name: '皮肤'
				}, {
					cuIcon: 'https://cdn.nlark.com/yuque/0/2020/png/280373/1589254835868-assets/web-upload/10a09169-2a2d-4e32-91ad-e7dbef536c68.png',
					color: 'purple',
					badge: 0,
					name: '发现'
				}, {
					cuIcon: 'https://cdn.nlark.com/yuque/0/2020/png/280373/1589254837211-assets/web-upload/dcf9c8d0-a700-4d79-90ef-f33f558ef2ed.png',
					color: 'mauve',
					badge: 0,
					name: '帮助'
				}, {
					cuIcon: 'commandfill',
					color: 'purple',
					badge: 0,
					name: '问答'
				}, {
					cuIcon: 'brandfill',
					color: 'mauve',
					badge: 0,
					name: '版权'
				}],
				modalName: null,
				gridCol: 4,
				gridBorder: false,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				skin: false,
				listTouchStart: 0,
				listTouchDirection: null,
			};
		}
	}
</script>

<style lang="less">

</style>
