<template>
  <sidebar></sidebar>
  <div class="parent">
    <div class="child">
      <div class="form">
        <h1 class="glowing-text">
          <span>密语o</span><span>r蜜语</span>
        </h1>
        <form>
          <el-form-item>
            <el-input
                v-model="form.confession"
                :rows="2"
                type="text"
                placeholder="心动不如行动"
                class="custom-input"
            />
          </el-form-item>
          <el-form-item class="custom-form-item">
            <el-select v-model="form.choice" placeholder="请选择是否公开">
              <el-option label="匿名" value="0"></el-option>
              <el-option label="公开" value="1"></el-option>
            </el-select>
          </el-form-item>
        </form>

        <nav class="cloud-effect">
          <button class="effect-button" @click="handleClick();clear();">
            发布
            <span></span><span></span><span></span><span></span>
          </button>

          <button class="effect-button" @click="clear">
            重置
            <span></span><span></span><span></span><span></span>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import {ref, reactive, h} from "vue";
import dayjs from 'dayjs'
import {ElNotification} from "element-plus";
import addStore from "../store/addStore.js";
import axios from "axios";
import sidebar from "../components/sidebar.vue";

const now = new Date()
const NewaddStore = addStore();

const form = reactive({
  date: dayjs(now).format('YYYY.MM.dd-HH:mm'),
  confession: "",
  choice: null,
});

const clear = () => {
  form.choice = null
  form.confession = ""
}
//发送
const res = ref(null);
const handleClick = async () => {
  if (form.choice === null || form.confession === '') {
    ElNotification({
      title: "失败。。。。",
      message: h("i", {style: "color: teal"}, "请输入内容，选择公开情况以后再发布吧！"),
    });
  } else {
    try {
      const response = await axios.post("https://mock.apifox.cn/m1/3336188-0-default/api/control/confession", form,
          {
            headers: {
              'Content-Type': 'application/json',
            }});
      res.value = response.data;
      console.log(response.data);
      console.log(dayjs(now).format('YYYY-MM-DD-HH'));
      if (res.value.msg === "ok" && res.value.code === 200) {
        ElNotification({
          title: "发布成功！",
          message: h("i", {style: "color: teal"}, "好好好"),
        });
        NewaddStore.setAddInfo(res.value.data);//不知道有没有问题，后端这里是要返回多少东西？
        console.log(NewaddStore.addSession);
      } else {
        alert("还没写其他情况，是后端问题吧")
      }
    } catch (e) {
      if (e.response && e.response.status === 400) {
        res.value = e.response.data;
        if (res.value.msg === "参数错误" && res.value.code === 404) {
          ElNotification({
            title: "参数错误！",
            message: h("i", {style: "color: teal"}, "不好"),
          });
        } else {
          alert("什么鬼！");
          console.log(res.value);
        }
      }
    }
  }
}


</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.parent {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.child {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.custom-form-item {
  margin-top: 50px; /* 调整上边距 */
  margin-bottom: 20px; /* 调整下边距 */
  margin-left: 88px; /* 调整左边距 */
  margin-right: 10px; /* 调整右边距 */
}


.glowing-text {
  font-size: 30px;
  margin-bottom: 70px;
  color: #f67c7c;
  text-transform: uppercase;
  letter-spacing: 5px;
  cursor: pointer;
  position: relative;
  top: 90px;
}

.glowing-text span {
  transition: 0.5s;
}

.glowing-text:hover span:nth-child(1) {
  margin-right: 10px;
  color: #8dcdef;
  text-shadow: 0 0 10px #fff,
  0 0 20px #fff,
  0 0 40px #fff,
  0 0 80px #fff,
  0 0 120px #fff,
  0 0 160px #fff;
}

.glowing-text:hover span:nth-child(2) {
  margin-left: 40px;
  color: #8dcdef;
  text-shadow: 0 0 10px #fff,
  0 0 20px #fff,
  0 0 40px #fff,
  0 0 80px #fff,
  0 0 120px #fff,
  0 0 160px #fff;
}

.custom-input {
  width: 300px;
  font-size: 16px;
  margin-bottom: 15px;
  position: relative;
  top: 50px;
  left: 47px;
}


.cloud-effect .effect-button {
  --c: #6ed9f1;
  background-color: transparent; /* 为按钮添加透明背景 */
  color: var(--c);
  border: 3px solid var(--c);
  border-radius: 40%; /* 使按钮变为椭圆 */
  text-align: center;
  line-height: 80px; /* 使文字垂直居中 */
  font-weight: bold;
  cursor: pointer;
  margin: 10px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: 0.5s;
  font-family: inherit; /* 保证按钮继承页面的字体设置 */
  font-size: inherit;
  outline: none; /* 去除按钮聚焦时的外框 */
  top: -20px;
  display: inline-flex; /* 将按钮改为弹性盒子以便设置垂直居中 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 50px; /* 设置按钮的高度，根据需要调整 */
  width: 80px; /* 设置按钮的宽度，根据需要调整 */
}

.cloud-effect .effect-button:hover {
  color: #222;
}

.cloud-effect .effect-button span {
  position: absolute;
  width: 25%;
  height: 100%;
  background-color: var(--c);
  border-radius: 50%;
  transform: translateY(150%);
  left: calc((var(--n) - 1) * 25%);
  transition: 0.5s;
  z-index: -1;
}

.cloud-effect .effect-button:hover span {
  transform: translateY(0) scale(2);
}

.cloud-effect .effect-button span:nth-child(1) {
  --n: 1;
}

.cloud-effect .effect-button span:nth-child(2) {
  --n: 2;
}

.cloud-effect .effect-button span:nth-child(3) {
  --n: 3;
}

.cloud-effect .effect-button span:nth-child(4) {
  --n: 4;
}

.form {
  background-color: rgba(255, 255, 255, .3);
  width: 400px;
  height: 400px;
  border-radius: 30px;

  /* 一种水平+垂直的居中定位方式 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 这个比上次人工队计算宽高一半要好 */

  /* 注入灵魂 */
  backdrop-filter: blur(3px);
  border-left: 2px solid rgba(255, 255, 255, .3);
  border-top: 2px solid rgba(255, 255, 255, .3);
  box-shadow: 2px 2px 10px rgba(0, 0, 0, .2);

  text-align: center;
}


</style>
