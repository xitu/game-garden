kaboom({
	scale: 0.7,
	background: [ 128, 180, 255 ],
})
// 加载资源
loadSprite("bean", "../assets/hawking.png")
loadSprite("ghosty", "../assets/ghosty.png")
loadSprite("spike", "../assets/spike.png")
loadSprite("grass", "../assets/snow.png")
loadSprite("prize", "../assets/jumpy.png")
loadSprite("apple", "../assets/mushroom.png")
loadSprite("portal", "../assets/door.png")
loadSprite("coin", "../assets/coin.png")
loadSound("coin", "../assets/score.mp3")
loadSound("powerup", "../assets/powerup.mp3")
loadSound("blip", "../assets/blip.mp3")
loadSound("hit", "../assets/hit.mp3")
loadSound("portal", "../assets/portal.mp3")
loadSprite("cloud", "../assets/cloud.png")
loadSprite("sun", "../assets/sun.png")


// 控制敌人巡逻行动的自定义组件
function patrol(speed = 60, dir = 1) {
	return {
		id: "patrol",
		require: [ "pos", "area", ],
		add() {
			this.on("collide", (obj, col) => {
				if (col.isLeft() || col.isRight()) {
					dir = -dir
				}
			})
		},
		update() {
			this.move(speed * dir, 0)
		},
	}
}

function spawnCloud() {

	const dir = choose([LEFT, RIGHT])

	add([
		sprite("cloud", { flipX: dir.eq(LEFT) }),
		move(dir, rand(20, 60)),
		cleanup(),
		pos(dir.eq(LEFT) ? width() : 0, rand(-20, 480)),
		origin("top"),
		area(),
		z(-50),
	])

	wait(rand(6, 12), spawnCloud)

}

spawnCloud()


const sun = add([
	sprite("sun"),
	origin("center"),
	pos(width() - 90, 90),
	rotate(),
	z(-100),
])

sun.onUpdate(() => {
	sun.angle += dt() * 12
})

// 定制组件，让东西变大
function big() {
	let timer = 0
	let isBig = false
	let destScale = 1
	return {
		// 组件id/名称
		id: "big",
		// 它需要比例组件
		require: [ "scale" ],
		update() {
			if (isBig) {
				timer -= dt()
				if (timer <= 0) {
					this.smallify()
				}
			}
			this.scale = this.scale.lerp(vec2(destScale), dt() * 6)
		},
		// custom methods
		isBig() {
			return isBig
		},
		smallify() {
			destScale = 1
			timer = 0
			isBig = false
		},
		biggify(time) {
			destScale = 2
			timer = time
			isBig = true
		},
	}
}

// 定义一些常数
const JUMP_FORCE = 1320
const MOVE_SPEED = 480
const FALL_DEATH = 2400

const LEVELS = [
	[
		"                              ",
		"                 ====        $",
		"                             $",
		"           $$            =   $",
		"  %      ====            =   $",
		"                         =   $",
		"                         =    ",
		"   @ > ^^      =>>>>>>>> =   @",
		"===============================",
	   ],
	   [
		   "                                $           ",
		"                                =    $     @",
		"                          =     =    $      ",
		"                   =            =    $      ",
		"            =                   =    $      ",
		"     =                          = > > > > >=",
		"  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
		"============================================",
	   ],
	   [
		"     $    $    $    $     $",
		"                           ",
		"                           ",
		"                           ",
		"                           ",
		"                           ",
		"                           ",
		"^^   >^^^^>^^^^>^^^^>^^^^^@",
		"===========================",
	   ],
	   [
		"      ==      ==      ==        $@ ",
		"  ===     ===     ===     ===      ",
		"      $       $       $       $    ",
		"      =       =       =       =    ",
		"      =       =       =       =    ",
		"      =       =       =       =    ",
		"      =       =       =       =    ",
		"=>   >=>     >=>     >=>     >=    ",
		"===================================",
	   ],
	   [
		"         $^^                       ",
		"         ===                      @",
		"              ^                  $ ",
		"              =                 $  ",
		"    =%=       =                $   ",
		"              =  $                 ",
		"              =                    ",
		"   ^^         =^^>^^^^=^^^  >    $=",
		"===================================",
	   ],
	   [
		"      =            $      ^^^ =^     ",
		"      =            =          =     ",
		"    $ =                       =@s   ",
		"      =                ^      =     ",
		"   $  =                ^      =     ",
		"      =                ^      = ^  ^",
		"      =                ^      =  $  ",
		"= > ^^=^^^^^^^^>^      ^  >^>>=>^>^^",
		"=================      ==============",
	   ],
]

// 定义每个符号在水平图中的含义
const levelConf = {
	// 网格大小
	width: 64,
	height: 64,
	// 将每个对象定义为组件列表
	"=": () => [
		sprite("grass"),
		area(),
		solid(),
		origin("bot"),
	],
	"$": () => [
		sprite("coin"),
		area(),
		pos(0, -9),
		origin("bot"),
		"coin",
	],
	"%": () => [
		sprite("prize"),
		area(),
		solid(),
		origin("bot"),
		"prize",
	],
	"^": () => [
		sprite("spike"),
		area(),
		solid(),
		origin("bot"),
		"danger",
	],
	"#": () => [
		sprite("apple"),
		area(),
		origin("bot"),
		body(),
		"apple",
	],
	">": () => [
		sprite("ghosty"),
		area(),
		origin("bot"),
		body(),
		patrol(),
		"enemy",
	],
	"@": () => [
		sprite("portal"),
		area({ scale: 0.5, }),
		origin("bot"),
		pos(0, -12),
		"portal",
	],
}

scene("game", ({ levelId, coins } = { levelId: 0, coins: 0 }) => {

	gravity(3200)

	// 向场景添加关卡
	const level = addLevel(LEVELS[levelId ?? 0], levelConf)

	// 定义玩家对象

	const player = add([
		sprite("bean"),
		pos(0, 0),
		area(),
		scale(1),
		// 使重心下降并可跳跃
		body(),
		// 我们在上面定义的自定义组件
		big(),
		origin("bot"),
	])

	// action() 每帧运行一次
	player.onUpdate(() => {
		// 中央摄影机图层
		camPos(player.pos)
		// 制止坠落死亡
		if (player.pos.y >= FALL_DEATH) {
			go("lose")
		}
	})

	// 如果玩家与任何带有“危险”标签的obj碰撞，则失败
	player.onCollide("danger", () => {
		go("lose")
		play("hit")
	})

	player.onCollide("portal", () => {
		play("portal")
		if (levelId + 1 < LEVELS.length) {
			go("game", {
				levelId: levelId + 1,
				coins: coins,
			})
		} else {
			go("win")
		}
	})

	player.onGround((l) => {
		if (l.is("enemy")) {
			player.jump(JUMP_FORCE * 1.5)
			destroy(l)
			addKaboom(player.pos)
			play("powerup")
		}
	})

	player.onCollide("enemy", (e, col) => {
		// 如果不是从上面，那就去死吧
		if (!col.isBottom()) {
			go("lose")
			play("hit")
		}
	})

	let hasApple = false

	player.onHeadbutt((obj) => {
		if (obj.is("prize") && !hasApple) {
			const apple = level.spawn("#", obj.gridPos.sub(0, 1))
			apple.jump()
			hasApple = true
			play("blip")
		}
	})

	// 玩家在与“苹果”obj的碰撞中变大
	player.onCollide("apple", (a) => {
		destroy(a)
		// 正如我们在big（）组件中定义的
		player.biggify(3)
		hasApple = false
		play("powerup")
	})

	let coinPitch = 0

	onUpdate(() => {
		if (coinPitch > 0) {
			coinPitch = Math.max(0, coinPitch - dt() * 100)
		}
	})

	player.onCollide("coin", (c) => {
		destroy(c)
		play("coin", {
			detune: coinPitch,
		})
		coinPitch += 100
		coins += 1
		coinsLabel.text = coins
	})

	const coinsLabel = add([
		text(coins),
		pos(24, 24),
		fixed(),
	])

	// 空格键跳跃
	onKeyPress("space", () => {
		// 这两个函数由body（）组件提供
		if (player.isGrounded()) {
			player.jump(JUMP_FORCE)
		}
	})

	onKeyDown("left", () => {
		player.move(-MOVE_SPEED, 0)
	})

	onKeyDown("right", () => {
		player.move(MOVE_SPEED, 0)
	})

	onKeyPress("down", () => {
		player.weight = 3
	})

	onKeyRelease("down", () => {
		player.weight = 1
	})

	onKeyPress("f", () => {
		fullscreen(!fullscreen())
	})

	onKeyPress("w", () => {
		if (player.isGrounded()) {
			player.jump(JUMP_FORCE)
		}
	})
	onKeyDown("a", () => {
		player.move(-MOVE_SPEED, 0)
	})
	onKeyDown("d", () => {
		player.move(MOVE_SPEED, 0)
	})

})

scene("lose", () => {
	add([
		text("You Lose"),
	])
	onKeyPress(() => go("game"))
})

scene("win", () => {
	add([
		text("You Win"),
	])
	onKeyPress(() => go("game"))
})

go("game")
