/*
 * @Author: 一尾流莺
 * @Description:game下所有文件的总出口
 * @Date: 2021-10-14 16:03:52
 * @LastEditTime: 2021-10-28 18:46:36
 * @FilePath: \warbler-games\贪吃蛇\src\game\index.ts
 */

import { IsLive, Map } from '@/types';
import { GameControl } from './GameControl';
import { initMap } from './map';

let gameControl: GameControl;

// 初始化游戏
export function initGame(map: Map, isLive: IsLive) {
  gameControl = new GameControl(initMap(map), isLive);
}

// 开始游戏
export function startGame() {
  gameControl.start();
}

// 重新开始游戏
export function replayGame() {
  gameControl.replay();
}

// 移动端修改移动方向
export function changeMoveDirection(x: number, y: number) {
  gameControl.snake.changeMoveDirection(x, y);
}

// 移动端修改移动方向
export function changeDirection(direction: string) {
  gameControl.snake.changeDirection(direction);
}
