/*
 * @Author: 一尾流莺
 * @Description:工具函数
 * @Date: 2021-10-19 17:27:20
 * @LastEditTime: 2021-10-21 18:05:31
 * @FilePath: \greedySnake\src\utils\index.ts
 */

export * from './ticker';

// 时间累加器
export function intervalTimer(interval: number) {
  let t = 0;
  return (n: number) => {
    t += n;
    if (t >= interval) {
      t = 0;
      return true;
    }
    return false;
  };
}

// 生成随机数
export const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
