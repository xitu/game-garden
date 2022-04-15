/*
 * @Author: 一尾流莺
 * @Description:rem布局 响应式
 * @Date: 2021-10-21 19:17:43
 * @LastEditTime: 2021-10-21 19:31:37
 * @FilePath: \greedySnake\src\utils\rem.ts
 */
export function setRem() {
  const doc = document.documentElement;
  const event = 'orientationchange' in window ? 'orientationchange' : 'resize';
  const reset = () => {
    const width = doc.clientWidth;
    if (width) {
      doc.style.fontSize = width >= 750 ? '100px' : (width / 750) * 100 + 'px';
    }
  };
  window.addEventListener(event, reset, false);
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', reset, false);
  }
}
