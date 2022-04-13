/*
 * @Author: 一尾流莺
 * @Description:游戏控制类
 * @Date: 2021-10-19 17:14:43
 * @LastEditTime: 2021-10-28 18:48:33
 * @FilePath: \warbler-games\贪吃蛇\src\game\GameControl.ts
 */

import { IsLive, Map } from '@/types';
import { addTicker, intervalTimer, stopTicker } from '@/utils';
import { Food } from './Food';
import { render, reset } from './render';
import { Snake } from './Snake';

export class GameControl {
  // 蛇
  snake: Snake;
  // 食物
  private _food: Food;
  // 地图
  private _map: Map;
  // 游戏状态
  private _isLive: IsLive;

  constructor(map: Map, isLive: IsLive) {
    this._map = map;
    this.snake = new Snake();
    this._food = new Food();
    this._isLive = isLive;
  }
  // 开始游戏
  start() {
    // 绑定键盘按键按下的事件
    document.addEventListener('keydown', this.keydownHandler.bind(this));
    // 添加到帧循环列表
    addTicker(this.handlerTicker.bind(this));
    // 标记游戏状态为开始
    this._isLive.value = 2;
  }
  // 创建一个键盘按下的响应函数
  keydownHandler(event: KeyboardEvent) {
    this.snake.direction = event.key;
  }
  // 渲染map
  private _timeInterval = 200;
  // 是否移动蛇
  private _isMove = intervalTimer(this._timeInterval);
  // 定义帧循环函数
  handlerTicker(n: number) {
    if (this._isMove(n)) {
      try {
        this.snake.move(this._food);
      } catch (error: any) {
        // 标记游戏状态为结束
        this._isLive.value = 3;
        // 停止循环
        stopTicker();
      }
    }
    render(this._map, this.snake, this._food);
  }
  // 重新开始游戏
  replay() {
    reset(this._map);
    this.snake.direction = 'Right';
    this.snake = new Snake();
    this._food = new Food();
    this._isLive.value = 2;
    stopTicker();
    addTicker(this.handlerTicker.bind(this));
  }
}
