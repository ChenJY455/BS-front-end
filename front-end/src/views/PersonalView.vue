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
                <el-dropdown-item>个人主页</el-dropdown-item>
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
  <el-container
    style="display: flex; flex-direction: row; justify-content: center"
  >
    <div style="margin-right: 20px">
      <img
        src="../assets/jd.png"
        class="web-icon"
        style="width: 100px; height: 100px"
      />
    </div>
    <div style="display: flex; flex-direction: column; justify-content: center">
      <div>Uid: {{ uid }}</div>
      <div>Username: {{ username }}</div>
      <div>email: {{ email }}</div>
    </div>
  </el-container>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";

export default defineComponent({
  name: "PersonalView",
  data() {
    return {
      uid: 0,
      username: "",
      email: "",
      isLogin: false,
    };
  },
  methods: {
    LogOut() {
      store.commit("setUsername", "");
      store.commit("setIsLogin", false);
      this.username = "";
      this.isLogin = false;
    },
  },
  mounted() {
    this.uid = store.state.uid;
    this.username = store.state.username;
    this.email = store.state.email;
    this.isLogin = store.state.isLogin;
  },
});
</script>
