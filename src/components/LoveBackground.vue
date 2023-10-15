<template>
  <div class="background-container">
    <ul class="bg-squares">
      <li v-for="n in 10" :key="n"></li>
    </ul>
  </div>
</template>

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: linear-gradient(to right, rgb(247, 209, 215), rgb(191, 227, 241)); /* 设置背景颜色 */
}

.bg-squares {
  list-style: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.bg-squares li {
  position: absolute;
  bottom: -160px;
  background-color: rgba(255, 255, 255, 0.15);
  animation: square 20s linear infinite;
}

.bg-squares li:nth-child(1) {
  left: 10%;
  width: 40px;
  height: 40px;
}

.bg-squares li:nth-child(2) {
  left: 20%;
  width: 80px;
  height: 80px;
  animation-delay: 2s;
  animation-duration: 17s;
}

.bg-squares li:nth-child(3) {
  left: 25%;
  width: 40px;
  height: 40px;
  animation-delay: 4s;
}

.bg-squares li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.25);
  animation-duration: 22s;
}

.bg-squares li:nth-child(5) {
  left: 70%;
  width: 40px;
  height: 40px;
}

.bg-squares li:nth-child(6) {
  left: 80%;
  width: 120px;
  height: 120px;
  background-color: rgba(255, 255, 255, 0.2);
  animation-delay: 3s;
}

.bg-squares li:nth-child(7) {
  left: 32%;
  width: 160px;
  height: 160px;
  animation-delay: 7s;
}

.bg-squares li:nth-child(8) {
  left: 55%;
  width: 20px;
  height: 20px;
  animation-delay: 15s;
  animation-duration: 40s;
}

.bg-squares li:nth-child(9) {
  left: 25%;
  width: 10px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.3);
  animation-delay: 2s;
  animation-duration: 40s;
}

.bg-squares li:nth-child(10) {
  left: 90%;
  width: 160px;
  height: 160px;
  animation-delay: 11s;
}

@keyframes square {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-120vh) rotate(600deg);
  }
}
</style>

