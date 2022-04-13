/*
 * @Author: 一尾流莺
 * @Description:渲染视图的逻辑
 * @Date: 2021-10-14 18:32:51
 * @LastEditTime: 2021-10-21 19:02:21
 * @FilePath: \greedySnake\src\game\render.ts
 */

import { Map, SnakeBodies, SnakeHead } from '@/types';
import { Food } from './Food';
import { Snake } from './Snake';

// 每一次渲染都需要将map重置,然后再进行新数据的渲染
export function render(map: Map, snake: Snake, food: Food) {
  // 重置map
  reset(map);
  // 渲染蛇头
  _renderSnakeHead(map, snake.head);
  // 渲染蛇身
  _renderSnakeBody(map, snake.bodies);
  // 渲染食物
  _renderFood(map, food);
}

// 重置map 将二维数组所有元素重置为0
export function reset(map: Map) {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] !== 0) {
        map[i][j] = 0;
      }
    }
  }
}

// 渲染蛇身 -1 食物 1 蛇身体 2 蛇头
function _renderSnakeBody(map: Map, bodies: SnakeBodies) {
  for (let i = 0; i < bodies.length; i++) {
    const row = bodies[i].y;
    const col = bodies[i].x;
    map[row][col] = 1;
  }
}

// 渲染蛇头 -1 食物 1 蛇身体 2 蛇头
function _renderSnakeHead(map: Map, head: SnakeHead) {
  const row = head.y;
  const col = head.x;
  map[row][col] = 2;
}

// 渲染食物 -1 食物 1 蛇身体 2 蛇头
function _renderFood(map: Map, food: Food) {
  const row = food.y;
  const col = food.x;
  map[row][col] = -1;
}
