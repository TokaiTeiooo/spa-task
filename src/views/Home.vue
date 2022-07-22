<template>
  <el-container >
    <!-- Aside -->
    <el-aside></el-aside>
    <!-- header -->
    <el-container>
      <el-header style="padding-top: 30px;" height="270px">
        <header-title></header-title>
        <el-divider></el-divider>
        <header-search></header-search>
      </el-header>
      <!-- main -->
      <el-main>
        <main-vue></main-vue>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
import headerTitle from "../components/header.vue";
import headerSearch from "../components/search.vue";
import mainVue from "../components/main.vue";
export default {
  name: "Home",
  components: {
    headerTitle,
    headerSearch,
    mainVue,
  },
};
</script>

<style lang="less" scoped>
.breadcrumb:nth-child(1) {
  margin-top: 30px;
  margin-left: -10px;
}
.el-container {
  margin: 0;
  padding: 0;
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  padding: 0;
}

.el-aside {
  background-color: #001121;
  line-height: 100% !important;
  width: 5% !important;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 50px;
}
</style>

