export class Item {
  constructor (value, code) {
    this.value = value
    this.code = code
  }
}

export class PriorityQueue {
  constructor (arr) {
    this.heap = []
    if (arr && arr.length) {
      this._initHeap(arr)
    }
  }

  enqueue (item) {
    this.heap.push(item)
    this.moveUp(this.heap.length - 1)
  }

  dequeue () {
    const { heap } = this
    const top = heap.shift()
    if (!this.isEmpty()) {
      const last = heap.pop()
      heap.unshift(last)
      this.moveDown(0)
    }
    return top
  }

  isEmpty () {
    return this.heap.length === 0
  }

  top () {
    return this.heap[0]
  }

  find (cb) {
    const { heap } = this
    for (let i = 0; i < heap.length; ++i) {
      if (cb(heap[i])) {
        return heap[i]
      }
    }
    return null
  }

  findIndex (cb) {
    const { heap } = this
    for (let i = 0; i < heap.length; ++i) {
      if (cb(heap[i])) {
        return i
      }
    }
    return -1
  }

  toString () {
    return this.heap.map(item => item.value).join(', ')
  }

  swap (i, j) {
    const { heap } = this;
    [heap[i], heap[j]] = [heap[j], heap[i]]
  }

  moveUp (index) {
    const { heap } = this
    while (index !== 0) {
      const parent = Math.floor((index - 1) / 2)
      if (heap[index].code < heap[parent].code) {
        this.swap(parent, index)
        index = parent
      } else {
        break
      }
    }
  }

  moveDown (index) {
    const { heap } = this
    const lastNoLeaf = Math.floor((heap.length - 2) / 2)
    while (index <= lastNoLeaf) {
      const left = heap[index * 2 + 1]
      const right = heap[index * 2 + 2] || left
      const max = left.code <= right.code ? left : right
      const maxIndex = left.code <= right.code ? index * 2 + 1 : index * 2 + 2
      if (max.code < heap[index].code) {
        this.swap(maxIndex, index)
        index = maxIndex
      } else {
        break
      }
    }
  }

  _initHeap (arr) {
    const { heap } = this
    heap.push(arr[0])
    for (let i = 1; i < arr.length; ++i) {
      heap.unshift(arr[i])
      this.moveDown(0)
    }
  }
}
