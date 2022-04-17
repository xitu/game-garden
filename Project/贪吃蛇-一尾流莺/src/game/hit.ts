/*
 * @Author: 一尾流莺
 * @Description:碰撞逻辑
 * @Date: 2021-10-19 18:48:22
 * @LastEditTime: 2021-10-21 18:44:04
 * @FilePath: \greedySnake\src\game\hit.ts
 */

import { SnakeBodies, SnakeHead } from '@/types';
import { gameCol, gameRow } from './map';

// 蛇头是否触碰到边界
export function hitFence(head: SnakeHead, direction: string) {
  // 1.获取蛇头的位置
  // 2.检测蛇头是不是超出了游戏的范围
  let isHitFence = false;
  switch (direction) {
    case 'ArrowUp':
    case 'Up':
      // 向上移动
      isHitFence = head.y - 1 < 0;
      break;
    case 'ArrowDown':
    case 'Down':
      // 向下移动   因为head.y是从0开始的 gameRow是从1开始的 所以gameRow要-1
      isHitFence = head.y + 1 > gameRow - 1;
      break;
    case 'ArrowLeft':
    case 'Left':
      // 向左移动
      isHitFence = head.x - 1 < 0;
      break;
    case 'ArrowRight':
    case 'Right':
      // 向右移动
      isHitFence = head.x + 1 > gameCol - 1;
      break;
    default:
      break;
  }
  return isHitFence;
}

// 蛇头是否触碰到自己
export function hitSelf(head: SnakeHead, bodies: SnakeBodies) {
  // 1.获取蛇头的坐标
  const x = head.x;
  const y = head.y;
  // 2.获取身体
  const snakeBodies = bodies;
  // 3.检测蛇头是不是撞到了自己,也就是蛇头的下一步移动会不会和身体数组的元素重复
  const isHitSelf = snakeBodies.some((body) => {
    return body.x === x && body.y === y;
  });
  return isHitSelf;
}
