<template>
  <div class="demo-type">
    <el-container>
      <!-- 待拣货的商品 -->
      <el-aside
        class="aside"
        style="background-color: #fff; margin-top: 10px"
        width="250px"
      >
        <div class="title"><span>待拣货商品</span></div>
        <div class="box-card">
          <el-tag
            v-for="item in newItems"
            :key="item.sku"
            :type="item.status"
            style="margin: 0"
          >
            <img alt="" style="width: 40px; height: 40px; margin-top: 5px" />
            <span class="name">{{ item.name }}</span>
            <span class="foods_num"
              >{{ item.in_box_qty }}/{{ item.order_qty }}</span
            >
          </el-tag>
        </div>
      </el-aside>
      <el-container>
        <!-- 订单信息 -->
        <el-main
          class="info"
          style="background-color: #fff; margin: 10px 0 10px 10px"
        >
          <el-descriptions title="订单信息" :column="3" :row="3">
            <el-descriptions-item label="仓库">{{
              orders[0].order_no
            }}</el-descriptions-item>
            <el-descriptions-item label="商品数量">{{
              orders[0].order_no
            }}</el-descriptions-item>
            <el-descriptions-item label="目的地">{{
              orders[0].destination
            }}</el-descriptions-item>
            <el-descriptions-item label="所属客户">{{
              orders[0].user
            }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{
              orders[0].remark
            }}</el-descriptions-item>
          </el-descriptions>
        </el-main>
        <!-- 包裹装箱 -->
        <el-footer
          height="1400px"
          style="background-color: #fff; margin-left: 10px"
        >
          <div class="boxes">
            <span>包裹装箱</span>
            <el-select clearable v-model="value" placeholder="请选择">
              <el-option
                v-for="item in orders"
                :key="item.boxes[0].box_no"
                :label="item.boxes[0].box_no"
                :value="item.boxes[0].box_no"
              >
              </el-option>
            </el-select>
            <el-input v-model="input" placeholder="  请扫入SKU"> </el-input>
            <el-select
              style="width: 100px"
              v-model="sku"
              placeholder="选择商品"
              clearable
            >
              <el-option
                v-for="item in foods[0].items"
                :key="item.sku"
                :label="item.sku"
                :value="item.sku"
              >
              </el-option>
            </el-select>
          </div>
          <div class="foods_info">
            <ul
              style="line-height: 160px"
              v-for="item in skus"
              :key="item.order_no"
            >
              <img
                src=""
                alt=""
                style="width: 70px; height: 70px; margin: 0 10px 40px"
              />
              <li style="width: 25%; text-align: left">
                <span class="foods">商品</span>
                <p>{{ skus[0].name }}</p>
              </li>
              <li>{{ skus[0].sku }}</li>
              <li style="font-weight: 700; font-size: 50px">
                <span>箱号</span>{{ value }}
              </li>
              <li style="font-weight: 700; font-size: 30px">
                <span>待装箱数量</span>
                <i style="color: red; font-style: inherit">{{
                  skus[0].in_box_qty
                }}</i>
                {{ "/" + skus[0].order_qty }}
              </li>
              <li>
                <span>本次装箱数量</span>
                <el-input
                  v-model="num"
                  @keyup.enter.native="submitNumber"
                  placeholder="请输入数量"
                ></el-input>
              </li>
            </ul>
          </div>
          <div
            class="foods_info2"
            style="height: 50px; text-align: left; line-height: 50px"
          >
            <span> &lt; </span>
            <el-tag
              style="
                color: black;
                background-color: #eee;
                height: 30px;
                width: 100px;
              "
              :key="tag"
              v-for="tag in box_num"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button
              style="background-color: #eee"
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
              >+</el-button
            >
            <span>></span>
          </div>
          <el-table
            border
            :span-method="objectSpanMethod"
            class="tabbox"
            max-height="500px"
            :data="box_add"
            style="width: 100%"
          >
            <el-table-column prop="" label="箱号" width="180">
              {{ orders[0].boxes[0].box_no }}
            </el-table-column>
            <el-table-column label="商品图片" width="180">
              <img style="width: 50px; height: 50px" alt="" />
            </el-table-column>
            <el-table-column prop="name" label="商品名称"> </el-table-column>
            <el-table-column prop="sku" label="SKU"> </el-table-column>
            <el-table-column prop="order_qty" label="下单数量">
            </el-table-column>
            <el-table-column prop="in_box_qty" label="装箱数量">
              <el-input v-model="num" placeholder="请输入数量"></el-input>
            </el-table-column>
            <el-table-column prop="status" label="装箱状态">
              <template>
                {{ "order_qty" == "in_box_qty" ? "装箱完成" : "装箱中" }}
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- 提交按钮 -->
          <div style="width: 100%; height: 70px">
            <el-row style="float: right">
              <el-button disabled>取消</el-button>
              <el-button disabled>打印单据</el-button>
              <el-button
                style="
                  color: #3a63f5;
                  border-color: #3a63f5;
                  width: 100px;
                  font-size: 13px;
                "
                >保存</el-button
              >
              <el-button
                style="
                  color: #fff;
                  background-color: #3a63f5;
                  width: 100px;
                  font-size: 13px;
                "
                type="primary"
                >提交出库</el-button
              >
            </el-row>
          </div>

          <!-- 包裹装箱 -->
          <div
            class="boxes_info"
            style="
              width: 100%;
              height: 300px;
              display: flex;
              flex-flow: column;
              text-align: left;
              font-weight: 700;
            "
          >
            <div class="box_weight">
              <el-descriptions
                title="包裹装箱"
                direction="vertical"
                :column="8"
                border
              >
                <el-descriptions-item>
                  <span
                    style="
                      font-size: 50px;
                      font-weight: normal;
                      background-color: #f5f5f5;
                      display: block;
                      text-align: center;
                    "
                    >1</span
                  >
                </el-descriptions-item>
                <el-descriptions-item style="display: flex" label="*箱体重量">
                  <el-input
                    placeholder="总重量"
                    suffix-icon="el-icon-date"
                    v-model="input1"
                  >
                  </el-input>
                  <el-tag size="small">修改</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="长">
                  <el-input
                    placeholder="长"
                    suffix-icon="el-icon-date"
                    v-model="input2"
                  >
                  </el-input>
                  <el-tag size="small">修改</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="宽" :span="2">
                  <el-input
                    placeholder="宽"
                    suffix-icon="el-icon-date"
                    v-model="input3"
                  >
                  </el-input>
                  <el-tag size="small">修改</el-tag></el-descriptions-item
                >
                <el-descriptions-item label="高">
                  <el-input
                    placeholder="高"
                    suffix-icon="el-icon-date"
                    v-model="input4"
                  >
                  </el-input>
                  <el-tag size="small">修改</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="体积中">
                  <span style="font-size: 12px; font-weight: 700">5.85</span>
                </el-descriptions-item>
                <el-descriptions-item label="计费重">
                  <span style="font-size: 12px; font-weight: 700">5.85</span>
                </el-descriptions-item>
              </el-descriptions>
            </div>
            <div class="box_weight" style="margin: 20px 0">
              <el-descriptions direction="vertical" :column="8" border>
                <el-descriptions-item>
                  <span
                    style="
                      font-size: 50px;
                      font-weight: normal;
                      background-color: #f5f5f5;
                      display: block;
                      text-align: center;
                    "
                    >2</span
                  >
                </el-descriptions-item>
                <el-descriptions-item style="display: flex" label="*箱体重量">
                  <el-input
                    placeholder="总重量"
                    suffix-icon="el-icon-date"
                    v-model="input1"
                  >
                  </el-input>
                  <el-tag size="small">修改</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="长">
                  <el-input
                    placeholder="长"
                    suffix-icon="el-icon-date"
                    v-model="input2"
                  >
                  </el-input>
                  <el-tag size="small">修改</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="宽" :span="2">
                  <el-input
                    placeholder="宽"
                    suffix-icon="el-icon-date"
                    v-model="input3"
                  >
                  </el-input>
                  <el-tag size="small">修改</el-tag></el-descriptions-item
                >
                <el-descriptions-item label="高">
                  <el-input
                    placeholder="高"
                    suffix-icon="el-icon-date"
                    v-model="input4"
                  >
                  </el-input>
                  <el-tag size="small">修改</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="体积中">
                  <span style="font-size: 12px; font-weight: 700">5.85</span>
                </el-descriptions-item>
                <el-descriptions-item label="计费重">
                  <span style="font-size: 12px; font-weight: 700">5.85</span>
                </el-descriptions-item>
              </el-descriptions>
            </div>
            <div class="box_weight">
              <el-descriptions direction="vertical" :column="8" border>
                <el-descriptions-item>
                  <span
                    style="
                      font-size: 50px;
                      font-weight: normal;
                      background-color: #f5f5f5;
                      display: block;
                      text-align: center;
                    "
                    >3</span
                  >
                </el-descriptions-item>
                <el-descriptions-item style="display: flex" label="*箱体重量">
                  <el-input
                    placeholder="总重量"
                    suffix-icon="el-icon-date"
                    v-model="input1"
                  >
                  </el-input>
                  <el-tag size="small">修改</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="长">
                  <el-input
                    placeholder="长"
                    suffix-icon="el-icon-date"
                    v-model="input2"
                  >
                  </el-input>
                  <el-tag size="small">修改</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="宽" :span="2">
                  <el-input
                    placeholder="宽"
                    suffix-icon="el-icon-date"
                    v-model="input3"
                  >
                  </el-input>
                  <el-tag size="small">修改</el-tag></el-descriptions-item
                >
                <el-descriptions-item label="高">
                  <el-input
                    placeholder="高"
                    suffix-icon="el-icon-date"
                    v-model="input4"
                  >
                  </el-input>
                  <el-tag size="small">修改</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="体积中">
                  <span style="font-size: 12px; font-weight: 700">5.85</span>
                </el-descriptions-item>
                <el-descriptions-item label="计费重">
                  <span style="font-size: 12px; font-weight: 700">5.85</span>
                </el-descriptions-item>
              </el-descriptions>
            </div>
            <!-- 物流信息 -->
            <div class="trans_info">
              <el-descriptions
                direction="vertical"
                title="物流信息"
                :column="8"
                border
              >
                <template slot="extra">
                  <el-button
                    type="primary"
                    style="color: #4a70f6; padding: 2px; background-color: #fff"
                    size="small"
                    @click="multi_orders"
                  >
                    多箱多个物流单号
                  </el-button>
                  <el-button
                    style="color: #4a70f6; padding: 2px; background-color: #fff"
                    type="primary"
                    size="small"
                    @click="single_orders"
                  >
                    多箱一个物流单号
                  </el-button>
                </template>
              </el-descriptions>
              <el-descriptions
                v-for="(item, index) in orders_kind"
                :key="item.order_no"
                direction="vertical"
                :column="8"
                border
              >
                <el-descriptions-item>
                  <span
                    style="
                      font-size: 50px;
                      font-weight: normal;
                      background-color: #f5f5f5;
                      display: block;
                      text-align: center;
                    "
                  >
                    {{ index + 1 }}
                  </span>
                </el-descriptions-item>
                <el-descriptions-item style="display: flex" label="*物流公司">
                  <el-select v-model="input6" placeholder="请输入物流单号">
                    <el-option label="#1" :value="item.value"> </el-option>
                  </el-select>
                </el-descriptions-item>
                <el-descriptions-item label="物流单号">
                  <el-input placeholder="请输入物流单号" v-model="input5">
                  </el-input>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
          <!-- 物流信息 -->
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "main-1",
  data() {
    return {
      newItems: [],
      value: "",
      input: "",
      num: "",
      sku: "",
      skus: [],
      foods: [],
      box_num: [],
      box_add: [],
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input4: "",
      input5: "",
      input6: "",
      input7: "",
      input8: "",
      input9: "",
      orders_kind: [],
      pick_no: "PK00001",
      status: "wait",

      activeName: "second",
      orders: [
        {
          order_no: "C010900038",
          product_qty: 700,
          destination: ["中国", "广东省", "龙岗区", "某某大厦"],
          user: "张三",
          remark: "备注",
          items: [
            {
              sku: "SKU-1",
              pic: "",
              name: "商品名称1",
              order_qty: 60,
              in_box_qty: 0,
              status: "info",
            },
            {
              sku: "SKU-2",
              pic: "",
              name: "商品名称2",
              order_qty: 100,
              in_box_qty: 1,
              status: "danger",
            },
            {
              sku: "SKU-3",
              pic: "",
              name: "商品名称3",
              order_qty: 100,
              in_box_qty: 100,
              status: "success",
            },
            {
              sku: "SKU-4",
              pic: "",
              name: "商品名称4",
              order_qty: 100,
              in_box_qty: 2,
              status: "danger",
            },
            {
              sku: "SKU-5",
              pic: "",
              name: "商品名称5",
              order_qty: 100,
              in_box_qty: 100,
              status: "success",
            },
            {
              sku: "SKU-6",
              pic: "",
              name: "商品名称6",
              order_qty: 100,
              in_box_qty: 100,
              status: "success",
            },
            {
              sku: "SKU-7",
              pic: "",
              name: "商品名称7",
              order_qty: 100,
              in_box_qty: 100,
              status: "success",
            },
          ],
          boxes: [
            {
              box_no: "#1",
              skus: [
                {
                  sku: "",
                  in_box_qty: "",
                },
              ],
              weight: 0,
              length: 0,
              width: 0,
              height: 0,
              track_number: "",
            },
          ],
        },
        {
          order_no: "C010900039",
          product_qty: 700,
          destination: ["中国", "广东省", "龙岗区", "某某大厦"],
          user: "张三",
          remark: "备注",
          items: [
            {
              sku: "SKU-1",
              pic: "",
              name: "商品名称1",
              order_qty: 60,
              in_box_qty: 0,
              status: "info",
            },
            {
              sku: "SKU-2",
              pic: "",
              name: "商品名称2",
              order_qty: 100,
              in_box_qty: 1,
              status: "danger",
            },
            {
              sku: "SKU-3",
              pic: "",
              name: "商品名称3",
              order_qty: 100,
              in_box_qty: 100,
              status: "success",
            },
            {
              sku: "SKU-4",
              pic: "",
              name: "商品名称4",
              order_qty: 100,
              in_box_qty: 2,
              status: "danger",
            },
            {
              sku: "SKU-5",
              pic: "",
              name: "商品名称5",
              order_qty: 100,
              in_box_qty: 100,
              status: "success",
            },
            {
              sku: "SKU-6",
              pic: "",
              name: "商品名称6",
              order_qty: 100,
              in_box_qty: 100,
              status: "success",
            },
            {
              sku: "SKU-7",
              pic: "",
              name: "商品名称7",
              order_qty: 100,
              in_box_qty: 100,
              status: "success",
            },
          ],
          boxes: [
            {
              box_no: "#2",
              skus: [
                {
                  sku: "",
                  in_box_qty: "",
                },
              ],
              weight: 0,
              length: 0,
              width: 0,
              height: 0,
              track_number: "",
            },
          ],
        },
      ],
      orders2: [
        {
          items: [],
        },
      ],
      dynamicTags: ["标签一", "标签二", "标签三"],
      inputVisible: false,
      inputValue: "",
    };
  },
  methods: {
    confirm_status(item) {
      for (let i = 0; i < item.length; i++) {
        if (item[i].in_box_qty == 0) {
          item[i].status = "info";
        } else {
          item[i].order_qty > 0 && item[i].in_box_qty < item[i].order_qty
            ? (item[i].status = "danger")
            : (item[i].status = "success");
        }
      }
    },
    sort_by_status(item) {
      for (let i = 0; i < item.length; i++) {
        if (item[i].status == "success") {
          this.newItems.push(item[i]);
        }
        if (item[i].status == "danger" || item[i].status == "info") {
          this.newItems.unshift(item[i]);
        }
      }
    },
    select(input) {
      return this.orders[0].items.filter((item) => {
        if (item.sku == input) {
          if (this.num) {
            this.submitNumber();
          }
          this.num = 1;
          return item;
        }
      });
    },
    sku_select(input) {
      return this.orders.filter((item) => {
        if (item.boxes[0].box_no == input) {
          return item;
        }
      });
    },
    init_goods() {
      this.foods = this.orders2;
      Object.assign(this.orders_kind, this.orders);
    },
    submitNumber() {
      if (this.box_num.indexOf(this.value) == -1) {
        this.box_num.push(this.value);
      }
      this.box_add.box_no = this.value;
      this.box_add.push(this.skus[0]);
      console.log(this.box_add);
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: 10,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
    single_orders() {
      if (this.orders_kind.length > 1) {
        this.orders_kind.pop();
        this.orders_kind.length = 1;
      }
      console.log(this.orders_kind);
    },
    multi_orders() {
      if (this.orders_kind.length <= 2) {
        this.orders_kind.push(this.orders[1]);
        console.log(this.orders);
      }
    },
  },
  created() {
    this.confirm_status(this.orders[0].items);
    this.sort_by_status(this.orders[0].items);
    this.init_goods();
  },
  computed: {
    status_define: function () {
      return this.status == "success" ? "装箱完成" : "装箱中";
    },
  },
  watch: {
    input: function (val) {
      this.skus = this.select(val);
    },
    value: function (val) {
      val == ""
        ? (this.foods = this.orders2)
        : (this.foods = this.sku_select(val));
    },
    sku: function (val) {
      this.skus = this.select(val);
    },
  },
};
</script>

<style lang="less" scoped>
.aside {
  position: relative;
  overflow: hidden;
  .title {
    position: absolute;
    font-size: 8px;
    font-weight: 700;
    height: 50px;
    width: 200px;
    line-height: 50px;
    text-align: left;
    left: 20px;
    display: block;
    // padding-left: 20px;
  }

  .box-card {
    width: 250px;
    display: flex;
    flex-flow: column;
    padding: 0;
    margin-top: 50px;
    .el-tag {
      width: 250px;
      height: 50px;
      position: relative;
      display: inline-block;
      color: #000;
      .name,
      img {
        font-size: xx-small;
        font-weight: 600;
        height: 50px;
        float: left;
        line-height: 50px;
        margin: 0 8px;
      }
      .foods_num {
        font-size: xxx-small;
        font-weight: 700;
        height: 50px;
        float: right;
        line-height: 50px;
        margin-right: 10px;
      }
    }
  }
}
.info {
  padding-top: 0;
  // overflow: hidden;
  table {
    display: flex;
    flex-flow: column;
    overflow: hidden;

    tr {
      height: 50px;
      th {
        height: 50px;
        text-align: left;
        line-height: 50px;
      }
      td {
        font-size: 8px;
        height: 50px !important;
        line-height: 50px;
        padding-right: 200px;
      }
    }
  }
}
.boxes {
  display: flex;
  height: 70px;
  position: relative;
  justify-content: end;
  align-items: center;
  span {
    width: 100px;
    height: 50px;
    line-height: 50px;
    font-weight: 700;
    position: absolute;
    left: -10px;
  }
  .el-input {
    border: 1px solid #4269f5;
    width: 400px;
    margin: 0 15px;
  }
  .el-select {
    height: 30px;
    border-radius: 5px;
    border: 1px solid #4269f5;
    width: 150px;
  }
}
.foods_info {
  height: 150px;
  border: 1px solid #eee;
  border-radius: 5px;
  font-size: 12px;
  overflow: hidden;
  ul {
    width: 100%;
    display: flex;
    list-style: none;
    align-items: center;
    li {
      width: 150px;
      margin-left: 10px;
      position: relative;
      p {
        height: 100px;

        line-height: 20px;
      }
      .foods {
        position: absolute;
        top: -25px;
        left: 0px;
        height: 30px;
        line-height: 30px;
        font-size: small;
        font-weight: 700;
      }
      span {
        position: absolute;
        // top: -25px;
        left: 0px;
        height: 30px;
        line-height: 30px;
        font-size: small;
        font-weight: 700;
      }
      .el-input {
        border: 1px solid #4269f5;
        margin: 0 15px;
        height: 30px;
      }
    }
  }
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.foods_info2 {
  span {
    margin: 0 15px;
    font-size: small;
  }
}
.box_weight {
  display: flex;
  .el-descriptions {
    /deep/ .is-bordered-label {
      background-color: #fff !important;
    }
    /deep/ .is-bordered-label {
      color: #000;
      font-weight: 500;
      padding: 5px;
      font-size: 12px;
    }
  }
  /deep/ .el-descriptions-item__cell {
    padding: 0;
  }

  /deep/ .el-input {
    // width: 100px;

    float: left;
  }
}
.trans_info {
  display: flex;
  flex-flow: column;
  .el-descriptions {
    width: 100%;
  }
  span {
    width: 99px;
  }
  /deep/ .el-descriptions-item__cell {
    padding: 0;
  }
  /deep/ .is-bordered-label {
    color: #000;
    font-weight: 500;
    padding: 5px;
    font-size: 12px;
  }
  /deep/ .is-bordered-label {
    background-color: #fff !important;
  }
}
</style>