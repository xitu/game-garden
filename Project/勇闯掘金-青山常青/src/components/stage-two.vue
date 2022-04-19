<template>
  <div class="stage-wrap">
    <rule-wrap :stage="2" @begin="begin"></rule-wrap>
    <!-- 游戏区 -->
    <div class="game-wrap" v-show="round > 0">
      <!-- 运营 -->
      <div class="operate-wrap player-wrap">
        <!-- 个人信息 -->
        <div class="user-wrap">
          <div class="author">
            <img src="../assets/img/troy.jpg" alt="" />
          </div>
          <div class="user-info">
            <div class="username">Troy</div>
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
        <!-- 出拳区 -->
        <div class="show-place">
          <img :src="operateChecked.img" />
        </div>
      </div>
      <!-- 自己 -->
      <div class="self-wrap player-wrap">
        <!-- 出拳区 -->
        <div class="show-place">
          <img :src="selfChecked.img" />
        </div>
        <!-- 个人信息 -->
        <div class="user-wrap">
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
          <div class="author">
            <img src="../assets/img/user.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
    <!-- 选项区 -->
    <div class="option-list" v-show="round > 0">
      <div class="option-item" v-for="(item, key) in optionList" :key="key" @click="checkItem(item, key)">
        <img :src="item.img" />
      </div>
    </div>
    <!-- 结果弹窗 -->
    <result-log :status="status" :isEnd="round >= 10" @goOn="goOn"></result-log>
  </div>
</template>

<script>

export default {
  name: '',
  data () {
    return {
      canClick: true,
      round: 0,
      operateResultList: [],
      selfResultList: [],
      operateChecked: {},
      selfChecked: {},
      status: '',
      optionList: [
        {
          key: 'stone',
          img: require('../assets/icon/stone.svg'),
          scissors: true,
          cloth: false
        },
        {
          key: 'scissors',
          img: require('../assets/icon/scissors.svg'),
          stone: false,
          cloth: true
        },
        {
          key: 'cloth',
          img: require('../assets/icon/cloth.svg'),
          stone: true,
          scissors: false
        }
      ]
    }
  },
  methods: {
    begin () {
      this.round = 1
    },
    checkItem (item, key) {
      if (!this.canClick) {
        return
      }
      this.canClick = false
      this.selfChecked = item
      
      // 随机生成对手选择项
      // 移除自己选择项，排除平局的可能
      let arr = [0, 1, 2]
      arr.splice(key, 1)
      // 生成0到1的随机整数
      let random = Math.floor(Math.random() * 2)
      this.operateChecked = this.optionList[arr[random]]

      // 判断输赢
      let result = item[this.optionList[arr[random]].key]
      setTimeout(() => {
        if (result) {
          this.$emit('add', {
            name: 'stage2',
            val: 2
          })
          this.status = 'success'
          this.operateResultList.push(false)
          this.selfResultList.push(true)
        } else {
          this.status = 'fail'
          this.operateResultList.push(true)
          this.selfResultList.push(false)
        }
      }, 1000)
    },
    goOn () {
      if (this.round >= 10) {
        this.$emit('changeSage', 3)
      } else {
        this.status = ''
        this.operateChecked = {}
        this.selfChecked = {}
        this.round++
        this.canClick = true
      }
    }
  }
}
</script>
<style scoped>
.game-wrap {
  margin-top: 5vh;
  display: flex;
  justify-content: space-between;
}
.player-wrap {
  display: flex;
  align-items: flex-start;
}
.self-wrap {
  align-items: flex-end;
  justify-content: flex-end;
  /* margin-top: 5vh; */
}
.user-wrap {
  display: flex;
  padding: 0.5rem 0;
}
.author {
  width: 5vw;
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

.show-place {
  position: absolute;
  width: 10vw;
  height: 10vw;
}
.operate-wrap .show-place{
  top: 40vh;
  left: 10vw;
}
.self-wrap .show-place{
  top: 40vh;
  right: 10vw;
}

.option-list {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-around;
  /* margin-top: 5vh; */
  left: 0;
  top: 78vh;
}
.option-item {
  width: 10vh;
  background: #eccdbf;
  padding: 1vw;
  box-sizing: border-box;
  border-radius: 50%;
  border: 3px solid #482920;
  transition: all 0.2s;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.option-item:hover {
  transform: scale(1.2);
}
@media screen and (max-width: 768px) {
  .game-wrap {
    display: block;
  }
  .player-wrap {
    flex-direction: column;
  }
  .author {
    width: 15vw;
  }
  .username {
    font-size: 7.5vw;
  }
  .result-item {
    width: 3vw;
    height: 3vw;
  }
  .user-info {
    margin: 0 3vw;
  }
  .show-place {
    position: inherit;
    width: 30vw;
    height: 30vw;
    margin: 0 30vw;
  }
  .option-item {
    width: 20vw;
    padding: 3vw;
  }
}
</style>