<template>
  <sidebar></sidebar>
  <div class="table-wrapper">
  <el-table :data="filteredTableData" style="width: 100%" max-height="250">
    <el-table-column fixed prop="date" label="发布时间" width="150" />
    <el-table-column prop="confession" label="内容" width="800" />
    <el-table-column prop="publicStatus" label="公开情况" width="120" />
      <el-table-column  prop="confession_id" label="操作" width="120">
      <template #default="scope">
        <el-button link type="danger" size="small" @click="deleteRow(scope.$index);deletedata(scope.row.confession_id)"> <!--scope.$index当前循环的索引，row是获取所有的内容-->
          删除
        </el-button>
        <el-button link type="primary" size="small" @click="handleEdit(scope.$index,scope.row)">
          修改
        </el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-dialog v-model="dialogVisible" title="修改" width="30%" draggable>
      <el-input v-model="editedRow.confession" placeholder="表白内容" />
      <el-form-item class="custom-form-item">
        <el-select v-model="editedRow.publicStatus" placeholder="请选择是否公开" class="stacked-select">
          <el-option label="匿名" value="" />
          <el-option label="公开" value={{NewuserStore.userSession.username}} /><!--记得用仓库写用户的名字-->
        </el-select>
      </el-form-item>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveEditedData">
            确认修改
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>


<script lang="ts" setup>
import {onMounted, ref, reactive, h,computed} from 'vue'

import axios from "axios";
import {ElNotification} from "element-plus";
import Sidebar from "../components/sidebar.vue";
import userStore from "../store/userStore.js";

const NewuserStore = userStore();

const filteredTableData = computed(() => {//通过计算属性，动态显示
  return tableData.map(item => ({//map遍历全部元素，返回新的数组
    ...item,//防止原始数据被改变
    publicStatus: item.name === "" ? "匿名" : "公开"
  }));
});

const tableData = reactive([]);

//删除
const res = ref([]);
onMounted(async ()=>{
  try {
    const response = await axios.get("https://mock.apifox.cn/m1/3336188-0-default/api/control/confession?apifoxApiId=112705079");
    if (response.data.code === 200 && response.data.msg === "ok" ){
      res.value = response.data.data.confession_list;
      console.log(response.data);
      res.value.forEach(e => {//优雅的写法，同时能保持list的响应式
        tableData.push(e);
      });
    }else {alert("返回错误")}
  }catch (error) {
    alert("获取请求失败");
    console.error(error);
    if (error.response) {
      console.log(error.response.data);
    }
}})


const deleteRow = (index: number) => {
  tableData.splice(index, 1);
};



const deletedata = async (e) =>{
  try {
    const response = await axios.delete("https://mock.apifox.cn/m1/3336188-0-default/api/control/confession",{
        data: {
      confession_id: e
    }
  });
    console.log(response.data);
    if (response.data.msg === "ok" && response.data.code === 200) {
      ElNotification({
        title: "删除成功",
        message: h("i", {style: "color: teal"}, "没爱了没爱了..."),
      });
    }else {alert("删除的返回有问题")}
  }catch (error) {
    alert("删除请求发送失败");
    console.error(error);
    if (error.response) {
      console.log(error.response.data);
    }
}}




//修改

const dialogVisible = ref(false);
const editedRow = ref({
  confession:"",// 根据需要定义要修改的字段
  publicStatus:"",
  confesion_id:""
});
const editedRow1 =ref({
  confession:"",
  username:"",
  confesion_id:""
})

const handleEdit = (index, row) => {
  // 打开修改对话框并加载选中行的数据
  console.log("handleEdit called");
  dialogVisible.value = true;
  editedRow.value = { ...row }; // 克隆数据，以免直接修改原始数据
  console.log(editedRow.value);
};

const saveEditedData = async () => {
  editedRow1.value.confession = editedRow.value.confession;
  editedRow1.value.username = editedRow.value.publicStatus;
  editedRow1.value.confesion_id = editedRow.value.confesion_id;
  if ( editedRow.value.confession === '') {
    dialogVisible.value = true;
    ElNotification({
      title: "修改失败！",
      message: h("i", {style: "color: teal"}, "修改不能为空哦"),
    });
  }else{
  try {
    const response = await axios.put("https://mock.apifox.cn/m1/3336188-0-default/api/control/confession?apifoxApiId=112702010",editedRow1);
    console.log(response.data);
    dialogVisible.value = false;
    if(response.data.msg === "ok" && response.data.code === 200) {
      ElNotification({
        title: "修改成功",
        message: h("i", {style: "color: teal"}, "您的表白已经修改"),
      });
    }else {alert("修改请求返回有问题")}

  } catch (error) {
    alert("上传失败");
    console.error(error);
    if (error.response) {
      console.log(error.response.data);
    }
    dialogVisible.value = false;
  }}

};

//搜索

</script>
<style>
.table-wrapper {
  margin-top: -270px; /* Adjust the value as needed */
}

.stacked-select {
  position: relative;
  top: 10px;
  left: 80px;
}
</style>
