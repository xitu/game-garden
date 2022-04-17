/*
 * @Author: 一尾流莺
 * @Description:食物类
 * @Date: 2021-10-19 17:14:57
 * @LastEditTime: 2021-10-22 19:28:40
 * @FilePath: \warbler-games\贪吃蛇\src\game\Food.ts
 */
import { randomIntegerInRange } from '@/utils';
import { gameCol, gameRow } from './map';
import { Snake } from './Snake';

export class Food {
  // 食物的坐标
  x: number;
  y: number;
  status = -1;
  constructor() {
    this.x = randomIntegerInRange(0, gameCol - 1);
    this.y = randomIntegerInRange(0, gameRow - 1);
  }
  // 修改食物的位置
  change(snake: Snake) {
    // 生成一个随机的位置
    const newX = randomIntegerInRange(0, gameCol - 1);
    const newY = randomIntegerInRange(0, gameRow - 1);
    // 1.获取蛇头的坐标
    const x = snake.head.x;
    const y = snake.head.y;
    // 2.获取身体
    const bodies = snake.bodies;
    // 3.食物不可以和头部以及身体重合
    const isRepeatBody = bodies.some((body) => {
      return body.x === newX && body.y === newY;
    });
    const isRepeatHead = newX === x && newY === y;
    // 不满足条件重新随机
    if (isRepeatBody || isRepeatHead) {
      this.change(snake);
    } else {
      this.x = newX;
      this.y = newY;
    }
  }
}
