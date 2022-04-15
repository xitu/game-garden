/*
 * @Author: 一尾流莺
 * @Description:蛇类 -1 食物 1 蛇身体 2 蛇头
 * @Date: 2021-10-19 17:14:52
 * @LastEditTime: 2021-10-28 19:05:19
 * @FilePath: \warbler-games\贪吃蛇\src\game\Snake.ts
 */

import { SnakeBodies, SnakeHead } from '@/types';
import { Food } from './Food';
import { hitFence, hitSelf } from './hit';

export class Snake {
  bodies: SnakeBodies;
  head: SnakeHead;
  // 创建一个属性来存储蛇的移动方向（也就是按键的方向）
  direction: string;
  constructor() {
    this.direction = 'Right';
    this.head = {
      x: 1,
      y: 0,
      status: 2,
    };
    this.bodies = [
      {
        x: 0,
        y: 0,
        status: 1,
      },
    ];
  }
  // 定义一个方法，用来检查蛇是否吃到食物
  checkEat(food: Food) {
    if (this.head.x === food.x && this.head.y === food.y) {
      // 分数增加
      // this.scorePanel.addScore();
      // 食物的位置要进行重置
      food.change(this);
      // 蛇要增加一节
      this.bodies.unshift({
        x: food.x,
        y: food.y,
        status: 1,
      });
    }
  }
  // 控制蛇移动
  move(food: Food) {
    // 判断是否游戏结束
    if (hitFence(this.head, this.direction) || hitSelf(this.head, this.bodies)) {
      throw new Error('游戏结束');
    }
    const headX = this.head.x;
    const headY = this.head.y;
    const bodyX = this.bodies[this.bodies.length - 1].x;
    const bodyY = this.bodies[this.bodies.length - 1].y;
    switch (this.direction) {
      case 'ArrowUp':
      case 'Up':
        // 向上移动 需要检测按键是否相反方向
        if (headY - 1 === bodyY && headX === bodyX) {
          moveDown(this.head, this.bodies);
          this.direction = 'Down';
          return;
        }
        moveUp(this.head, this.bodies);
        break;
      case 'ArrowDown':
      case 'Down':
        // 向下移动 需要检测按键是否相反方向
        if (headY + 1 === bodyY && headX === bodyX) {
          moveUp(this.head, this.bodies);
          this.direction = 'Up';
          return;
        }
        moveDown(this.head, this.bodies);
        break;
      case 'ArrowLeft':
      case 'Left':
        // 向左移动 需要检测按键是否相反方向
        if (headY === bodyY && headX - 1 === bodyX) {
          moveRight(this.head, this.bodies);
          this.direction = 'Right';
          return;
        }
        moveLeft(this.head, this.bodies);
        break;
      case 'ArrowRight':
      case 'Right':
        // 向右移动 需要检测按键是否相反方向
        if (headY === bodyY && headX + 1 === bodyX) {
          moveLeft(this.head, this.bodies);
          this.direction = 'Left';
          return;
        }
        moveRight(this.head, this.bodies);
        break;
      default:
        break;
    }
    // 检查蛇是否吃到食物
    this.checkEat(food);
  }
  // 移动端修改移动方向
  changeMoveDirection(clickX, clickY) {
    // 根据点击的位置和蛇头的相对位置,进行方向的改变
    if (clickY < this.head.x && this.direction !== 'Left' && this.direction !== 'Right') {
      this.direction = 'Left';
      return;
    }
    if (clickY > this.head.x && this.direction !== 'Left' && this.direction !== 'Right') {
      this.direction = 'Right';
      return;
    }
    if (clickX < this.head.y && this.direction !== 'Up' && this.direction !== 'Down') {
      this.direction = 'Up';
      return;
    }
    if (clickX > this.head.y && this.direction !== 'Up' && this.direction !== 'Down') {
      this.direction = 'Down';
      return;
    }
  }
  changeDirection(direction: string) {
    if (direction === 'Left' && this.direction !== 'Left' && this.direction !== 'Right') {
      this.direction = 'Left';
      return;
    }
    if (direction === 'Right' && this.direction !== 'Left' && this.direction !== 'Right') {
      this.direction = 'Right';
      return;
    }
    if (direction === 'Up' && this.direction !== 'Up' && this.direction !== 'Down') {
      this.direction = 'Up';
      return;
    }
    if (direction === 'Down' && this.direction !== 'Up' && this.direction !== 'Down') {
      this.direction = 'Down';
      return;
    }
  }
}

// 向上移动
function moveUp(head: SnakeHead, bodies: SnakeBodies) {
  head.y--;
  bodies.push({
    x: head.x,
    y: head.y + 1,
    status: 1,
  });
  bodies.shift();
}

// 向下移动
function moveDown(head: SnakeHead, bodies: SnakeBodies) {
  head.y++;
  bodies.push({
    x: head.x,
    y: head.y - 1,
    status: 1,
  });
  bodies.shift();
}

// 向右移动
function moveRight(head: SnakeHead, bodies: SnakeBodies) {
  head.x++;
  bodies.push({
    x: head.x - 1,
    y: head.y,
    status: 1,
  });
  bodies.shift();
}

// 向左移动
function moveLeft(head: SnakeHead, bodies: SnakeBodies) {
  head.x--;
  bodies.push({
    x: head.x + 1,
    y: head.y,
    status: 1,
  });
  bodies.shift();
}
