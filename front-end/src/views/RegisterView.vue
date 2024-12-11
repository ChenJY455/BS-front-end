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
            注册
          </h1>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.username"
            placeholder="请输入账号名，长度大于6个字符"
            size="large"
          />
          <div
            v-if="error_display.username"
            style="font-size: 12px; color: red"
          >
            {{ error_info.username }}
          </div>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.email"
            placeholder="请输入邮箱"
            size="large"
          />
          <div v-if="error_display.email" style="font-size: 12px; color: red">
            {{ error_info.email }}
          </div>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码，长度大于6个字符"
            size="large"
            show-password
          />
          <div
            v-if="error_display.password"
            style="font-size: 12px; color: red"
          >
            {{ error_info.password }}
          </div>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.password_confirm"
            type="password"
            placeholder="请再次输入密码"
            size="large"
            show-password
          />
          <div
            v-if="error_display.password_confirm"
            style="font-size: 12px; color: red"
          >
            {{ error_info.password_confirm }}
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleRegister"
            style="width: 100%"
            size="large"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import store from "@/store";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "RegisterView",
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        password_confirm: "",
      },
      error_display: {
        username: false,
        email: false,
        password: false,
        password_confirm: false,
      },
      error_info: {
        username: "用户名长度不能小于6个字符",
        email: "请输入正确的邮箱",
        password: "密码长度不能小于6个字符",
        password_confirm: "两次输入的密码不一致",
      },
    };
  },
  methods: {
    handleRegister() {
      let pass = true;
      if (this.form.username.length < 6) {
        this.error_display.username = true;
        pass = false;
      } else {
        this.error_display.username = false;
      }
      if (this.form.password.length < 6) {
        this.error_display.password = true;
        pass = false;
      } else {
        this.error_display.password = false;
      }
      if (
        !this.form.email.match(
          /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/
        )
      ) {
        this.error_display.email = true;
        pass = false;
      } else {
        this.error_display.email = false;
      }
      if (this.form.password != this.form.password_confirm) {
        this.error_display.password_confirm = true;
        pass = false;
      } else {
        this.error_display.password_confirm = false;
      }
      if (pass) {
        const url = store.state.urlBase + "/api/register";
        axios
          .get(url, {
            params: {
              username: this.form.username,
              email: this.form.email,
              password: this.form.password,
            },
          })
          .then((res) => {
            console.log(res);
            store.commit("setUsername", this.form.username);
            this.$router.push("/");
          })
          .catch((err: unknown) => {
            console.error(err);
            ElMessage.error("注册失败");
          });
      }
    },
  },
});
</script>

<style scoped>
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
