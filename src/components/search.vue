<template>
  <DIV>
    <div class="search">
      <el-input v-model="input" placeholder="  请输入拣货单号"> </el-input>
      <el-button type="primary" style="background-color: #3a63f5"
        >搜索</el-button
      >
    </div>
    <el-divider></el-divider>
    <div class="box">
      <div class="title">待拣货订单</div>
      <div class="tag" id="tag">
        <el-tag v-for="item in newOrders" :key="item.order_no" :type="item.status">{{
          "#" + item.order_no
        }}</el-tag>
        <span style="color:grey;font-size: large;text-align: center;" v-if="newOrders.length==0">信息不存在！</span>
      </div>
      
    </div>
  </DIV>
</template>

<script>
export default {
  name: "header-search",
  data() {
    return {
      input: "",
      pick_no: "PK00001",
      status: "wait",
      newOrders: [],
      orders: [
        {
          order_no: "C010900038",
          status:'',
          pick_no: "PK00001",
        },
        {
          order_no: "C010900039",
          status:'info',
          pick_no: "PK00002",
        },
        {
          order_no: "C010900031",
          status:'success',
          pick_no: "PK00003",
        },
        {
          order_no: "C010900032",
          status:'success',
          pick_no: "PK00004",
        },
        {
          order_no: "C1010900038",
          status:'success',
          pick_no: "PK00005",
        },
      ],
    };
  },

  methods: {
    select(input) {
      return this.orders.filter((item) => {
        if (item.pick_no == input) {
          return item;
        }
      });
    },
    getOrders() {
      this.newOrders = this.orders;
    },
  },
  created() {
    this.getOrders();
  },
  watch: {
    input: function (val) {
      if (val == "") {
        this.newOrders = this.orders;
      } else {
        this.newOrders = this.select(val);
      }
    },
  },
};
</script>

<style >
.search {
  width: 700px;
  height: 30px;
  display: flex;
  margin: 50px auto 0;
}
.el-input {
  margin: 0;
  border: 1px solid #eee;
  height: 32px;
  border-radius: 4px;
}
</style>
<style lang="less" scoped>
.box {
  position: relative;
}
.title {
  font-size: 8px;
  font-weight: 700;
  top: -15px;
  position: absolute;
  left: 25px;
}
.tag {
  width: 100%;
  justify-items: center;
  position: relative;
  top: 20px;
  left: 20px;
  white-space: nowrap;
  overflow-x: scroll;
  // 隐藏滚动条
  &::-webkit-scrollbar {
    display: none;
  }
}
.tag > * {
  margin-right: 20px;
  width: 300px;
  height: 40px;
  color: black;
  font-weight: 700;
  display: inline-block;
  text-align: left;
  line-height: 40px;
}

</style>
