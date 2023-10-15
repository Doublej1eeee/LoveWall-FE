<template>
  <sidebar></sidebar>
  <div class="confession-list">
    <div v-for="(confession, index) in confessionList" :key="index" class="confession-item">
      <div class="user-info">
        <img :src=NewuserStore.userSession.avatar alt="头像" class="avatar"/>
        <span class="username">{{ confession.username }}</span>
      </div>
      <div class="content">{{ confession.confession }}</div>
      <div class="date">{{ confession.date }}</div>
      <hr>
      <div>
        <el-button class="button" @click="handleChange">评论</el-button>
        <el-input v-show="comment" v-model="message"></el-input>
        <el-button v-show="comment" @click="handleComment">发布</el-button>
      </div>
      <hr>
      <div v-for="(message, index) in confession.message_list" :key="index" class="message-container">
        <div class="name">{{ message.name }}:</div>
        <div class="message-content">{{ message.message }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {h, onMounted, reactive, ref} from "vue";
import Sidebar from "../components/sidebar.vue";
import axios from "axios";
import {ElNotification} from "element-plus";
import userStore from "../store/userStore.js";


const NewuserStore = userStore();
//获取其他用户的表白信息,以及评论的信息

const confessionList = reactive([]);
const res = ref([]);
onMounted(async () => {
  try {
    const response = await axios.get("https://mock.apifox.cn/m1/3336188-0-default/api/control/community");
    if (response.data.code === 200 && response.data.msg === "ok") {
      res.value = response.data.data.confession_list;
      console.log(response.data);
      res.value.forEach(e => {//优雅的写法，同时能保持list的响应式
        confessionList.push(e);
      })
    } else {
      alert("请求返回出错！")
    }
  } catch (error) {
    alert("请求获取失败！");
    console.error(error);
    if (error.response) {
      console.log(error.response.data);
    }
  }
})

//打开评论
const comment = ref(false);
const handleChange = () => {
  comment.value = !comment.value
}

//发布评论
const message = ref("");
const handleComment = async () => {
  if (message.value === "") {
    ElNotification({
      title: "操作失败",
      message: h("i", {style: "color: teal"}, "请输入内容"),
    });
    return 0;
  } else {
    try {
      const response = await axios.post("https://mock.apifox.cn/m1/3336188-0-default/api/control/message", message,{
        headers: {
          'Content-Type': 'application/json',
        }});
      if (response.data.msg === "ok" && response.data.code === 200) {
        console.log(response.data);
        ElNotification({
          title: "评论成功",
          message: h("i", {style: "color: teal"}, "感谢您的评论"),
        })
      }
    } catch (e) {
      if (e.response && e.response.status === 400) {
        if (e.response.data.msg === "参数错误" && e.response.data.code === 404) {
          ElNotification({
            title: "参数错误",
            message: h("i", {style: "color: teal"}, "特殊错误"),
          });
        }
      } else if (e.response.data.msg === "权限错误" && e.response.data.code === 502) {
        ElNotification({
          title: "权限错误",
          message: h("i", {style: "color: teal"}, "无法评论？？"),
        });
      } else if (e.response.data.msg === "查无此人" && e.response.data.code === 501) {
        ElNotification({
          title: "权限错误",
          message: h("i", {style: "color: teal"}, "没有这个评论？？"),
        });
      } else {
        alert("什么鬼")
      }
    }
    message.value = "";
    comment.value = !comment.value;
  }
}


//没写评论删除的功能（未完成）


</script>

<style scoped>

.container {
  height: 500px; /* 设置一个固定高度 */
  overflow-y: auto; /* 添加垂直滚动条 */
  border: 1px solid #ccc; /* 可选：添加一个边框以标识容器 */
}

.confession-list {
  border: 1px solid #ceadad; /* 修改样式 */
  width: 700px; /* 设置宽度 */
  margin-left: 20px; /* 调整左侧间距，确保侧边栏和内容不重叠 */
  padding: 20px; /* 添加内边距，使内容离边框有一定距离 */
  height: 500px; /* 设置一个固定高度 */
  overflow-y: auto; /* 添加垂直滚动条 */
}

.confession-item {
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
  position: relative;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  top: 0;
  left: 0;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
}

.username {
  font-size: 16px;
  font-weight: bold;
}

.date {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.button {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  position: relative; /* 确保设置了相对定位 */
  top: 3px; /* 向下移动20像素 */
  left: 10px;
}

.message-container {
  display: flex;
  align-items: center;
  word-break: break-word;

}

.name {
  font-weight: bold; /* 可选，使名字粗体 */
  margin-right: 5px; /* 可选，为名字和冒号之间添加一些间距 */
}

/* 滚动条整体样式 */
.confession-list::-webkit-scrollbar {
  width: 12px;
}

/* 滑块样式 */
.confession-list::-webkit-scrollbar-thumb {
  background-color: #ccdef8; /* 滑块颜色 */
  border-radius: 6px; /* 滑块圆角 */
}

/* 轨道样式 */
.confession-list::-webkit-scrollbar-track {
  background-color: #d8dfec; /* 轨道颜色 */
  border-radius: 6px; /* 轨道圆角 */
}

/* 当鼠标悬停在滑块上时的样式 */
.confession-list::-webkit-scrollbar-thumb:hover {
  background-color: #aaa;
}


</style>