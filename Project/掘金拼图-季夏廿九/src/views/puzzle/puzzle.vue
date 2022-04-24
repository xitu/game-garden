<template>
	<div class="puzzle_all">
		<div class="puzzle_model">
			<div class="model_all">
				<div class="model_left">
					<div class="one_bg" v-if="!isSuccess">
						<div
							class="one_model"
							v-for="(item, index) in list"
							:key="index"
							draggable="true"
							@dragstart="startDrag(index)"
							@dragenter="enterDrag(index)"
							@dragover="overDrag($event)"
							@drop="endDrop(index, $event)"
							:class="{ overClass: overindex == index }"
							:style="`background-image: url('${imgList[value]}'); background-position: -${item.left}px -${item.top}px;`"
						></div>
					</div>
					<div class="left_success" v-else>
						<p class="detail_success_title">🎉 太棒啦 🎉</p>
						<p class="detail_success_cent">
							恭喜小伙伴仅仅使用{{ steps }}步就成功通过{{
								options[value].label
							}}模式，太厉害啦🌹
						</p>
						<div class="detail_success_btn">
							<el-button @click="changeType()" plain>再次挑战</el-button>
							<el-button
								v-if="value != 2"
								type="primary"
								plain
								@click="changeNext()"
								>下一关卡</el-button
							>
						</div>
					</div>
				</div>
				<div class="model_right">
					<div class="right_img">
						<img :src="imgList[value]" alt="" class="right_img_one" />
					</div>
					<div class="right_change">
						<div class="change_one">
							<p class="change_one_p">难度:</p>
							<el-select v-model="value" class="m-2" placeholder="Select">
								<el-option
									v-for="item in options"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								/>
							</el-select>
						</div>
						<div class="change_one">
							<p class="change_one_p">步数:</p>
							<canvas
								id="steps-echarts"
								ref="mycanvas"
								width="50"
								height="50"
							></canvas>
							<!-- <p class="change_one_p1">{{ steps }}</p> -->
							<el-button @click="resetFun">重置</el-button>
						</div>
						<div class="change_one"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { imgList } from "./../../assets/image/juejin/index";
import { onMounted, ref, watch } from "vue";
const isSuccess = ref(false); // 是否通关
const value = ref(0); // 当前游戏难度
const options = [
	{
		value: 0,
		label: "简单-LOGO",
	},
	{
		value: 1,
		label: "中等-掘金酱",
	},
	{
		value: 2,
		label: "困难-创意群",
	},
];
const steps = ref(0); // 统计步数
// 列表数据
const list = ref([
	{
		value: 0,
		left: 0,
		top: 0,
	},
	{
		value: 1,
		left: 100,
		top: 0,
	},
	{
		value: 2,
		left: 200,
		top: 0,
	},
	{
		value: 3,
		left: 300,
		top: 0,
	},
	{
		value: 4,
		left: 0,
		top: 100,
	},
	{
		value: 5,
		left: 100,
		top: 100,
	},
	{
		value: 6,
		left: 200,
		top: 100,
	},
	{
		value: 7,
		left: 300,
		top: 100,
	},
	{
		value: 8,
		left: 0,
		top: 200,
	},
	{
		value: 9,
		left: 100,
		top: 200,
	},
	{
		value: 10,
		left: 200,
		top: 200,
	},
	{
		value: 11,
		left: 300,
		top: 200,
	},
	{
		value: 12,
		left: 0,
		top: 300,
	},
	{
		value: 13,
		left: 100,
		top: 300,
	},
	{
		value: 14,
		left: 200,
		top: 300,
	},
	{
		value: 15,
		left: 300,
		top: 300,
	},
]);
// 拖动元素
const dragIndex = ref(-1);
// 放置元素
const overindex = ref(-1);
/**
 * 开始拖拽的回调函数
 * @param index 当前拖拽索引
 */
const startDrag = (index: number) => {
	dragIndex.value = index;
};
/**
 * 当拖动元素到一个可释放目标元素时 回调函数
 * @param index 目标元素索引
 */
const enterDrag = (index: number) => {
	if (index == dragIndex.value) {
		// 如果目标元素是自身，则不改变
		overindex.value = -1;
		return;
	}
	overindex.value = index;
};
/**
 * 当元素被拖到一个可释放目标元素上时（100 ms/次) 回调函数
 * @param e 可释放元素
 */
const overDrag = (e: any) => {
	e.preventDefault(); // 允许成为拖拽元素的放置区
};
/**
 * 当拖动元素在可释放目标元素上释放时 回调函数
 * @param index 可释放元素索引
 * @param e 可释放元素
 */
const endDrop = (index: number, e: any) => {
	if (index == dragIndex.value) return;
	[list.value[dragIndex.value], list.value[overindex.value]] = [
		list.value[overindex.value],
		list.value[dragIndex.value],
	];
	steps.value = steps.value + 1; // 交换成功之后步数加一
	e.preventDefault();
	overindex.value = -1;
	let i = 0;
	while (i < 9) {
		if (list.value[i].value == i) {
			i++;
		} else {
			return;
		}
	}
	// 成功
	isSuccess.value = true;
};
watch(value, () => {
	resetFun();
});
/**
 * 重置游戏
 */
const resetFun = () => {
	context.value.clearRect(0, 0, 50, 50);
	draw();
	steps.value = 0;
	isSuccess.value = false;
	upsetOrderlyArrFun(list.value);
};
/**
 * 重新挑战
 */
const changeType = () => {
	resetFun();
};
/**
 * 下一关
 */
const changeNext = () => {
	value.value = value.value + 1;
	resetFun();
};
/**
 * 打乱一个有序数组
 * @param data 有序数组
 * @returns 乱序数组
 */
const upsetOrderlyArrFun = (data: any) => {
	// Fisher-Yates 洗牌算法
	for (let i = 0; i < data.length; ++i) {
		const j = Math.floor(Math.random() * (data.length - i)) + i;
		[data[i], data[j]] = [data[j], data[i]];
	}
	return data;
};
const mycanvas = ref(null);
let context = ref<any>(null);
/**
 * 绘制步数
 */
const draw = () => {
	context.value.beginPath(); // 开始绘制
	context.value.textAlign = "center"; // 左右对齐方式，相对于指定圆点
	context.value.textBaseline = "middle"; // 上下对齐方式，相对于指定圆点
	context.value.font = '24px "微软雅黑"'; // 设置字体大小以及字体种类
	context.value.fillStyle = "#333333"; // 设置填充字体颜色
	context.value.fillText(steps.value, 25, 25); // 设置填充字体内容以及坐标
	context.value.closePath(); // 结束绘制
};
watch(steps, () => {
	context.value.clearRect(0, 0, 50, 50);
	draw();
});
onMounted(() => {
	const c: any = mycanvas.value;
	context.value = c.getContext("2d");
	draw();
	upsetOrderlyArrFun(list.value);
});
</script>
<style scoped lang="less">
.puzzle_all {
	width: 100%;
	height: 100%;
	background-image: url("./../../assets/image/bgimg.png");
	background-size: 100% 100%;
	background-repeat: no-repeat;
}
.puzzle_model {
	width: 800px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -40%);
	right: 200px;
	background-color: white;
	padding: 20px;
	border-bottom-right-radius: 20%;
	.model_all {
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: flex-start;
		.model_left {
			width: 450px;
			height: 450px;
			position: relative;
			border: 5px solid #f6e6c5;
			box-shadow: 0px 0px 10px 10px #f6e6c5;

			.one_bg {
				display: flex;
				flex-wrap: wrap;
				width: 400px;
				height: 400px;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				border-radius: 10px;
				overflow: hidden;
				.one_model {
					width: 100px;
					height: 100px;
					position: relative;
					overflow: hidden;
					background-size: 400px 400px;
					background-repeat: no-repeat;
				}
			}
			.left_success {
				width: 400px;
				height: 400px;
				.detail_success_title {
					text-align: center;
					color: rgb(255, 113, 88);
					font-size: 28px;
					margin: 60px 0 30px 0;
				}
				.detail_success_cent {
					color: rgb(225, 176, 98);
					font-size: 20px;
					text-align: center;
					padding: 0 30px;
				}
				.detail_success_btn {
					margin-top: 60px;
					text-align: center;
				}
			}

			.overClass {
				border: 2px solid #f6e6c5;
				box-shadow: 0px 0px 10px 10px #f6e6c5;
				z-index: 1;
			}
		}
		.model_right {
			.right_img {
				width: 180px;
				height: 180px;
				border: 5px solid #f6e6c5;
				box-shadow: 0px 0px 10px 10px #f6e6c5;
				margin: 0 auto;
				position: relative;
				.right_img_one {
					width: 150px;
					height: 150px;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
			}
			.right_change {
				width: 180px;
				height: 200px;
				margin-top: 30px;
				.change_one {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					margin-bottom: 10px;
					.change_one_p {
						// width: 70px;
						font-size: 18px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #333333;
						white-space: nowrap;
						margin-right: 10px;
					}
					#steps-echarts {
						width: 40px;
						height: 40px;
						margin-right: 20px;
					}
					.change_one_p1 {
						margin-right: 20px;
					}
				}
			}
		}
	}
}
</style>
