/**
 * 事件总线 (发布订阅者模式)
 */
class Bus {
  /**
   * 事件容器
   */
  eventList: {
    [key: string]: Array<Function>
  };
  // 事件中心
  constructor() {
    this.eventList = {}
  };

  /**
   * 添加订阅
   * @param name 添加订阅的事件名称
   * @param fn 添加订阅的执行方法
   */
  $on(name: string, fn:Function) {
    this.eventList[name] = this.eventList[name] || [];
    this.eventList[name].push(fn);
  };

  /**
   * 发布事件(通知订阅)
   * @param name 被通知的订阅的名称
   * @param data 通知时候携带的参数
   */
  $emit(name: string, data?: any) {
    if (this.eventList[name]) {
      this.eventList[name].forEach((fn: Function) => {
        fn(data)
      })
    }
  };

  /**
   * 取消订阅
   * @param name 取消订阅的事件名称
   */
  $off(name: string) {
    if (this.eventList[name]) {
      delete this.eventList[name]
    }
  }
}

export default new Bus();