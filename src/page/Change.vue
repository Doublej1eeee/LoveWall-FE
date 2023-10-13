<template>
  <sidebar></sidebar>
  <div class="table-wrapper">
  <el-table :data="tableData" style="width: 100%" max-height="250">
    <el-table-column fixed prop="date" label="发布时间" width="150" />
    <el-table-column prop="confession" label="内容" width="800" />
    <el-table-column prop="confession_id" label="公开情况" width="120"/>
      <el-table-column  label="操作" width="120">
      <template #default="{ row }">
        <el-button link type="danger" size="small" @click="deleteRow(row);deletedata(row)">
          删除
        </el-button>
        <el-button link type="primary" size="small" @click="handleEdit(row)">
          修改
        </el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-dialog v-model="dialogVisible" title="修改" width="30%" draggable>
      <el-input v-model="editedRow.confession" placeholder="表白内容" />
      <el-form-item class="custom-form-item">
        <el-select v-model="editedRow.choice" placeholder="请选择是否公开" class="stacked-select">
          <el-option label="匿名" value=0 />
          <el-option label="公开" value=1 />
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
import {onMounted, ref, reactive, h} from 'vue'

import axios from "axios";
import {ElNotification, formEmits} from "element-plus";
import Sidebar from "../components/sidebar.vue";


const tableData = reactive([]);

//删除
const res = ref([]);
onMounted(async ()=>{
  try {
    const response = await axios.get("https://mock.apifox.cn/m1/3336188-0-default/api/control/confession?apifoxApiId=112705079");
    res.value = response.data.data.confession_list;
    console.log(response.data);
    for (let i = 0;i < res.value.length;i++){
      tableData.push(res.value[i]);
    }
  }catch (error) {
    alert("上传失败");
    console.error(error);
    if (error.response) {
      console.log(error.response.data);
    }
}})
const deleteRow = (index: number) => {
  tableData.splice(index,1)
};

const deletedata = async () =>{
  try {
    const response = await axios.delete("https://mock.apifox.cn/m1/3336188-0-default/api/control/confession");
    ElNotification({
      title: "删除成功",
      message: h("i", { style: "color: teal" }, "没爱了没爱了..."),
    });
  }catch (error) {
    alert("删除失败");
    console.error(error);
    if (error.response) {
      console.log(error.response.data);
    }
}}

const changeRow = async () => {
  try{
    const response = await axios.put("")
  }catch (error) {
    alert("删除失败");
    console.error(error);
    if (error.response) {
      console.log(error.response.data);
    }
}}



//修改

const dialogVisible = ref(false);
const editedRow = ref({
  confession:"",// 根据需要定义要修改的字段
  choice:null
});

const handleEdit = (index, row) => {
  // 打开修改对话框并加载选中行的数据
  console.log("handleEdit called");
  dialogVisible.value = true;
  editedRow.value = { ...row }; // 克隆数据，以免直接修改原始数据
};

const saveEditedData = async () => {
  // 在这里执行保存修改的操作
  // 更新数据源中的数据或提交到后端等操作
  // 然后关闭对话框
  try {
    const response = await axios.put("https://mock.apifox.cn/m1/3336188-0-default/api/control/confession?apifoxApiId=112702010",editedRow);
    console.log(response.data);

  } catch (error) {
    alert("上传失败");
    console.error(error);
    if (error.response) {
      console.log(error.response.data);
    }
  }
  dialogVisible.value = false;
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
