<template>
  <div class="product" @click="ToDetail">
    <img :src="product.img_url" alt="Product Image" />
    <p class="name">{{ product.name.replace(/<.*?>/g, "") }}</p>
    <div
      style="display: flex; flex-direction: row; justify-content: space-between"
    >
      <div class="price">¥{{ product.price }}</div>
      <!-- <div class="factory">{{ product.factory }}</div> -->
      <div style="margin-right: 15px">
        <img
          v-if="liked"
          src="../assets/like.png"
          @click.stop="RemoveLikes"
          style="max-width: 20px; max-height: 20px"
        />
        <img
          v-else
          src="../assets/not-like.png"
          @click.stop="AddLikes"
          style="max-width: 20px; max-height: 20px"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";

export default {
  name: "GoodsView",
  data() {
    return {
      liked: false,
    };
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    is_liked: {
      type: Boolean,
      required: true,
    },
    addLikes: {
      type: Function,
      required: true,
    },
    removeLikes: {
      type: Function,
      required: true,
    },
  },
  methods: {
    ToDetail() {
      window.open(this.product.click_url, "_blank");
    },
    AddLikes() {
      try {
        this.addLikes(
          this.product.gid,
          this.product.website,
          this.product.name
        );
        this.liked = true;
      } catch (e) {
        ElMessage.error("添加失败");
      }
    },
    RemoveLikes() {
      try {
        this.removeLikes(this.product.gid, this.product.website);
        this.liked = false;
      } catch (e) {
        ElMessage.error("删除失败");
      }
    },
  },
  mounted() {
    this.liked = this.is_liked;
  },
};
</script>

<style scoped>
.product {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  max-width: 200px;
  padding-bottom: 8px;
  cursor: pointer;

  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
  }

  .name {
    font-size: 15px;
    margin: 7px 7px 20px 7px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .price {
    color: rgb(177, 39, 4);
    font-size: 15px;
    display: inline;
    margin-left: 8px;
  }

  .factory {
    max-width: 55%;
    color: rgb(163, 163, 163);
    font-size: 15px;
    display: inline;
    float: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 8px;
  }
}
</style>
