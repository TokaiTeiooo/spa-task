<template>
  <el-container height="1000px">
    <el-aside>Aside</el-aside>
    <el-container>
      <el-header>
        <header></header>
        
      </el-header>
      <el-main>
        main
        <div class="demo-type"></div
      ></el-main>
    </el-container>
  </el-container>
</template>
<script>
import header from "../components/search";
export default {
  name: "index",
  components:{
    header
  }
};
</script>

<style  scoped>
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
  line-height: 160px;
}
</style>

