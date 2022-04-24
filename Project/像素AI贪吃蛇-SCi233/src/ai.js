import { DIRECTION, INVALID_DIRECTION } from './snake/index.js'

import { search } from './aStar.js'
import { getRandomInt, shuffle } from './utils.js'

/** 0: accessible, 1: not accessible */
const ENTITY_TYPES = {
  MAP_WALL: 1,
  MAP_EMPTY: 0,
  SNAKE: 1,
  FOOD: 0
}

/**
 * transform map, snake and food to 2d array
 * @param {GameMap} gameMap
 * @param {Snake} snake
 * @param {Food} food
 */
const serializeEntities = (gameMap, snake, food) => {
  const { rowNums, colNums } = gameMap
  const arr = Array(rowNums + 2)
  for (let i = 0; i < rowNums + 2; i++) {
    arr[i] = Array(colNums + 2)
    if (i === 0 || i === rowNums + 1) {
      arr[i].fill(ENTITY_TYPES.MAP_WALL)
    } else {
      arr[i].fill(ENTITY_TYPES.MAP_EMPTY)
      arr[i][0] = arr[i][colNums + 1] = ENTITY_TYPES.MAP_WALL
    }
  }

  snake.forEach(el => {
    arr[el.y][el.x] = ENTITY_TYPES.SNAKE
  })
  const { x: tailX, y: tailY } = snake.getTail()
  arr[tailY][tailX] = ENTITY_TYPES.MAP_EMPTY

  arr[food.y][food.x] = ENTITY_TYPES.FOOD
  return arr
}

/** direction, [y, x, dir][] */
const _dir = [
  [-1, 0, DIRECTION.UP],
  [0, 1, DIRECTION.RIGHT],
  [1, 0, DIRECTION.DOWN],
  [0, -1, DIRECTION.LEFT]
]

const _getHeadNeighborInfos = (grid, head, tail, food, isTailAccessible) => {
  const { x: headX, y: headY } = head
  const { x: tailX, y: tailY } = tail
  const { x: foodX, y: foodY } = food
  const neighbors = _dir.map(([yOffset, xOffset, dir]) => ({
    x: headX + xOffset,
    y: headY + yOffset,
    dir,
    /** length of path to snake tail */
    tailPathLen: -1,
    /** length of path to food */
    foodPathLen: -1
  }))
  neighbors.forEach(el => {
    if (el.x < 0 || el.y < 0 || el.x >= grid.length || el.y >= grid[0].length ||
      grid[el.y][el.x] === 1) {
      return
    }

    if (!isTailAccessible && el.x === tailX && el.y === tailY) {
      return
    }

    const tailPath = search(el.x, el.y, tailX, tailY, grid)
    if (tailPath) {
      el.tailPathLen = tailPath.length - 1
    }
    const foodPath = search(el.x, el.y, foodX, foodY, grid)
    if (foodPath) {
      el.foodPathLen = foodPath.length - 1
    }
  })
  return neighbors
  // const result = neighbors.filter(el => el.tailPathLen !== -1);
  // console.log('neighbors', result);
  // return result;
}

let callCnt = 0

export const getNextDirection = (gameMap, snake, food, isTailAccessible) => {
  if (callCnt++ > 16) {
    shuffle(_dir)
    callCnt = 0
  }
  const grid = serializeEntities(gameMap, snake, food)
  // console.log(grid);
  const neighborInfos = _getHeadNeighborInfos(grid, snake.getHead(), snake.getTail(), food, isTailAccessible).filter(el => el.tailPathLen !== -1)
  if (snake.length === (gameMap.colNums * gameMap.rowNums - 1)) {
    const target = neighborInfos.find(el => el.x === food.x && el.y === food.y)
    if (target) {
      return target.dir
    }
  } else if (neighborInfos.length === 0) {
    const randomDir = [DIRECTION.UP, DIRECTION.RIGHT, DIRECTION.DOWN, DIRECTION.LEFT]
      .filter(el => el !== INVALID_DIRECTION[snake.direction])[getRandomInt(0, 3)]
    // console.log('random', randomDir, snake.direction);
    return randomDir
  } else {
    let sameDirectionItem
    let minFoodPathLenItem
    let maxTailPathLenItem
    const canGotoTailPositions = neighborInfos.filter(el => el.tailPathLen !== -1)
    for (const info of canGotoTailPositions) {
      if (info.dir === snake.direction) {
        sameDirectionItem = info
      }
      if (info.foodPathLen !== -1 && (!minFoodPathLenItem || info.foodPathLen < minFoodPathLenItem.foodPathLen)) {
        minFoodPathLenItem = info
      }
      if (info.tailPathLen !== -1 && (!maxTailPathLenItem || info.tailPathLen > maxTailPathLenItem.tailPathLen)) {
        maxTailPathLenItem = info
      }
    }
    let result
    if (sameDirectionItem) {
      if (sameDirectionItem === minFoodPathLenItem) {
        result = sameDirectionItem.dir
      } else if (maxTailPathLenItem && snake.length > (gameMap.colNums * gameMap.rowNums / 2)) {
        result = maxTailPathLenItem.dir
      } else if (minFoodPathLenItem && minFoodPathLenItem.foodPathLen <= grid.length / 2) {
        result = minFoodPathLenItem.dir
      } else {
        result = sameDirectionItem.dir
      }
    } else {
      if (maxTailPathLenItem) {
        result = maxTailPathLenItem.dir
      } else if (minFoodPathLenItem) {
        result = minFoodPathLenItem.dir
      } else {
        result = canGotoTailPositions[getRandomInt(0, canGotoTailPositions.length - 1)].dir
      }
    }
    // console.log(result, snake.direction);
    return result
  }
}
