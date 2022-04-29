// 初始化上下文
kaboom()
// 加载障碍物
const obstacles = [
	"mushroom",
	"spike",
	"grass"
]

for (const obstacle of obstacles) {
	loadSprite(obstacle, `../assets/${obstacle}.png`)
}

// 添加yoyo和ghosty对象，以及音效
loadSprite("yoyo", "../assets/yoyo.png")
loadSprite("ghosty", "../assets/ghosty.png")
loadSound("blip", "../assets/blip.mp3")
loadSound("wooosh", "../assets/wooosh.mp3")

scene("start", () => {

	play("wooosh")

	add([
		text("yoyo eat"),
		pos(center().sub(0, 100)),
		scale(2),
		origin("center"),
	])

	add([
		sprite("ghosty"),
		pos(center().add(0, 100)),
		scale(2),
		origin("center"),
	])

	// 1.5秒后开始游戏
	wait(1.5, () => go("game"))
})

// 主要游戏场景内容
scene("game", () => {

	// 速度
	const SPEED_MIN = 120
	const SPEED_MAX = 640

	// 玩家控制的游戏对象
	const player = add([
		sprite("yoyo"),
		pos(40, 20),
		area({ scale: 0.5 }),
		origin("center"),
	])

	// 使图层通过鼠标移动
	player.onUpdate(() => {
		player.pos = mousePos()
	})

	// 如果玩家碰到障碍物则游戏结束
	player.onCollide("obstacle", (obstacle) => {
		go("lose", score)
		play("blip")
	})

	// 每帧移动障碍物，如果超出屏幕一定距离则将其销毁
	// 所有带有move标签的物体都会在每一帧都向x移动
	onUpdate("move", (move) => {
		move.move(-move.speed, 0)
		if (move.pos.x < -120) {
			destroy(move)
		}
	})

	onUpdate("ghosty", (ghosty) => {
		if (ghosty.pos.x <= 0) {
			go("lose", score)
			play("blip")
			addKaboom(ghosty.pos)
		}
	})

	// 计分器
	let score = 0

	const scoreLabel = add([
		text(score, 32),
		pos(12, 12),
	])


	// 如果玩家吃了ghosty，则增加分数
	player.onCollide("ghosty", (ghosty) => {
		addKaboom(player.pos)
		score += 1
		destroy(ghosty)
		scoreLabel.text = score
		burp()
		shake(12)
	})


	// 每 0.3 秒执行一次
	loop(0.3, () => {


		// 从屏幕右侧生成
		const x = width() + 24

		// 从随机 y 位置生成
		const y = rand(0, height())

		// 获得随机速度
		const speed = rand(SPEED_MIN, SPEED_MAX)

		// 50% 的几率是ghosty
		const isGhosty = chance(0.5)
		const spriteName = isGhosty ? "ghosty" : choose(obstacles)

		add([
			sprite(spriteName),
			pos(x, y),
			area({ scale: 0.5 }),
			origin("center"),
			"move",
			isGhosty ? "ghosty" : "obstacle",
			{ speed: speed }
		])

	})

})

// 游戏结束场景
scene("lose", (score) => {

	// 显示图标
	add([
		sprite("yoyo"),
		pos(width() / 2, height() / 2 - 108),
		scale(3),
		origin("center"),
	])

	// 显示分数
	add([
		text(score),
		pos(width() / 2, height() / 2 + 108),
		scale(3),
		origin("center"),
	])

	// 按下鼠标空格返回游戏
	onKeyPress("space", () => go("start"))
	onClick(() => go("start"))

})

// 开始游戏
go("start")
