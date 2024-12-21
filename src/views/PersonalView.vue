<template>
  <div class="page" style="height: fit-content; min-height: 100vh">
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

    <!-- History -->
    <el-dialog v-model="historyDialogVisible">
      <h3
        style="
          max-width: 100%;
          height: 22px;
          font-size: 20px;
          margin: 10px 25px;
          text-align: center;
        "
      >
        {{ selectedName }}
      </h3>
      <div style="margin-left: 20px; margin-top: 30px">
        <EchartsView :t="t" :price="price" />
      </div>
    </el-dialog>

    <!-- Modify -->
    <el-dialog v-model="modifyDialogVisible" center="true" width="550px">
      <el-form
        :model="form"
        label-width="auto"
        style="
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        "
      >
        <el-form-item>
          <h1
            style="
              width: 100%;
              font-size: 28px;
              margin-top: 10px;
              text-align: center;
            "
          >
            修改信息
          </h1>
        </el-form-item>
        <el-form-item style="width: 80%; display: flex; flex-direction: row">
          账号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-input
            v-model="form.username"
            placeholder="请输入新的账号名，长度大于6个字符"
            size="large"
            style="width: 80%"
          />
          <div
            v-if="error_display.username"
            style="font-size: 12px; color: red"
          >
            {{ error_info.username }}
          </div>
        </el-form-item>
        <el-form-item style="width: 80%; display: flex; flex-direction: row">
          密码：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入新的密码，长度大于6个字符"
            size="large"
            style="width: 80%"
          />
          <div
            v-if="error_display.password"
            style="font-size: 12px; color: red"
          >
            {{ error_info.password }}
          </div>
        </el-form-item>
        <el-form-item style="width: 80%; display: flex; flex-direction: row">
          确认密码：
          <el-input
            v-model="form.password_confirm"
            type="password"
            placeholder="请再次输入密码"
            size="large"
            style="width: 80%"
          />
          <div
            v-if="error_display.password_confirm"
            style="font-size: 12px; color: red"
          >
            {{ error_info.password_confirm }}
          </div>
        </el-form-item>
        <el-form-item style="width: 80%; display: flex; flex-direction: row">
          邮箱：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-input
            v-model="form.email"
            placeholder="请输入新的邮箱"
            size="large"
            style="width: 80%"
          />
          <div v-if="error_display.email" style="font-size: 12px; color: red">
            {{ error_info.email }}
          </div>
        </el-form-item>
        <el-form-item style="margin-top: 5px">
          <el-button
            @click="modifyDialogVisible = false"
            size="large"
            style="margin-right: 40px"
            >取消</el-button
          >
          <el-button type="primary" @click="HandleModify" size="large"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- About -->
    <el-dialog v-model="aboutDialogVisible" center="true" width="450px">
      <h1
        style="
          width: 100%;
          font-size: 28px;
          margin-top: 10px;
          text-align: center;
        "
      >
        关于我们
      </h1>
      <div style="margin-left: 20px; margin-top: 30px">
        <p>制作人：陈锦源</p>
        <p>学号：3220105455</p>
        <p>邮箱：3220105455@zju.edu.cn</p>
        <p>时间：2024年秋冬学期</p>
        <p>最终解释权归本人所有</p>
      </div>
    </el-dialog>

    <div
      style="
        width: 72%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      "
    >
      <img
        src="../assets/bg.png"
        style="width: 100%; height: 120px; object-fit: cover; overflow: hidden"
      />
      <div
        style="
          height: 120px;
          background-color: white;
          width: 100%;
          padding-bottom: 5px;
          display: flex;
          flex-direction: row;
        "
      >
        <div
          style="
            margin-top: -50px;
            margin-right: 30px;
            margin-left: 40px;
            display: flex;
            flex-direction: column;
          "
        >
          <img
            src="../assets/avater.jpg"
            class="web-icon"
            style="
              width: 140px;
              height: 140px;
              border: 5px solid white;
              border-radius: 10px;
            "
          />
        </div>
        <div style="display: flex; flex-direction: column">
          <h1 style="margin: 10px">{{ username }}</h1>
          <p style="margin: 10px; color: gray">{{ email }}</p>
        </div>
      </div>
    </div>

    <div
      style="
        width: 72%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 10px;
      "
    >
      <div
        style="
          width: 65%;
          background-color: white;
          display: flex;
          flex-direction: column;
          padding-bottom: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        "
      >
        <div style="width: 100%">
          <div style="font-size: 20px; font-weight: bold; margin: 20px">
            我的喜欢
          </div>
        </div>
        <div
          v-if="likes.length == 0"
          style="
            height: 319px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          "
        >
          <img
            src="../assets/empty.jpg"
            style="height: 130px; margin-top: -30px"
          />
          <p style="color: gray">您还没有喜欢的商品哦</p>
        </div>
        <div v-else style="width: 100%">
          <div v-for="item in likes" :key="item.uid" style="width: 100%">
            <LikedItemView
              :likes="item"
              :showHistory="showHistory"
              :removeLikes="removeLikes"
            ></LikedItemView>
          </div>
        </div>
      </div>
      <div
        style="
          width: 34%;
          height: fit-content;
          background-color: white;
          display: flex;
          flex-direction: row;
          justify-content: center;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        "
      >
        <div style="width: 100%">
          <div style="font-size: 20px; font-weight: bold; margin: 20px">
            其他功能
          </div>
          <div
            style="
              width: 100%;
              display: flex;
              justify-content: center;
              margin-bottom: 18px;
            "
          >
            <div class="func-container" @click="ToMainPage">
              <img src="../assets/mainpage.png" style="width: 35px" />
              <div class="func-info">回到主页</div>
            </div>
            <div class="func-container" @click="ModifyInfo">
              <img src="../assets/modify.png" style="width: 35px" />
              <div class="func-info">修改信息</div>
            </div>
            <div class="func-container" @click="LogOut">
              <img src="../assets/logout.png" style="width: 35px" />
              <div class="func-info">注销</div>
            </div>
            <div class="func-container" @click="aboutDialogVisible = true">
              <img src="../assets/about.png" style="width: 35px" />
              <div class="func-info">关于我们</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import router from "@/router";
import axios from "axios";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "PersonalView",
  data() {
    return {
      uid: 0,
      username: "",
      email: "",
      isLogin: false,
      likes: [] as Array<{ uid: number; [key: string]: unknown }>,
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
      t: [] as string[],
      price: [] as number[],
      selectedName: "",
      modifyDialogVisible: false,
      aboutDialogVisible: false,
      historyDialogVisible: false,
    };
  },
  methods: {
    ToMainPage() {
      router.push("/");
    },
    ModifyInfo() {
      console.log("ModifyInfo");
      this.form.username = this.username;
      this.form.email = this.email;
      this.modifyDialogVisible = true;
    },
    LogOut() {
      store.commit("setUsername", "");
      store.commit("setIsLogin", false);
      this.username = "";
      this.isLogin = false;
      router.push("/");
    },
    HandleModify() {
      let pass = true;
      if (this.form.username.length < 6) {
        this.error_display.username = true;
        pass = false;
      } else {
        this.error_display.username = false;
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
      if (this.form.password.length < 6) {
        this.error_display.password = true;
        pass = false;
      } else {
        this.error_display.password = false;
      }
      if (this.form.password != this.form.password_confirm) {
        this.error_display.password_confirm = true;
        pass = false;
      } else {
        this.error_display.password_confirm = false;
      }
      if (!pass) {
        return;
      }
      const url = process.env.VUE_APP_API_URL + "/api/user/modify";
      axios
        .post(url, {
          uid: this.uid,
          username: this.form.username,
          email: this.form.email,
          password: this.form.password,
        })
        .then((res) => {
          console.log(res);
          store.commit("setUsername", res.data.username);
          store.commit("setEmail", res.data.email);
          this.username = res.data.username;
          this.email = res.data.email;
          this.modifyDialogVisible = false;
          ElMessage.success("修改成功");
        })
        .catch((err: unknown) => {
          console.error(err);
          ElMessage.error("修改失败");
        });
    },
    showHistory(gid: number, website: string, name: string) {
      axios
        .get(process.env.VUE_APP_API_URL + "/api/goods/get-history", {
          params: {
            gid: gid,
            website: website,
          },
        })
        .then((res) => {
          this.selectedName = name;
          this.t = [];
          this.price = [];
          for (let i = 0; i < res.data.length; i++) {
            var date = new Date(res.data[i].t);
            this.t.push(
              // 具体时间
              date.getFullYear() +
                "-" +
                (date.getMonth() + 1) +
                "-" +
                date.getDate() +
                " " +
                date.getHours() +
                ":" +
                date.getMinutes()
            );
            this.price.push(res.data[i].price);
          }
          console.log("t: " + this.t);
          console.log("price" + this.price);
          this.historyDialogVisible = true;
        })
        .catch((err) => {
          console.error(err);
          ElMessage.error("获取历史价格失败");
        });
    },
    removeLikes(gid: number, website: string) {
      if (!store.state.isLogin) {
        ElMessage.error("请先登录");
        router.push("/login");
        return false;
      }
      const urlBase = process.env.VUE_APP_API_URL;
      axios
        .post(urlBase + "/api/user/remove-likes", {
          uid: store.state.uid,
          gid: gid,
          website: website,
        })
        .then(() => {
          ElMessage.success("删除成功");
          this.getLikes();
        })
        .catch((e: unknown) => {
          console.error(e);
          ElMessage.error("删除失败");
        });
    },
    getLikes() {
      axios
        .get(process.env.VUE_APP_API_URL + "/api/user/get-likes", {
          params: {
            uid: this.uid,
          },
        })
        .then((res) => {
          console.log(res);
          this.likes = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  mounted() {
    this.uid = store.state.uid;
    this.username = store.state.username;
    this.email = store.state.email;
    this.isLogin = store.state.isLogin;
    this.getLikes();
  },
});
</script>

<style scoped>
.page {
  background-color: rgb(244, 246, 249);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.greeting {
  color: #ffffff;
  display: flex;
  align-items: center;
  font-size: 18px;
}
.func-container {
  display: flex;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 14px;
}
.func-info {
  color: gray;
  font-size: 14px;
  margin-top: 10px;
}
</style>
