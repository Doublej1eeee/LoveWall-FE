<template>
  <div class="container">
    <div class="title">心动频率局</div>
    <router-link v-for="btn in buttons" :key="btn.name" :to="btn.path" class="button">
      <svg width="140" height="40">
        <rect class="shape" width="140" height="40"></rect>
        <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" fill='#000000' font-size="14">{{ btn.name }}</text>
      </svg>
    </router-link>
  </div>
</template>


<script setup >
const buttons = [
  { name: '首页', path: '/' },
  { name: '登录', path: '/login' },
  { name: '注册', path: '/register' }
]
</script>


<style scoped>

/* Reset Styles */
* {
  margin: 0;
  padding: 0;
}

/* Title Styles */
.title {
  position: fixed;
  top: 20px;
  left: 70px;
  font-size: 50px;
  color: #ceadad;
  font-weight: bold;
}

/* Container Styles */
.container {
  display: flex;
  position: fixed;
  top: 0;
  right: 0; /* 注意，我已经修复了拼写错误 */
  background-color: white;
  padding: 5px;
}

/* Button Styles */
.button {
  position: relative;
  width: 140px;
  height: 40px;
  margin: 0 10px;
  cursor: pointer;
}

/* Shape Styles */
.shape {
  fill: none;
  stroke: #009ffd;
  stroke-width: 5;
  stroke-dasharray: 90 360;
  stroke-dashoffset: -200;
  transition: 1s ease;
}

/* Button Hover Styles */
.button:hover .shape {
  stroke: #06e6a0;
  stroke-width: 3;
  stroke-dasharray: 45 0;
  stroke-dashoffset: 0;
}

</style>
