<!--
 * @Author: 一尾流莺
 * @Description:游戏页面
 * @Date: 2021-10-14 14:47:09
 * @LastEditTime: 2021-10-27 18:28:00
 * @FilePath: \warbler-games\贪吃蛇\src\components\Map.vue
-->
<template>
  <div class="game-box">
    <!-- 行 -->
    <div class="row"
         v-for='row in gameRow'
         :key='row'>
      <!-- 列 -->
      <div class="col"
           v-for='col in gameCol'
           :key='col'>
        <!-- 小格子 -->
        <Cell :type='map[row-1][col-1]'></Cell>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Cell from './Cell.vue';
import { gameRow, gameCol } from '@/game/map';
import { defineProps } from 'vue';

defineProps(['map']);
</script>

<style lang='scss'>
.game-box {
  background: #000;
  opacity: 0.85;
  border: 1px solid #fff;
  .row {
    display: flex;
  }
}
</style>
