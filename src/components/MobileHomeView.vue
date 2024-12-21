<template>
  <div style="width: 100%">
    <div
      style="
        padding: 3vw 0;
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: center;
        color: rgb(248, 248, 248);
        background-color: rgb(57, 142, 230);
      "
    >
      <div style="display: flex; justify-content: center">
        <img
          src="@/assets/main-logo.png"
          alt="logo"
          style="width: 10vw; height: 10vw; margin-right: 5vw"
        />
      </div>
      <div style="font-size: 6vw">商品比价网站</div>
    </div>

    <div
      style="
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 5vh;
      "
    >
      <div
        style="
          width: 70%;
          height: fit-content;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          align-self: center;
        "
      >
        <el-dropdown trigger="click">
          <el-button
            style="
              height: fit-content;
              max-height: 6vh;
              padding: 4px 3px;
              margin-right: 7px;
            "
          >
            <img
              v-if="website == 'JD'"
              src="../assets/jd.png"
              class="web-icon"
            />
            <img
              v-if="website == 'TB'"
              src="../assets/tb.png"
              class="web-icon"
            />
            <el-icon style="margin-left: 9px"><CaretBottom /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="changeWebsite('TB')"
                >淘宝</el-dropdown-item
              >
              <el-dropdown-item @click="changeWebsite('JD')"
                >京东</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-input
          v-model="search"
          placeholder="请输入商品名称"
          style="
            height: 6vh;
            width: 100%;
            font-size: 2.5vh;
            border: solid 3px rgb(57, 142, 230);
            border-radius: 5px 0 0 5px;
          "
        />
        <el-button class="search-button" @click="SearchProduct">
          搜索
        </el-button>
      </div>
    </div>

    <div style="width: 100%; margin-top: 5vh">
      <el-row
        v-for="(row, rowIndex) in productRows"
        :key="rowIndex"
        style="
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 5vh;
        "
      >
        <div v-for="product in row" :key="product.gid" class="product-block">
          <GoodsView
            :product="product"
            :showLikes="false"
            style="width: 45vw; margin: 0 2vw"
          />
        </div>
      </el-row>
    </div>
    <div
      style="
        width: 100%;
        margin-top: 20px;
        margin-bottom: 40px;
        display: flex;
        flex-direction: row;
        justify-content: center;
      "
    >
      <el-button
        v-if="page > 1"
        @click="lastPage"
        style="margin-right: 10px"
        type="primary"
        >上一页</el-button
      >
      <el-button v-if="productRows.length != 0" @click="nextPage" type="primary"
        >下一页</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import axios, { AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PCHomeView",
  data() {
    return {
      search: "",
      website: "TB",
      page: 1,
      productRows: [] as Array<
        Array<{ name: string; price: number; imageUrl: string; gid: number }>
      >,
    };
  },
  methods: {
    SearchProduct() {
      const url = process.env.VUE_APP_API_URL + "/api/goods/get-list";
      axios
        .get(url, {
          params: {
            keyword: this.search,
            page: this.page,
            website: this.website,
          },
        })
        .then((res) => {
          // Loger
          console.log(res);
          this.productRows = [];
          this.updataProduct(res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    updataProduct(res: AxiosResponse) {
      // 得到一个Object array，要2个一组加入productRows
      this.productRows = [];
      let row = [];
      for (let i = 0; i < res.data.length; i++) {
        row.push(res.data[i]);
        if (row.length == 2) {
          this.productRows.push(row);
          row = [];
        }
      }
    },
    changeWebsite(web: string) {
      this.website = web;
      this.productRows = [];
      this.SearchProduct();
    },
    nextPage() {
      const url = process.env.VUE_APP_API_URL + "/api/goods/get-list";
      axios
        .get(url, {
          params: {
            keyword: this.search,
            page: this.page + 1,
            website: this.website,
          },
        })
        .then((res) => {
          if (res.data.length == 0) {
            ElMessage("已经是最后一页了");
          } else {
            this.page++;
            this.updataProduct(res);
            window.scrollTo({ top: 0 });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    lastPage() {
      if (this.page > 1) {
        const url = process.env.VUE_APP_API_URL + "/api/goods/get-list";
        axios
          .get(url, {
            params: {
              keyword: this.search,
              page: this.page - 1,
              website: this.website,
            },
          })
          .then((res) => {
            this.page--;
            this.updataProduct(res);
            window.scrollTo({ top: 0 });
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        ElMessage("已经是第一页了");
      }
    },
  },
});
</script>

<style scoped>
.web-icon {
  height: 8vw;
  width: 8vw;
}
.search-button {
  width: 12vw;
  height: 6vh;
  color: rgb(248, 248, 248);
  font-size: 2.5vh;
  margin-left: -3px;
  position: relative;
  z-index: 1;
  background-color: rgb(57, 142, 230);
  border-radius: 0 5px 5px 0;
}
</style>
