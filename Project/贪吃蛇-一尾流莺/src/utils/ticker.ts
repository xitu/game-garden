/*
 * @Author: 一尾流莺
 * @Description:帧循环
 * @Date: 2021-10-14 19:19:53
 * @LastEditTime: 2021-10-22 18:47:57
 * @FilePath: \warbler-games\贪吃蛇\src\utils\ticker.ts
 */

let startTime = Date.now();
type Ticker = Function;
let tickers: Array<Ticker> = [];

const handleFrame = () => {
  tickers.forEach((ticker) => {
    ticker(Date.now() - startTime);
  });
  startTime = Date.now();
  requestAnimationFrame(handleFrame);
};

requestAnimationFrame(handleFrame);

export function addTicker(ticker: Ticker) {
  tickers.push(ticker);
}

export function stopTicker() {
  tickers = [];
}
