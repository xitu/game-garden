<!--
 * @Author: 十里青山
 * @Date: 2022-04-04 13:57:15
 * @公众号: 百里青山
 * @LastEditors: 掘金：十里青山
 * @LastEditTime: 2022-04-12 00:42:45
 * @Descripttion: 
-->
<template>
  <div class="rule-wrap">
    <!-- 关卡信息 -->
    <div class="stage-info">
      {{ activeRule.title }}
    </div>
    <!-- 运营信息 -->
    <div class="user-wrap">
      <div class="stage-user-text">守关人</div>
      <!-- 头像 -->
      <div class="author">
        <img :src="activeRule.img" alt="" />
      </div>
      <div class="user-info">
        <div class="username">{{ activeRule.name }}</div>
        <div class="desc">@{{ activeRule.desc }}</div>
      </div>
    </div>
    <!-- 规则弹窗 -->
    <div class="rule-log" v-show="showRule" v-html="activeRule.rule"></div>
    <div class="submit-btn" v-show="showRule" @click="begin">开始</div>
  </div>
</template>

<script>

export default {
  name: '',
  props: {
    stage: {
      type: Number,
      default: 1
    }
  },
  mounted () {
    this.activeRule = this.ruleList[this.stage - 1]
  },
  data () {
    return {
      activeRule: {},
      showRule: true,
      ruleList: [
        {
          name: '优弧',
          desc: '运营',
          title: '第一关：找掘金',
          img: require('../assets/img/youhu.jpg'),
          rule: `
            游戏名称：找掘金<br><br>
            守关人：优弧<br><br>
            守关人拦路语：想勇闯掘金？先记清楚掘金的名字吧！<br><br>
            玩法：从屏幕中的备选词中找出【掘金】，并点击它，本关卡共有5轮，每轮您有10秒钟的时间去选择，找到得四分， 没找到不得分。<br><br>
            如果你已经熟悉了规则，快点击开始游戏吧！
          `
        },
        {
          name: 'Troy',
          desc: '运营',
          title: '第二关：石头剪刀布',
          img: require('../assets/img/troy.jpg'),
          rule: `
            游戏名称：石头剪刀布<br><br>
            守关人：Troy<br><br>
            守关人拦路语：最顶级的较量往往以最朴素的形式呈现，来吧，石头剪刀布<br><br>
            玩法：规则很简单，选择你要出的就行，托尼老师会在你没选的选项里随机选一个（排除平局），赢了得两分，输了不得分，总共十轮。<br><br>
            如果你已经熟悉了规则，快点击开始游戏吧！
          `
        },
        {
          name: '船长',
          desc: '运营',
          title: '第三关：寻找宝藏',
          img: require('../assets/img/captain.jpg'),
          rule: `
            游戏名称：寻找宝藏<br><br>
            守关人：Captain、captain<br><br>
            守关人拦路语：很高兴你来到了这里，不至于让我的寻宝之路过于孤独<br><br>
            玩法：六张牌中隐藏着宝藏的秘密，你和船长将会轮流掀开一张牌，先找到宝藏牌的赢，胜利得四分，失败不得分，本关共5轮<br><br>
            如果你已经熟悉了规则，快点击开始游戏吧！
          `
        },
        {
          name: '思宇',
          desc: '运营',
          title: '第四关：打地鼠',
          img: require('../assets/img/zoe.jpg'),
          rule: `
            游戏名称：打地鼠<br><br>
            守关人：思宇<br><br>
            守关人拦路语：程序员讲究个眼疾手快，让我来考验考验你<br><br>
            玩法：打地鼠玩过吧，每只地鼠出现0.7s，总共20只，打中一只得一分，没有打中不得分，期待你的精彩表现<br><br>
            如果你已经熟悉了规则，快点击开始游戏吧！
          `
        },
        {
          name: '宝儿姐',
          desc: '运营',
          title: '第五关：幸运抽奖',
          img: require('../assets/img/baoer.jpg'),
          rule: `
            Hi，同学你好，我是宝儿姐，很开心遇到你，说明你已经经历了前面四关，想必前面四关的各种小游戏搞得你手忙脚乱吧，不过不用怕，宝儿姐可不会为难你，宝儿姐为你准备了你最喜欢的抽奖环节，抽到多少分就是多少分，一锤定胜负，来吧。
          `
        }
      ]
    }
  },
  methods: {
    /**
     * @description: 开始游戏
     * @param {*}
     * @return {*}
     */
    begin () {
      this.showRule = false
      this.$emit('begin')
    }
  }
}
</script>
<style scoped>
.rule-wrap {
  display: flex;
  justify-content: space-between;
  margin: 1vw 0;
  padding: 1vw;
  background: #FFF;
  align-items: center;
  position: relative;
}
.stage-info {
  /* font-family: 'douyu'; */
  font-size: 3vw;
  font-weight: bold;
  color: #1e80ff;
  /* overflow: hidden; */
  /* line-height: 1.3;
  height: 3vw; */
}
.user-wrap {
  overflow: hidden;
  display: flex;
}
.author {
  width: 4vw;
}
.user-info {
  margin-left: 1vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.stage-user-text {
  /* display: none; */
  text-align: center;
  font-size: 1vw;
  font-weight: bold;
  width: 1.5vw;
  color: #b0ccf0;
  border: .2vw solid #b0ccf0;
  margin-right: 1vw;
}
.username {
  font-family: 'douyu';
  color: #1e80ff;
  font-size: 2vw;
}
.desc {
  font-family: 'douyu';
  font-size: 1.2vw;
  color: #999;
}

.rule-log {
  position: absolute;
  left: 0;
  background: rgba(30, 128, 255, 0.3);
  border: 2px solid #1e80ff;
  width: 100%;
  top: 20vh;
  padding: 1vw;
  box-sizing: border-box;
  font-size: 1.2vw;
  color: #fff;
  line-height: 1.5;
  height: 60vh;
  overflow-y: auto;
}
.submit-btn {
  font-family: 'douyu';
  position: absolute;
  top: 85vh;
  font-size: 2vw;
  color: #fff;
  background: #1e80ff;
  line-height: 1.3;
  height: 2vw;
  overflow: hidden;
  padding:  .5vw 1.5vw;
  border-radius: 1vw;
  left: 50%;
  cursor: pointer;
  transform: translateX(-50%);
}

@media screen and (max-width: 768px) {
  .rule-wrap {
    flex-direction: column;
    align-items: flex-start;
    background: transparent;
    padding: 0;
  }
  .stage-info {
    font-size: 8vw;
    font-weight: bold;
    /* background: #fff; */
    width: 100%;
    height: 8vw;
    padding: 2vw;
  }
  .author {
    display: none;
  }
  .user-wrap {
    padding: 2vw;
    margin-top: 2vw;
    /* background: #fff; */
    overflow: hidden;
    line-height: 1.3;
    height: 5vw;
    /* padding: 3vw; */
  }
  .user-info {
    flex-direction: row;
    margin-left: 3vw;
    /* flex-wrap: nowrap; */
    flex-wrap: wrap;
    font-size: 8vw;
    justify-content: flex-start;
    align-items: center;
  }
  .stage-user-text {
    border: none;
    width: auto;
    font-size: 5vw;
    font-family: 'douyu';
  }
  .username {
    font-size: 5vw;
    /* font-size: 9vw; */
  }
  .desc {
    font-family: 'douyu';
    font-size: 5vw;
    /* font-size: 5vw; */
  }
  .rule-log {
    top: 15vh;
    font-size: 5vw;
    padding: 3vw;
  }
  .submit-btn {
    top: 80vh;
    font-size: 8vw;
    height: 8vw;
    padding: 1.5vw 3vw;
  }
}
</style>