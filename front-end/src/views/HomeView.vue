<template>
  <el-container>
    <el-header>
      <div v-if="username != ''" class="greet">您好，{{ username }}</div>
      <div v-else class="greet">
        您好，请
        <RouterLink
          to="/login"
          style="color: rgb(63, 158, 255); text-decoration: none"
          >登录</RouterLink
        >
        |
        <RouterLink
          to="/register"
          style="color: rgb(63, 158, 255); text-decoration: none"
          >免费注册</RouterLink
        >
      </div>
    </el-header>

    <el-main>
      <el-input
        v-model="search"
        placeholder="搜索"
        style="
          height: 50px;
          font-size: 18px;
          border: solid 3px rgb(63, 158, 255);
          border-radius: 5px;
        "
      />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginView",
  data() {
    return {
      username: "",
      search: "",
    };
  },
  mounted() {
    const name = this.$route.query.username as string | undefined;
    if (name) {
      this.username = name;
      console.log("name", name);
    }
  },
});
</script>

<style>
.greet {
  font-size: large;
  margin-left: 35px;
  margin-top: 25px;
}
</style>
