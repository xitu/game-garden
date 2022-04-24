import { MainLoop } from './mainLoop.js'
import { Renderer } from './renderer.js'
import { Keyboard } from './keyboard.js'

import { GameMap } from './gameMap.js'
import { Snake, DIRECTION } from './snake/index.js'
import { Food, TYPE as FOODTYPE } from './food.js'
import { ResultText } from './resultText.js'

import { getRandomInt, isTouchable } from './utils.js'
import { getNextDirection } from './ai.js'

const ROW_NUM = 10
const COL_NUM = 10
const PIXEL_SIZE = 4

const mainLoop = new MainLoop()

const canvas = document.querySelector('#main-canvas')
const statusBar = document.querySelector('#status-bar')
const toolBar = document.querySelector('#tool-bar')
const ctrlBar = document.querySelector('#ctrl-bar')
const tipsBar = document.querySelector('#tips-bar')
const btnPause = document.querySelector('#btn-pause')
const btnRestart = document.querySelector('#btn-restart')
const btnAI = document.querySelector('#btn-ai')
const btnJoystickUp = document.querySelector('#btn-joystick-up')
const btnJoystickLeft = document.querySelector('#btn-joystick-left')
const btnJoystickRight = document.querySelector('#btn-joystick-right')
const btnJoystickDown = document.querySelector('#btn-joystick-down')
const btnDash = document.querySelector('#btn-dash')

canvas.width = PIXEL_SIZE * 8 * (COL_NUM + 2)
statusBar.style.width = canvas.width + 'px'
ctrlBar.style.width = canvas.width + 'px'
toolBar.style.width = canvas.width + 'px'
tipsBar.style.width = canvas.width + 'px'

canvas.height = PIXEL_SIZE * 8 * (ROW_NUM + 2)

if (isTouchable()) {
  ctrlBar.classList.remove('hidden')
} else {
  tipsBar.classList.remove('hidden')
}

const setStatusText = (snakeLength) => {
  statusBar.innerHTML = `Length: ${snakeLength}`
}

const renderer = new Renderer(canvas)

const resultText = new ResultText(0, (ROW_NUM + 2) * PIXEL_SIZE * 8 / 4, {
  width: (COL_NUM + 2) * PIXEL_SIZE * 8,
  height: (ROW_NUM + 2) * PIXEL_SIZE * 8 / 2,
  text: ''
})
resultText.visible = false

const gameMap = new GameMap({
  x: 0,
  y: 0,
  rowNums: ROW_NUM,
  colNums: COL_NUM,
  pixelSize: PIXEL_SIZE
})

let snake = new Snake({
  length: 3,
  rowNums: ROW_NUM,
  colNums: COL_NUM,
  pixelSize: PIXEL_SIZE
})
snake.onStatusChanged(setStatusText)
setStatusText(snake.length, snake.speed)

const generateFoodXY = () => {
  let x, y
  do {
    x = getRandomInt(0, gameMap.colNums) + 1
    y = getRandomInt(0, gameMap.rowNums) + 1
  } while (snake.includes(x, y))

  return [x, y]
}

const food = new Food(...generateFoodXY(), PIXEL_SIZE, FOODTYPE.CHERRY)

const AI = (options) => {
  const { isTailAccessible } = options
  return getNextDirection(gameMap, snake, food, isTailAccessible)
}

const update = (elapsed) => {
  gameMap.update()
  food.update()
  if (snake.length === COL_NUM * ROW_NUM) {
    if (!resultText.visible) {
      resultText.text = 'You Win!'
      resultText.textColor = 'Green'
      resultText.visible = true
    }
  } else if (!snake.isDead()) {
    snake.update(elapsed)
    if (snake.isEat(food)) {
      snake.grow()
      snake.speedUp()
      if (snake.length < COL_NUM * ROW_NUM) {
        [food.x, food.y] = generateFoodXY()
        food.type = [FOODTYPE.APPLE, FOODTYPE.CHERRY, FOODTYPE.BANANA, FOODTYPE.WATERMELON][getRandomInt(0, 4)]
      } else {
        food.visible = false
      }
    }
  } else {
    btnPause.setAttribute('disabled', 'disabled')
    resultText.text = 'YOU DIED'
    resultText.textColor = 'Red'
    resultText.visible = true
  }
}

const draw = () => {
  renderer.clear('DarkSeaGreen')
  gameMap.visible && gameMap.draw(renderer)
  food.visible && food.draw(renderer)
  snake.visible && snake.draw(renderer)
  resultText.visible && resultText.draw(renderer)
}

const keyW = new Keyboard('KeyW')
const keyD = new Keyboard('KeyD')
const keyS = new Keyboard('KeyS')
const keyA = new Keyboard('KeyA')
const keyArrowUp = new Keyboard('ArrowUp')
const keyArrowRight = new Keyboard('ArrowRight')
const keyArrowLeft = new Keyboard('ArrowLeft')
const keyArrowDown = new Keyboard('ArrowDown')
const keySpace = new Keyboard('Space')

const checkInput = () => {
  if (keyW.isPressed() || keyArrowUp.isPressed()) {
    snake.changeDirection(DIRECTION.UP)
  } else if (keyD.isPressed() || keyArrowRight.isPressed()) {
    snake.changeDirection(DIRECTION.RIGHT)
  } else if (keyS.isPressed() || keyArrowDown.isPressed()) {
    snake.changeDirection(DIRECTION.DOWN)
  } else if (keyA.isPressed() || keyArrowLeft.isPressed()) {
    snake.changeDirection(DIRECTION.LEFT)
  } else if (keySpace.isPressed()) {
    snake.dash()
  }
}

btnJoystickUp.addEventListener('mousedown', () => {snake.changeDirection(DIRECTION.UP) })
btnJoystickUp.addEventListener('touchstart', () => { snake.changeDirection(DIRECTION.UP) })
btnJoystickRight.addEventListener('mousedown', () => { snake.changeDirection(DIRECTION.RIGHT) })
btnJoystickRight.addEventListener('touchstart', () => { snake.changeDirection(DIRECTION.RIGHT) })
btnJoystickDown.addEventListener('mousedown', () => { snake.changeDirection(DIRECTION.DOWN) })
btnJoystickDown.addEventListener('touchstart', () => { snake.changeDirection(DIRECTION.DOWN) })
btnJoystickLeft.addEventListener('mousedown', () => { snake.changeDirection(DIRECTION.LEFT) })
btnJoystickLeft.addEventListener('touchstart', () => { snake.changeDirection(DIRECTION.LEFT) })
btnDash.addEventListener('mousedown', () => { snake.dash() })
btnDash.addEventListener('touchstart', () => { snake.dash() })

let isPaused = false
let isEnableAI = false

const restart = () => {
  snake = new Snake({
    length: 3,
    rowNums: ROW_NUM,
    colNums: COL_NUM,
    pixelSize: PIXEL_SIZE
  })
  snake.onStatusChanged(setStatusText)
  setStatusText(snake.length, snake.speed);
  [food.x, food.y] = generateFoodXY()
  food.type = [FOODTYPE.APPLE, FOODTYPE.CHERRY, FOODTYPE.BANANA, FOODTYPE.WATERMELON][getRandomInt(0, 4)]
  food.visible = true

  if (isEnableAI) {
    snake.beforeMove = AI
  }

  resultText.text = ''
  resultText.visible = false
}

btnRestart.addEventListener('click', () => {
  restart()
  btnPause.removeAttribute('disabled')
  btnRestart.blur()
})

btnPause.addEventListener('click', () => {
  isPaused = !isPaused
  if (isPaused) {
    btnRestart.setAttribute('disabled', 'disabled')
    btnPause.innerHTML = 'Resume'
    resultText.text = 'Paused'
    resultText.textColor = 'White'
    resultText.visible = true
  } else {
    btnRestart.removeAttribute('disabled')
    btnPause.innerHTML = 'Pause'
    resultText.text = ''
    resultText.visible = false
  }
  btnPause.blur()
})

btnAI.addEventListener('click', () => {
  isEnableAI = !isEnableAI
  if (isEnableAI) {
    snake.beforeMove = AI
    btnAI.classList.add('btn-ctrl-enable')
  } else {
    snake.beforeMove = null
    btnAI.classList.remove('btn-ctrl-enable')
  }
  btnAI.blur()
})

const main = () => {
  mainLoop.setOnLoop((elapsed) => {
    if (!isPaused) {
      checkInput()
      update(elapsed)
    }
    draw()
  })
  mainLoop.start()
}

main()
