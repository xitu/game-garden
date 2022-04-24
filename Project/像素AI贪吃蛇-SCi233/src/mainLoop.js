const LOOP_STATUS = {
  RUNNING: 0,
  PAUSED: 1,
  STOPPED: 2
}

export class MainLoop {
  loopStatus = LOOP_STATUS.PAUSED;

  onLoop;

  lastTimeStamp;

  setOnLoop (onLoop) {
    this.onLoop = onLoop
  }

  loop (timestamp) {
    const elapsed = timestamp - this.lastTimeStamp
    this.lastTimeStamp = timestamp
    this.onLoop && this.onLoop(elapsed)
    window.requestAnimationFrame(this.loop.bind(this))
  }

  start () {
    if (this.loopStatus === LOOP_STATUS.PAUSED) {
      this.loopStatus = LOOP_STATUS.RUNNING

      this.lastTimeStamp = window.performance.now()
      window.requestAnimationFrame(this.loop.bind(this))
    }
  }

  pause () {
    if (this.loopStatus === LOOP_STATUS.RUNNING) {
      this.loopStatus = LOOP_STATUS.PAUSED
    }
  }

  stop () {
    if (this.loopStatus !== LOOP_STATUS.STOPPED) {
      this.loopStatus = LOOP_STATUS.STOPPED
    }
  }
}
