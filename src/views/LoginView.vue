<template>
  <div class="container" style="background-color: rgb(245, 246, 250)">
    <div id="login-box">
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
            v-model="form.name"
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
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleLogin"
            style="width: 100%; margin-top: 15px"
            size="large"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "LoginView",
  data() {
    return {
      form: {
        name: "",
        password: "",
      },
    };
  },
  methods: {
    handleLogin() {
      console.log(this.form);
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
#login-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 40px;
  border-radius: 10px;
  background-color: white;
}
</style>
