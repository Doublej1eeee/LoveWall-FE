<template>
  <sidebar></sidebar>
  <!--这一部分找一个比较好的展示个人信息的模板，里面的数据get得到，使onMounted？？？展示？？将get得到的数据这届展示到dialog里面，记得不能直接使用原始数据-->
  <el-button @click="handledialogChange1">头像上传</el-button>
  <el-dialog v-model="dialogVisible1">
    <el-upload v-model:file-list="fileList" drag action="#" :limit="1" :before-upload="beforeUpload" :auto-upload="false">
      <template #trigger>
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          将文件拖到此处或者 <em>点击上传</em>
        </div>
      </template>
      <el-button class="ml-3" type="success" @click="confirm">
        上传到服务器
      </el-button>
      <template #tip>
        <div class="el-upload__tip text-red">
          只能上传一个图片，传错请先点击右方按钮删除
        </div>
      </template>
    </el-upload>
  </el-dialog>
  <el-button @click="handledialogChange">信息编辑</el-button>
  <el-dialog v-model="dialogVisible" title="个人信息修改" width="30%" draggable>
    <el-form
        ref="form"
        :model="sizeForm"
        label-width="auto"
    >
      <el-form-item label="用户名">
        <el-input v-model="sizeForm.username"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-select
            v-model="sizeForm.sex"
            placeholder="选择您的性别"
        >
          <el-option label="男" value="男"/>
          <el-option label="女" value="女"/>
          <el-option label="其他" value="其他"/>
        </el-select>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="sizeForm.phonenum"/>
      </el-form-item>
      <el-form-item label="专业">
        <el-input v-model="sizeForm.major"/>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="sizeForm.age"/>
      </el-form-item>
      <el-form-item label="个性签名">
        <el-input v-model="sizeForm.motto"/>
      </el-form-item>

      <el-form-item label="生日">
        <el-col :span="11">
          <el-date-picker
              v-model="sizeForm.birthday"
              type="date"
              label="请选择时间"
              placeholder="请选择时间"
              style="width: 100%"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="星座">
        <el-input v-model="sizeForm. constellation"/>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="sizeForm. emails"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="handledialogChange">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!--下面是展示的页面-->
  <div class="a">
    <div class="b">
      <a href="#">{{ NewuserStore.userSession.username }}</a>
      <h2>我的信息</h2>
      <span>
        <div>
          个性签名：
        </div>
        <div>
          {{ NewuserStore.userSession.motto }}
        </div>
      </span>
    </div>

    <div class="c">
      <div>用户名:{{ NewuserStore.userSession.username }}</div>
      <div>性别:{{ NewuserStore.userSession.sex }}</div>
      <div>电话:{{ NewuserStore.userSession.phonenum }}</div>
      <div>专业:{{ NewuserStore.userSession.major }}</div>
      <div>年龄:{{ NewuserStore.userSession.age }}</div>
      <div>生日:{{ NewuserStore.userSession.birthday }}</div>
      <div>星座:{{ NewuserStore.userSession.constellation }}</div>
      <div>邮箱:{{ NewuserStore.userSession.emails }}</div>

    </div>


    <div class="f" :style="{
      'background-image': `url(${NewuserStore.userSession.avatar})`
    }"></div>
  </div>
</template>

<script setup>
import userStore from "../store/userStore.js";
import {h, reactive, ref} from 'vue';
import axios from "axios";
import Sidebar from "../components/sidebar.vue";
import {ElNotification,ElMessage} from "element-plus";


const NewuserStore = userStore();

//下面是dialog

const dialogVisible = ref(false);
const handledialogChange = () => {
  dialogVisible.value = !dialogVisible.value,
      sizeForm.username = NewuserStore.userSession.username,
      sizeForm.sex = NewuserStore.userSession.sex,
      sizeForm.phonenum = NewuserStore.userSession.phonenum,
      sizeForm.major = NewuserStore.userSession.major,
      sizeForm.age = NewuserStore.userSession.age,
      sizeForm.motto = NewuserStore.userSession.motto,
      sizeForm.birthday = NewuserStore.userSession.birthday,
      sizeForm.constellation = NewuserStore.userSession.constellation,
      sizeForm.emails = NewuserStore.userSession.emails
}




const sizeForm = reactive({
  username: "",
  sex: "",
  phonenum: "",
  major: "",
  age: "",
  motto: "",
  birthday: "",
  constellation: "",
  emails: "",
})

const res = ref(null);
const onSubmit = async () => {
  try {
    const response = await axios.put("http://127.0.0.1:4523/m1/3336188-0-default/api/control/information", sizeForm,{
      headers: {
        'Content-Type': 'application/json',
      }});
    if (response.data.msg === "ok" && response.data.code === 200) {
      console.log(response);
      ElNotification({
        title: "修改成功",
        message: h("i", {style: "color: teal"}, "个人资料修改已完成"),
      });
      NewuserStore.userSession.emails = response.data.data.emails;
      NewuserStore.userSession.sex = response.data.data.sex;
      NewuserStore.userSession.age = response.data.data.age;
      NewuserStore.userSession.major = response.data.data.major;
      NewuserStore.userSession.birthday = response.data.data.birthday;
      NewuserStore.userSession.constellation = response.data.data.constellation;
      NewuserStore.userSession.username = response.data.data.username;
      NewuserStore.userSession.avatar = response.data.data.avatar;
      NewuserStore.userSession.motto = response.data.data.motto;
      NewuserStore.userSession.phonenum = response.data.data.phonenum;
    }
  } catch (e) {
    if (e.response && e.response.status === 400){
      if (e.response.data.msg === "电话格式错误" && e.response.data.code === 450) {
        ElNotification({
          title: "电话格式错误",
          message: h("i", {style: "color: teal"}, "请按照正规电话号码的格式进行修改！"),
        });
      }else if (e.response.data.msg === "个人信息获取失败" && e.response.data.code === 500) {
        ElNotification({
          title: "个人信息获取失败",
          message: h("i", {style: "color: teal"}, "我没懂？？"),
        });
      }
    }
  }
  dialogVisible.value=!dialogVisible.value;
}




//上传头像
const dialogVisible1 = ref(false);
const handledialogChange1 = () => {
  dialogVisible1.value=!dialogVisible1.value;
}



const beforeUpload = (file) => {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt2M = file.size / 1024 / 1024 / 1024 < 200;

  if (!isJPG) {
    ElMessage.error('只支持上传 JPG/PNG 格式的图片！');
  }
  if (!isLt2M) {
    ElMessage.error('文件大小不能超过 200KB！');
  }

  return isJPG && isLt2M;
};

const fileList = ref([]);
const confirm = async () => {
  const param = new FormData();
  fileList.value.forEach((val) => {
    param.append('avatar', val.raw);
  });
  fileList.value = [];
  try {
    const response = await axios.post('https://mock.apifox.cn/m1/3336188-0-default/api/control/image', param, {
      headers: {
        'Content-Type': 'application/form-data',
      }
    });
    if (response.data.code === 200 && response.data.msg === "ok") {
        console.log('上传成功');
        const Avatar = response.data.data.avatar;
        NewuserStore.userSession.avatar = Avatar;
    } else {
      console.log(response.data);
      // console.error(response);
    }
    dialogVisible1.value = false;
  } catch (error) {
    console.error(error);
    dialogVisible1.value = false;
    console.log("???");
  }
}

</script>


<style scoped>
body {
  background-color: rgb(204, 212, 230);
  display: flex;
  justify-content: center;
}

.a {
  position: relative;
  width: 700px;
  height: 400px;
  border: #fff 10px solid;
  background: linear-gradient(to right, rgb(191, 227, 241), rgb(247, 209, 215));
  top: 10px;
  border-radius: 20px;
  overflow: hidden;
}

.b {
  position: absolute;
  width: 200px;
  height: 300px;
  left: 300px;
  margin: 75px 50px;
  transition: 1s;
}

.b a {
  text-decoration: none;
  color: #fff;
  font: 900 28px '';
}

.b h2 {
  transition: .5s 1s;
  opacity: 0;
  color: rgb(30, 210, 200);


}

.b span {
  transition: .5s 1s;
  color: #fff;
  font: 500 15px '';
  position: absolute;
  top: 70px;
}

.c {
  position: absolute;
  color: #fff;
  top: 75px;
  left: 400px;
  opacity: 0; /* 初始时设置为完全不可见 */
  transition-delay: 0s; /* 鼠标悬停时取消延迟 */
  transition: opacity 0.5s;
}

.a:hover .c {
  opacity: 1; /* 鼠标悬停时逐渐变为透明 */
  transition: opacity 0.5s 1s; /* 1秒延迟后开始过渡动画 */
}


.a:hover .b {
  transition: 1s 0.5s;
  left: 10px;
}

.a:hover .b span {
  transition: 1s 0.5s;
  top: 80px;
  left: 10px;
}

.a:hover .b h2 {
  transition: 1s 0.5s;
  opacity: 1;
}

.f {
  width: 200px;
  height: 200px;
  position: absolute;
  background-size: cover;
  margin: 70px;
  opacity: 0.7;
  transition: 1s 1s;
  border-radius: 50%; /* 将元素设置成圆形 */
}

.a:hover .f {
  transition: 1s;
  opacity: 0;
}
</style>
