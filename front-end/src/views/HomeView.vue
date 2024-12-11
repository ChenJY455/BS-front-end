<template>
  <div style="width: 100%">
    <el-row
      style="
        padding: 10px 0;
        align-items: center;
        justify-content: center;
        color: rgb(248, 248, 248);
        background-color: rgb(57, 142, 230);
      "
    >
      <el-col
        :span="2"
        style="padding: 5px 3% 5px 3%; display: flex; justify-content: center"
      >
        <img
          src="@/assets/main-logo.png"
          alt="logo"
          style="width: 40px; height: 40px"
        />
      </el-col>
      <el-col :span="4" style="font-size: 24px"> 商品比价网站 </el-col>
      <el-col :span="4" :offset="14" style="font-size: 18px">
        <div v-if="isLogin" style="display: flex; justify-content: center">
          您好，
          <el-dropdown style="cursor: pointer">
            <div class="greeting">
              {{ username }}
              <el-icon style="margin-left: 6px"><ArrowDown /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="ToPersonal"
                  >个人主页</el-dropdown-item
                >
                <el-dropdown-item @click="LogOut">注销</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <!-- TODO: 或许来个头像？ -->
        <div v-else>
          您好，请
          <RouterLink to="/login" style="color: rgb(248, 248, 248)"
            >登录</RouterLink
          >
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <RouterLink to="/register" style="color: rgb(248, 248, 248)"
            >注册</RouterLink
          >
        </div>
      </el-col>
    </el-row>
  </div>

  <div
    style="
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 30px;
    "
  >
    <div
      style="
        width: 70%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        align-self: center;
      "
    >
      <el-dropdown trigger="click">
        <el-button
          style="height: fit-content; padding: 7px 6px; margin-right: 7px"
        >
          <img v-if="website == 'JD'" src="../assets/jd.png" class="web-icon" />
          <img v-if="website == 'TB'" src="../assets/tb.png" class="web-icon" />
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
          height: 50px;
          width: 100%;
          font-size: 18px;
          border: solid 3px rgb(57, 142, 230);
          border-radius: 5px 0 0 5px;
        "
      />
      <el-button class="search-button" @click="SearchProduct"> 搜索 </el-button>
    </div>

    <div style="width: 100%; margin-top: 30px">
      <el-row
        v-for="(row, rowIndex) in productRows"
        :key="rowIndex"
        style="
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 20px;
        "
      >
        <el-col
          v-for="(product, productIndex) in row"
          :key="productIndex"
          :span="4"
          class="product-block"
        >
          <GoodsView :product="product" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginView",
  data() {
    return {
      username: "",
      search: "",
      isLogin: false,
      page: 1,
      website: "TB",
      productRows: Array<object>(),
    };
  },
  mounted() {
    this.username = store.state.username;
    this.isLogin = store.state.isLogin;
  },
  methods: {
    LogOut() {
      store.commit("setUsername", "");
      store.commit("setIsLogin", false);
      this.username = "";
      this.isLogin = false;
    },
    ToPersonal() {
      this.$router.push("/personal");
    },
    SearchProduct() {
      const url = store.state.urlBase + "/api/goods/list";
      axios
        .get(url, {
          params: {
            keyword: this.search,
            page: this.page,
            website: this.website,
          },
        })
        .then((res) => {
          // Looger
          console.log(res);
          // 得到一个Object array，要五个一组加入productRows
          this.productRows = [];
          let row = [];
          for (let i = 0; i < res.data.length; i++) {
            row.push(res.data[i]);
            if (row.length == 5) {
              this.productRows.push(row);
              row = [];
            }
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    changeWebsite(web: string) {
      this.website = web;
      this.productRows = [];
    },
  },
});
</script>

<style scoped>
.product-block {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.web-icon {
  height: 35px;
  width: 35px;
}
.greeting {
  color: #ffffff;
  display: flex;
  align-items: center;
  font-size: 18px;
}
.input-box {
  width: 300px; /* 输入框宽度 */
  margin: 0 auto;
  display: block;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
.search-button {
  width: 70px;
  height: 52px;
  color: rgb(248, 248, 248);
  font-size: 18px;
  margin-left: -3px;
  position: relative;
  z-index: 1;
  background-color: rgb(57, 142, 230);
  border-radius: 0 5px 5px 0;
}
.search-button:hover {
  background-color: rgb(103, 159, 218);
  transition: background-color 0.5s;
}
.search-button:active {
  background-color: rgb(57, 142, 230);
}
</style>
