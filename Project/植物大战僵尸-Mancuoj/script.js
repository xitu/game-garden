const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const start_btn = document.getElementById('start_btn')
const again_btn = document.getElementById('again_btn')

// 全局变量
canvas.width = 900
canvas.height = 600

const cellSize = 100
const cellGap = 3

const gameGrid = []
const defenders = []
const projectiles = []
const enemies = []
const enemyPositions = []
const resources = []
const messages = []

// 需要更多美术素材
const enemyTypes = []
const enemy1 = new Image()
enemy1.src = 'zombie.png'
enemyTypes.push(enemy1)

const defenderTypes = []
const defender1 = new Image()
defender1.src = 'plant.png'
defenderTypes.push(defender1)

const winningScore = 1000
// const winningScore = 20
let numOfResources = 300
let score = 0
let frame = 0
let enemiesInterval = 600
let gameOver = false


// 记录鼠标位置
const mouse = {
  x: undefined,
  y: undefined,
  width: 0.1,
  height: 0.1,
}
let canvasPosition = canvas.getBoundingClientRect()

canvas.addEventListener('mousemove', (e) => {
  mouse.x = e.x - canvasPosition.left
  mouse.y = e.y - canvasPosition.top
})

canvas.addEventListener('mouseleave', (e) => {
  mouse.x = undefined
  mouse.y = undefined
})

// 游戏界面
const controlsBar = {
  width: canvas.width,
  height: cellSize,
}

class Cell {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = cellSize
    this.height = cellSize
  }

  draw() {
    if (collision(this, mouse)) {
      ctx.strokeStyle = 'black'
      ctx.lineWidth = 1
      ctx.strokeRect(this.x, this.y, this.width, this.height)
    }
  }
}

function createGrid() {
  for (let y = cellSize; y < canvas.height; y += cellSize) {
    for (let x = 0; x < canvas.width; x += cellSize) {
      gameGrid.push(new Cell(x, y))
    }
  }
}
createGrid()

function handleGrid() {
  for (let i = 0; i < gameGrid.length; i++) {
    gameGrid[i].draw()
  }
}

// 提示信息
class Message {
  constructor(value, x, y, size, color) {
    this.value = value
    this.x = x
    this.y = y
    this.size = size
    this.color = color
    this.life = 0
    this.opacity = 1
  }

  update() {
    this.y -= 0.3
    this.life++
    if (this.opacity > 0.01) this.opacity -= 0.01
  }

  draw() {
    ctx.globalAlpha = this.opacity
    ctx.fillStyle = this.color
    ctx.font = `${this.size}px Ma Shan Zheng`
    ctx.fillText(this.value, this.x, this.y)

    // 恢复画笔
    ctx.globalAlpha = 1
  }
}

function handleMessages() {
  for (let i = 0; i < messages.length; i++) {
    messages[i].update()
    messages[i].draw()

    if (messages[i].life > 50) {
      messages.splice(i, 1)
      i--
    }
  }
}

// 植物
class Defender {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = cellSize - cellGap * 2
    this.height = cellSize - cellGap * 2
    this.health = 100
    this.projectiles = []
    this.shooting = false
    this.shootNow = false
    this.shootRate = 50  // 越小越快

    this.defenderType = defenderTypes[0]
    this.frameX = 0
    this.frameY = 0
    this.minFrame = 0
    this.maxFrame = 1
    this.spriteWidth = 167
    this.spriteHeight = 243
  }

  update() {
    if (frame % this.shootRate === 0) {
      if (this.frameX < this.maxFrame) this.frameX++
      else this.frameX = this.minFrame

      // 张嘴的时候射击
      if (this.frameX === 1) this.shootNow = true
    }

    if (this.shooting && this.shootNow) {
      projectiles.push(new Projectile(this.x + 100, this.y + 45))
      this.shootNow = false
    }
  }

  draw() {
    // ctx.strokeStyle = 'green'
    // ctx.lineWidth = 3
    // ctx.strokeRect(this.x, this.y, this.width, this.height)

    // ctx.fillStyle = 'black'
    // ctx.font = '24px Orbitron'
    // ctx.fillText(Math.floor(this.health), this.x + 25, this.y + 55)

    ctx.drawImage(this.defenderType, this.frameX * this.spriteWidth, 0,
      this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
  }
}

canvas.addEventListener('click', () => {
  const gridPositionX = mouse.x - (mouse.x % cellSize) + cellGap
  const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap
  if (gridPositionY < cellSize) return;

  for (let i = 0; i < defenders.length; i++) {
    if (defenders[i].x === gridPositionX && defenders[i].y === gridPositionY) {
      messages.push(new Message('不能重叠', mouse.x, mouse.y, 28, 'red'))
      return
    }
  }

  let defenderCost = 100
  if (numOfResources >= defenderCost) {
    numOfResources -= defenderCost
    defenders.push(new Defender(gridPositionX, gridPositionY))
  } else {
    messages.push(new Message('资源不足', mouse.x, mouse.y, 28, 'red'))
  }
})

function handleDefenders() {
  for (let i = 0; i < defenders.length; i++) {
    defenders[i].draw()
    defenders[i].update()

    if (enemyPositions.indexOf(defenders[i].y) !== -1) {
      defenders[i].shooting = true
    } else {
      defenders[i].shooting = false
    }

    for (let j = 0; j < enemies.length; j++) {
      if (defenders[i] && collision(defenders[i], enemies[j])) {
        enemies[j].speed = 0
        defenders[i].health -= 0.2
      }

      if (defenders[i] && defenders[i].health <= 0) {
        defenders.splice(i, 1)
        i--
        enemies[j].speed = enemies[j].maxSpeed
      }
    }
  }
}

// 炮弹
class Projectile {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = 10
    this.height = 10
    this.power = 20
    this.speed = 3
  }

  update() {
    this.x += this.speed
  }

  draw() {
    ctx.fillStyle = 'green'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2)
    ctx.fill()
  }
}

function handleProjectiles() {
  for (let i = 0; i < projectiles.length; i++) {
    projectiles[i].update()
    projectiles[i].draw()

    for (let j = 0; j < enemies.length; j++) {
      if (projectiles[i] && enemies[j] && collision(projectiles[i], enemies[j])) {
        messages.push(new Message(`-${projectiles[i].power}`, enemies[j].x + 28, enemies[j].y - 8, 20, 'red'))
        enemies[j].health -= projectiles[i].power
        projectiles.splice(i, 1)
        i--
      }
    }

    if (projectiles[i] && projectiles[i].x > canvas.width) {
      projectiles.splice(i, 1)
      i--
    }
  }
}

// 僵尸
class Enemy {
  constructor(verticalPosition) {
    this.x = canvas.width
    this.y = verticalPosition
    this.width = cellSize - cellGap * 2
    this.height = cellSize - cellGap * 2
    this.speed = 0.3
    this.maxSpeed = this.speed
    this.health = 100
    this.maxHealth = this.health
    this.timer = 0

    this.enemyType = enemyTypes[0]
    this.frameX = 0
    this.frameY = 0
    this.minFrame = 0
    this.maxFrame = 7
    this.spriteWidth = 292
    this.spriteHeight = 410
  }

  update() {
    this.timer++
    this.x -= this.speed;
    if (this.timer % 200 == 0) {
      this.speed += 0.05
    }

    if (frame % 10 === 0) {
      if (this.frameX < this.maxFrame) this.frameX++
      else this.frameX = this.minFrame
    }
  }

  draw() {
    // ctx.strokeStyle = 'red'
    // ctx.lineWidth = 3
    // ctx.strokeRect(this.x, this.y, this.width, this.height)

    // ctx.fillStyle = 'black'
    // ctx.font = '20px Orbitron'
    // ctx.fillText(Math.floor(this.health), this.x + 32, this.y - 8)
    ctx.drawImage(this.enemyType, this.frameX * this.spriteWidth, 0,
      this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
  }
}

function handleEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update()
    enemies[i].draw()

    if (enemies[i].x <= 0) {
      gameOver = true;
    }

    if (enemies[i].health <= 0) {
      let initRainedResources = enemies[i].maxHealth / 5
      numOfResources += initRainedResources
      messages.push(new Message(`+${initRainedResources}`, 160, 35, 30, 'yellow'))
      score += initRainedResources
      enemyPositions.splice(enemyPositions.indexOf(enemies[i].y), 1)
      enemies.splice(i, 1)
      i--
    }
  }

  if (frame % enemiesInterval === 0 && score < winningScore) {
    let verticalPosition = Math.floor(Math.random() * 5 + 1) * cellSize + cellGap
    enemies.push(new Enemy(verticalPosition))
    enemyPositions.push(verticalPosition)
    if (enemiesInterval > 100) enemiesInterval -= 50
  }
}

// ☀️
const amounts = [20, 25, 30, 35, 40]
class Resource {
  constructor() {
    this.x = Math.random() * (canvas.width - cellSize)
    this.y = (Math.floor(Math.random() * 5) + 1) * cellSize + 25
    this.width = cellSize * 0.5
    this.height = cellSize * 0.5
    this.amount = amounts[Math.floor(Math.random() * amounts.length)]
  }

  draw() {
    ctx.fillStyle = 'yellow'
    ctx.fillRect(this.x, this.y, this.width, this.height)

    ctx.fillStyle = 'black'
    ctx.font = '20px Orbitron'
    ctx.fillText(this.amount, this.x + 12, this.y + 30)
  }
}

function handleResources() {
  if (frame % 500 === 0 && score < winningScore) {
    resources.push(new Resource())
  }

  for (let i = 0; i < resources.length; i++) {
    resources[i].draw()
    if (resources[i] && mouse.x && mouse.y && collision(resources[i], mouse)) {
      numOfResources += resources[i].amount
      messages.push(new Message(`+${resources[i].amount}`, 160, 35, 30, 'yellow'))
      resources.splice(i, 1)
      i--
    }
  }
}

// 工具函数
function handleGameStatus() {
  ctx.fillStyle = 'yellow'
  ctx.font = '30px Orbitron'
  ctx.fillText(`☀️: ${numOfResources}`, 20, 35)

  ctx.fillStyle = 'yellow'
  ctx.font = '30px Orbitron'
  ctx.fillText(`🉐: ${score}`, 20, 75)

  if (gameOver) {
    ctx.fillStyle = 'red'
    ctx.font = '300px Ma Shan Zheng'
    ctx.fillText('寄!', 280, 370)
    again_btn.style.visibility = "visible";
  }

  if (score >= winningScore && enemies.length === 0) {
    ctx.fillStyle = 'red'
    ctx.font = '300px Ma Shan Zheng'
    ctx.fillText('赢!', 280, 360)
    ctx.font = '120px Ma Shan Zheng'
    ctx.fillText(`得分: ${score}`, 250, 520)
    again_btn.style.visibility = "visible";
  }
}

window.addEventListener('resize', () => {
  canvasPosition = canvas.getBoundingClientRect()
})

function collision(first, second) {
  return (
    first.x < second.x + second.width &&
    first.x + first.width > second.x &&
    first.y < second.y + second.height &&
    first.y + first.height > second.y
  )
}

// 开始游戏
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = 'slateblue'
  ctx.fillRect(0, 0, controlsBar.width, controlsBar.height)

  handleGrid()
  handleResources()
  handleDefenders()
  handleProjectiles()
  handleEnemies()
  handleGameStatus()
  handleMessages()

  frame++
  if (!gameOver) requestAnimationFrame(animate)
}

start_btn.addEventListener('click', () => {
  start_btn.style.visibility = "hidden";
  startGame()
})

again_btn.addEventListener('click', () => {
  window.location.reload()
})

function startGame() {
  canvas.style.visibility = "visible"
  animate()
}



