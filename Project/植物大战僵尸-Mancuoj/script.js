const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')


// 全局变量
canvas.width = 900
canvas.height = 600

const cellSize = 100
const cellGap = 3
const winningScore = 1000

const gameGrid = []
const defenders = []
const projectiles = []
const enemies = []
const enemyPositions = []
const resources = []

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
    this.timer = 0
  }

  update() {
    if (this.shooting) {
      this.timer++;
      if (this.timer % 100 === 0) {
        projectiles.push(new Projectile(this.x + 100, this.y + 45))
      }
    } else {
      this.timer = 0
    }
  }

  draw() {
    ctx.strokeStyle = 'green'
    ctx.lineWidth = 3
    ctx.strokeRect(this.x, this.y, this.width, this.height)

    ctx.fillStyle = 'black'
    ctx.font = '25px Arial'
    ctx.fillText(Math.floor(this.health), this.x + 28, this.y + 55)
  }
}

canvas.addEventListener('click', () => {
  const gridPositionX = mouse.x - (mouse.x % cellSize) + cellGap
  const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap
  if (gridPositionY < cellSize) return;

  for (let i = 0; i < defenders.length; i++) {
    if (defenders[i].x === gridPositionX && defenders[i].y === gridPositionY) {
      return
    }
  }

  let defenderCost = 100
  if (numOfResources >= defenderCost) {
    numOfResources -= defenderCost
    defenders.push(new Defender(gridPositionX, gridPositionY))
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
    this.speed = 5
  }

  update() {
    this.x += this.speed
  }

  draw() {
    ctx.fillStyle = 'black'
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
    this.speed = 0.4
    this.maxSpeed = this.speed
    this.health = 100
    this.maxHealth = this.health
    this.timer = 0
  }

  update() {
    this.timer++
    this.x -= this.speed;
    if (this.timer % 500 == 0) {
      this.speed += 0.05
    }
  }

  draw() {
    ctx.strokeStyle = 'red'
    ctx.lineWidth = 3
    ctx.strokeRect(this.x, this.y, this.width, this.height)

    ctx.fillStyle = 'black'
    ctx.font = '25px Arial'
    ctx.fillText(Math.floor(this.health), this.x + 28, this.y + 55)
  }
}

function handleEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update()
    enemies[i].draw()

    if (enemies[i].x < 0) {
      gameOver = true;
    }

    if (enemies[i].health <= 0) {
      let initRainedResources = enemies[i].maxHealth / 5
      numOfResources += initRainedResources
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
    if (enemiesInterval > 120) enemiesInterval -= 50
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
    ctx.font = '25px Arial'
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
      resources.splice(i, 1)
      i--
    }
  }
}

// 工具函数
function handleGameStatus() {
  ctx.fillStyle = 'yellow'
  ctx.font = '30px Arial'
  ctx.fillText(`☀️: ${numOfResources}`, 20, 55)

  if (gameOver) {
    ctx.fillStyle = 'black'
    ctx.font = '200px Arial'
    ctx.fillText('菜！', 350, 350)
  }

  if (score >= winningScore && enemies.length === 0) {
    ctx.fillStyle = 'black'
    ctx.font = '120px Arial'
    ctx.fillText('赢！', 350, 350)
    ctx.font = '70px Arial'
    ctx.fillText(`分数：${score}`, 280, 450)
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

  ctx.fillStyle = 'blue'
  ctx.fillRect(0, 0, controlsBar.width, controlsBar.height)

  handleGrid()
  handleResources()
  handleDefenders()
  handleProjectiles()
  handleEnemies()
  handleGameStatus()

  frame++
  if (!gameOver) requestAnimationFrame(animate)
}
animate()



