<template>
  <div class="container" style="background-color: rgb(245, 246, 250)">
    <div class="box">
      <el-form :model="form" label-width="auto" style="width: 330px">
        <el-form-item>
          <h1
            style="
              width: 100%;
              font-size: 28px;
              margin-top: 30px;
              text-align: center;
            "
          >
            登录
          </h1>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.username"
            placeholder="请输入账号名"
            size="large"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            size="large"
            showpassword
          />
          <div v-if="!loginpass" style="font-size: 12px; color: red">
            您输入的用户名或密码有误
          </div>
        </el-form-item>
        <div
          style="
            margin-bottom: 10px;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          "
        >
          <el-checkbox v-model="form.rempass" style="color: black"
            >记住密码</el-checkbox
          >
          <RouterLink
            to="/register"
            style="
              display: inline;
              font-size: 14px;
              color: black;
              text-decoration: none;
              margin-right: 5px;
            "
            >免费注册</RouterLink
          >
        </div>
        <el-button
          type="primary"
          @click="handleLogin"
          style="width: 100%"
          size="large"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import store from "@/store";
import { ElMessage } from "element-plus";
// import { AxiosResponse } from "axios";

export default defineComponent({
  name: "LoginView",
  data() {
    return {
      form: {
        username: localStorage.getItem("username") || "",
        password: localStorage.getItem("password") || "",
        rempass: localStorage.getItem("password") ? true : false,
      },
      loginpass: true,
    };
  },
  methods: {
    handleLogin() {
      // Send request
      const url = store.state.urlBase + "/api/login";
      axios
        .post(url, {
          username: this.form.username,
          password: this.form.password,
        })
        .then(() => {
          // Remember the password
          localStorage.setItem("username", this.form.username);
          if (this.form.rempass) {
            localStorage.setItem("password", this.form.password);
          } else {
            localStorage.removeItem("password");
          }

          this.loginpass = true;
          // Redirect to the home page with the user's information
          store.commit("setUsername", this.form.username);
          this.$router.push("/");
        })
        .catch((err: unknown) => {
          console.error(err);
          ElMessage.error("登录失败");
          this.loginpass = false;
        });
    },
  },
});
</script>

<style>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 40px;
  border-radius: 10px;
  background-color: white;
}
</style>
