<template>
  <div class="container">
    <img
      :src="goodsInfo.img_url"
      style="
        height: 140px;
        width: 140px;
        overflow: coverl;
        border-radius: 5px;
        margin: 10px;
      "
    />
    <div style="display: flex; flex-direction: column; width: 100%">
      <p class="info title">{{ goodsInfo.name }}</p>
      <div
        style="
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        "
      >
        <div style="width: 100%">
          <p class="info price">¥{{ goodsInfo.price }}</p>
          <p class="info factory">{{ goodsInfo.factory }}</p>
        </div>
        <el-button
          type="primary"
          style="margin-top: 50px; margin-right: 50px"
          @click="handleHistory"
          >历史价格</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LikedItemView",
  props: {
    likes: {
      type: Object,
      required: true,
    },
    showHistory: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      goodsInfo: {},
    };
  },
  methods: {
    handleHistory() {
      this.showHistory(
        this.goodsInfo.gid,
        this.goodsInfo.website,
        this.goodsInfo.name
      );
    },
  },
  mounted() {
    console.log(this.likes);
    if (this.likes.website == "TB") this.goodsInfo = this.likes.tbGoods;
    else if (this.likes.website == "JD") this.goodsInfo = this.likes.jdGoods;
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 10px 0;
  border: 1px solid #ccc;
}
.info {
  margin: 0;
  margin-left: 10px;
  color: #333;
  overflow: hidden;
}
.title {
  height: 50px;
  margin-top: 10px;
  margin-right: 15px;
  font-weight: bold;
  font-size: 17px;
}
.price {
  color: red;
  margin-top: 50px;
  margin-right: 15px;
  font-size: 16px;
}
.factory {
  margin-top: 5px;
  margin-right: 15px;
  font-size: 15px;
}
</style>
