<!--
 * @Author: 掘金：十里青山
 * @Date: 2022-04-05 20:42:20
 * 公众号：百里青山
 * @LastEditors: 掘金：十里青山
 * @LastEditTime: 2022-04-12 23:40:55
 * @Descripttion: 
-->
<template>
  <div class="stage-wrap">
    <!-- 规则及守关运营区 -->
    <rule-wrap :stage="3" @begin="begin"></rule-wrap>
    <!-- 游戏区 -->
    <div class="game-wrap" v-show="round">
      <div class="user-wrap">
        <div class="author" :class="{ active: !yourTime }">
          <img src="../assets/img/captain.jpg" alt="" />
        </div>
        <div class="user-info">
          <div class="username">船长</div>
          <div class="result-list">
            <div class="result-list">
              <div
                class="result-item"
                :class="{ active: item }"
                v-for="(item, key) in operateResultList"
                :key="key"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-list">
        <div
          class="card-item"
          :class="{
            show: item.show,
            rotate: item.rotate,
            success: item.status === 'success',
            fail: item.status === 'fail',
          }"
          v-for="(item, key) in cardList"
          :key="key"
          @click="checkCard(item, 'user')"
        >
          <div class="card-text" v-show="item.status">
            {{ item.key === 'success' ? '藏宝图' : '空' }}
          </div>
        </div>
      </div>
      <div class="user-wrap self-wrap">
        <div class="user-info">
          <div class="username">You</div>
          <div class="result-list">
            <div class="result-list">
              <div
                class="result-item"
                :class="{ active: item }"
                v-for="(item, key) in selfResultList"
                :key="key"
              ></div>
            </div>
          </div>
        </div>
        <div class="author" :class="{ active: yourTime }">
          <img src="../assets/img/user.jpg" alt="" />
        </div>
      </div>
    </div>
    <!-- 结果弹窗 -->
    <result-log :status="status" :isEnd="round >= 5" @goOn="goOn"></result-log>
  </div>
</template>

<script>

export default {
  name: '',
  data () {
    return {
      operateResultList: [],
      selfResultList: [],
      canClick: false,
      yourTime: true,
      round: 0,
      status: '',
      cardList: []
    }
  },
  mounted () {
    
  },
  methods: {
    begin () {
      this.reset()
    },
    goOn () {
      if (this.round >= 5) {
        this.$emit('changeSage', 4)
      } else {
        this.status = ''
        this.yourTime = true
        this.reset()
      }
    },
    reset () {
      this.round++
      this.cardList = []
      for (let index = 0; index < 6; index++) {
        this.cardList.push({
          key: 'error',
          rotate: false,
          show: false,
          status: ''
        })
      }
      let index = 0
      let interval = setInterval(() => {
        if (index < 6) {
          this.cardList[index].show = true
          index++
        } else {
          clearInterval(interval)
          let random = Math.floor(Math.random() * 6)
          this.cardList[random].key = 'success'
          this.canClick = true
        }
      }, 300)
    },
    // 检查卡片
    checkCard (item, type) {
      if (!this.canClick && type === 'user') {
        return
      }
      item.rotate = true
      this.canClick = false
      // 判断是否找到了宝藏
      if (item.key === 'success') {
        setTimeout(() => {
          item.status = 'success'
        }, 500)
        setTimeout(() => {
          // 判断找到的人是不是自己
          if (type === 'user') {
            this.status = 'success'
            this.selfResultList.push(1)
            this.operateResultList.push(0)
            this.$emit('add', {
              name: 'stage3',
              val: 4
            })
          } else {
            this.status = 'fail'
            this.operateResultList.push(1)
            this.selfResultList.push(0)
          }
        }, 1500)
        
      } else {
        setTimeout(() => {
          item.status = 'fail'
          if (type === 'user') {
            //  禁止玩家操作
            this.yourTime = false
            setTimeout(() => {
              //  获取还没有开的牌
              let arr = this.cardList.filter(item => item.status === '')
              //  随机开一张牌
              let random = Math.floor(Math.random() * arr.length)
              this.checkCard(arr[random], 'captain')
            }, 2000)
          } else {
            this.yourTime = true
            this.canClick = true
          }
        }, 500)
        // 如果本次开牌的是自己，则给船长随机开一张牌

        // 如果是自己，则给船长随机开一张牌
        // this.status = 'fail'

      }
    }
  }
}
</script>
<style scoped>
.card-list {
  margin-top: 5vh;
  /* height: 40vh; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.card-item {
  width: 26%;
  height: 19vh;
  margin-top: 1vh;
  cursor: pointer;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 1s linear;
  transform: rotateY(0);
  background-image: linear-gradient(#63a6ff, #90baff);
}
.card-item.show {
  opacity: 1;
}
.card-item.rotate {
  transform: rotateY(180deg);
}
.card-item.success {
  background-image: linear-gradient(#f9ff91, #ffb251);
}

.card-item.success .card-text {
  color: #f9ff91;
}

.card-item.fail {
  background-image: linear-gradient(#f4f4f4, #a6a8aa);
}

.card-item.fail .card-text {
  color: #757575;
}

.card-text {
  font-family: 'douyu';
  font-size: 3vw;
  transform: rotateY(180deg);
}

.user-wrap {
  display: flex;
  padding: 0.5rem 0;
  margin-top: 5vh;
}
.self-wrap {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
.author {
  width: 5vw;
  box-sizing: border-box;
}
.author.active {
  transform: scale(1.2);
  border: 5px solid rgb(255, 232, 21);
}
.user-info {
  display: flex;
  flex-direction: column;
  margin: 0 1vw;
  justify-content: space-between;
}
.self-wrap .user-info {
  align-items: flex-end;
}
.username {
  font-family: 'douyu';
  font-size: 2.5vw;
  color: #4c76ad;
}
.result-list {
  display: flex;
}
.result-item {
  width: 1vw;
  height: 1vw;
  background: #ff5656;
  border-radius: 50%;
  margin-right: 1vw;
}
.result-item.active {
  background: #63d94f;
}
/* .card-item.active {
  
} */
@media screen and (max-width: 768px) {
  .author {
    width: 10vw;
  }
  .user-wrap {
    margin-top: 3vh;
  }
  .username {
    font-size: 5vw;
  }
  .card-list {
    margin-top: 0;
  }
  .card-item {
    width: 45%;
    height: 20vh;
  }
  .card-text {
    font-size: 10vw;
  }
  .result-item {
    width: 2vw;
    height: 2vw;
  }
}
</style>