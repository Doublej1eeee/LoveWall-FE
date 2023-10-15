<template>
  <div class="form">
    <div class="container">
      <div class="title">用户注册</div>
      <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          status-icon
          label-width="120px"
      >

        <div class="input-container">
          <el-form-item label="用户名" prop="username">
            <el-input v-model.number="ruleForm.username"/>
          </el-form-item>


          <el-form-item label="账号" prop="account">
            <el-input v-model.number="ruleForm.account"/>
          </el-form-item>

          <el-form-item label="邮箱" prop="emails">
            <el-input v-model.number="ruleForm.emails"/>
          </el-form-item>


          <el-form-item label="输入密码" prop="password">
            <el-input v-model="ruleForm.password" autocomplete="off"/>
          </el-form-item>


          <el-form-item label="确认密码" prop="checkPass">
            <el-input
                v-model="ruleForm.checkPass"
                autocomplete="off"
            />
          </el-form-item>
        </div>


        <el-form-item>
          <div class="button-container">
            <el-button type="primary" @click="submitForm">注册</el-button>
            <el-button @click="resetForm">重置</el-button>
          </div>
        </el-form-item>


      </el-form>


    </div>
  </div>

</template>

<script setup>
import {reactive, ref, h} from 'vue'
import {useRouter} from "vue-router";
import {ElNotification} from "element-plus";
import loginStore from "../store/loginStore.js";
import userStore from "../store/userStore.js";
import axios from "axios";

const NewuserStore = userStore();
const NewloginStore = loginStore();
const router = useRouter();


//注册前
const ruleFormRef = ref(null)
const ruleForm = reactive({
  account: '',
  password: '',
  checkPass: '',
  username: '',
  emails: ''
})

const validatePass = (rule, value, callback) => {
  if (value !== ruleForm.password) {
    callback(new Error('两次密码不一致!'));
  } else {
    callback();
  }
};

const rules = reactive({
  username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
  password: [{required: true, message: '请输入密码', trigger: 'blur'}],
  checkPass: [
    {required: true, message: '请再次输入密码', trigger: 'blur'},
    {validator: validatePass, trigger: 'blur'}
  ],
  account: [{required: true, message: '请输入账号', trigger: 'blur'}],
  emails: [{required: true, message: '请输入邮箱', trigger: 'blur'}]
})

const resetForm = () => {
  ruleFormRef.value.resetFields()
}

const ruleForm1 = reactive({
  account: '',
  password: '',
  username: '',
  emails: ''
})

//注册中
const res = ref(null);
const submitForm = async () => {//逻辑要改
  if (ruleForm.password !== ruleForm.checkPass || ruleForm.account === "" || ruleForm.username === "" || ruleForm.emails === "") {
    ElNotification({
      title: "输入错误！",
      message: h("i", {style: "color: teal"}, "请确保填完所有信息以及保证两次密码一致！"),
    });
    return 0;
  } else {
    try {
      console.log(ruleForm.emails);
      const response = await axios.post("https://mock.apifox.cn/m1/3336188-0-default/api/user/reg", ruleForm1,
          {
            headers: {
              'Content-Type': 'application/json',
            }});
      res.value = response.data;
      console.log(response.data);
      if (res.value.msg === "ok" && res.value.code === 200) {
        ElNotification({
          title: "注册成功！",
          message: h("i", {style: "color: teal"}, "请先登录吧！"),
        });
        router.push({name: "Login"});
      }
    } catch (e) {
      if (e.response && e.response.status === 400) {
        res.value = e.response.data;
        if (res.value.msg === "参数错误" && res.value.code === 404) {
          ElNotification({
            title: "参数错误！",
            message: h("i", {style: "color: teal"}, "未接收或未发送的bug！"),
          });
        } else if (res.value.msg === "账号已注册" && res.value.code === 401) {
          ElNotification({
            title: "账号已注销！",
            message: h("i", {style: "color: teal"}, "去登陆吧！"),
          });
        } else if (res.value.msg === "邮箱已注册" && res.value.code === 401) {
          ElNotification({
            title: "邮箱已注册！",
            message: h("i", {style: "color: teal"}, "换一个邮箱吧！"),
          });
        } else if (res.value.msg === "Account必须由英文字母、数字或下划线组成" && res.value.code === 405) {
          ElNotification({
            title: "账号必须由英文字母、数字或下划线组成！",
            message: h("i", {style: "color: teal"}, "换一个账号吧"),
          });
        } else if (res.value.msg === "Password长度必须大于8位" && res.value.code === 406) {
          ElNotification({
            title: "密码长度必须大于8位！",
            message: h("i", {style: "color: teal"}, "换一个密码吧"),
          });
        } else if (res.value.msg === "密码中必须包含，数字和特殊字符" && res.value.code === 407) {
          ElNotification({
            title: "密码中必须包含，数字和特殊字符!",
            message: h("i", {style: "color: teal"}, "换一个密码吧"),
          });
        } else {
          alert("什么鬼！")
        }
      }
    }
  }
}

//stores


</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  position: relative;
  top: 20px; /* 上下移动 */
  left: -40px; /* 左右移动 */
}


.title {
  font-size: 1.6rem;
  margin-bottom: 20px;
  position: relative;
  top: 5px; /* 上下移动 */
  left: 40px; /* 左右移动 */
}

.button-container {
  display: flex;
  justify-content: space-between; /* 让按钮之间的空间均匀分布 */
  margin-left: 55px;
  margin-top: 10px;
}


.input-container {
  margin-left: 15px;
  margin-top: 10px;
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

input {
  font-size: inherit;
  width: 100%;
  outline: none;
  display: block;
  font-weight: 400;
  line-height: 1.6;
  padding: 3px 3px 3px 10px;
  border-radius: 20px;
  background-color: transparent;
  transition: border-color 0.2s ease-in-out;
  background-repeat: no-repeat;
  background-position: right 2% center;
  background-size: 2rem 2rem;
}

</style>


