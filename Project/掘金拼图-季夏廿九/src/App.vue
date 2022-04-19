<template>
	<div id="admin">
		<router-view />
	</div>
</template>
<style lang="less" scoped>
#admin {
	position: relative;
	width: 100vw;
	height: 100vh;
	// background-image: url("./assets/image/back-img.png");
	background-attachment: fixed; // 背景图片不随页面的滚动而滚动
	background-size: 100% 100%;
	background-repeat: no-repeat;
}
</style>
