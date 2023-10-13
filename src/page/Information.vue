<template>
  <sidebar></sidebar>
  <!--这一部分找一个比较好的展示个人信息的模板，里面的数据get得到，使onMounted？？？展示？？将get得到的数据这届展示到dialog里面，记得不能直接使用原始数据-->
  <el-button @click = "handledialogChange">编辑</el-button>
<el-dialog v-model="dialogVisible" title="个人信息修改" width="30%" draggable>
  <el-form
      ref="form"
      :model="sizeForm"
      label-width="auto"
  >
    <el-form-item label="用户名">
      <el-input v-model="sizeForm.name" />
    </el-form-item>
    <el-form-item label="性别">
      <el-select
          v-model="sizeForm.sex"
          placeholder="选择您的性别"
      >
        <el-option label="男" value="男" />
        <el-option label="女" value="女" />
        <el-option label="其他" value="其他" />
      </el-select>
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="sizeForm.phonenum" />
    </el-form-item>
    <el-form-item label="专业">
      <el-input v-model="sizeForm.major" />
    </el-form-item>
    <el-form-item label="年龄">
      <el-input v-model="sizeForm.age" />
    </el-form-item>
    <el-form-item label="座右铭">
      <el-input v-model="sizeForm.motto" />
    </el-form-item>

    <el-form-item label="生日">
      <el-col :span="11">
        <el-date-picker
            v-model="sizeForm.date1"
            type="date"
            label="请选择时间"
            placeholder="请选择时间"
            style="width: 100%"
        />
      </el-col>
    </el-form-item>
    <el-form-item label="星座">
      <el-input v-model="sizeForm. constellation" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="sizeForm. emails" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="handledialogChange">取消</el-button>
    </el-form-item>
  </el-form>
  </el-dialog>

</template>

<script lang="ts" setup>
import {h, reactive, ref} from 'vue';
import axios from "axios";
import Sidebar from "../components/sidebar.vue";
import {ElNotification} from "element-plus";

const dialogVisible =ref(false);
const handledialogChange = () =>{
  dialogVisible.value=!dialogVisible.value;
  sizeForm.name="";
  sizeForm.sex="";
  sizeForm.phonenum="";
  sizeForm.major="";
  sizeForm.age="";
  sizeForm.motto="";
  sizeForm.date1="";
  sizeForm.constellation="";
  sizeForm.emails="";
}





const size = ref('default');
const labelPosition = ref('right');

const sizeForm = reactive({
  name: '',
  sex: '',
  phonenum: '',
  major: '',
  age: '',
  motto: '',
  date1: '',
  constellation: '',
  emails: '',
})

const res = ref(null);
const onSubmit = async () => {
  try {
  const response = await axios.put("",sizeForm);
  console.log(response);
    ElNotification({
      title: "修改成功",
      message: h("i", { style: "color: teal" }, "个人资料修改已完成"),
    });
  }catch (error) {
    alert("修改失败！");
    console.error(error);
    if (error.response) {
      console.log(error.response.data);
    }
}}
</script>

<style>
.el-radio-group {
  margin-right: 12px;
}

</style>
