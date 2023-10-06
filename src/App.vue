<script setup lang="ts">
import { RouterView } from "vue-router";
import myHeader from "./components/header.vue";
import myFooter from "./components/footer.vue";
import LoveBackground from "./components/LoveBackground.vue";
</script>

<template>
  <el-container>
    <LoveBackground/>
    <el-header>
      <my-header></my-header>
    </el-header>
    <router-view />
    <el-footer>
      <my-footer ></my-footer>
    </el-footer>
  </el-container>
</template>

<style scoped>

</style>
