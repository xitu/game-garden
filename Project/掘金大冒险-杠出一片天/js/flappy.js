kaboom({
	scale: 0.7,
	background: [ 128, 180, 255 ],
})

loadSprite("bean", "../assets/click.png")
loadSound("score", "../assets/score.mp3")
loadSound("wooosh", "../assets/wooosh.mp3")
loadSound("hit", "../assets/hit.mp3")

scene("game", () => {

	const PIPE_OPEN = 240
	const PIPE_MIN = 60
	const JUMP_FORCE = 800
	// 经测试，速度定义为600时，更容易获取更高分数
	const SPEED = 600
	const CEILING = -60

	// 定义重力：3200是最合适的重力
	gravity(3200)

	// 游戏对象包含的组件和标签列表
	const bean = add([
		// sprite（）表示它是用名为“bean”的精灵绘制的（在“loadSprite”中定义）
		sprite("bean"),
		// 默认位置
		pos(width() / 4, 0),
		// 对撞机
		area(),
		// body组件使它能够在重力世界中下落和跳跃
		body(),
	])

	// 检查是否有坠落死亡
	bean.onUpdate(() => {
		if (bean.pos.y >= height() || bean.pos.y <= CEILING) {
			// 切换到失败场景
			go("lose", score)
		}
	})

	// 绑定空格跳跃
	onKeyPress("space", () => {
		bean.jump(JUMP_FORCE)
		play("wooosh")
	})

	// 鼠标点击跳跃
	onClick(() => {
		const worldMousePos = toWorld(mousePos())
		addKaboom(worldMousePos)
		bean.jump(JUMP_FORCE)
		play("wooosh")
	})

	function spawnPipe() {

		// 计算管道位置
		const h1 = rand(PIPE_MIN, height() - PIPE_MIN - PIPE_OPEN)
		const h2 = height() - h1 - PIPE_OPEN

		add([
			pos(width(), 0),
			rect(64, h1),
			color(192, 192, 192),
			outline(4),
			area(),
			move(LEFT, SPEED),
			cleanup(),
			// 给它一个更容易定义的行为流
			"pipe",
		])

		add([
			pos(width(), h1 + PIPE_OPEN),
			rect(64, h2),
			color(192, 192, 192),
			outline(4),
			area(),
			move(LEFT, SPEED),
			cleanup(),
			"pipe",
			// 原始obj只是将每个字段分配给游戏obj的组件
			{ passed: false, },
		])

	}

	// bean与标记为“pipe”的对象关联时的回调
	bean.onCollide("pipe", () => {
		go("lose", score)
		play("hit")
		addKaboom(bean.pos)
	})

	// 标记为“pipe”的所有对象的每帧事件
	onUpdate("pipe", (p) => {
		// check if bean passed the pipe
		if (p.pos.x + p.width <= bean.pos.x && p.passed === false) {
			addScore()
			p.passed = true
		}
	})

	// 每1秒产生一根管子
	loop(1, () => {
		spawnPipe()
	})

	// 初始化分数
	let score = 0

	// 显示分数
	const scoreLabel = add([
		text(score),
		origin("center"),
		pos(width() / 2, 80),
		fixed(),
	])

	// 加分
	function addScore() {
		score++
		scoreLabel.text = score
		play("score")
	}

})

scene("lose", (score) => {

	add([
		sprite("bean"),
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

	// 按下空格键返回游戏
	onKeyPress("space", () => go("game"))
	onClick(() => go("game"))

})

go("game")
