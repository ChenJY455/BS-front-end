<template>
  <div class="product" @click="ToDetail">
    <img :src="product.img_url" alt="Product Image" />
    <p class="name">{{ product.name }}</p>
    <div
      style="display: flex; flex-direction: row; justify-content: space-between"
    >
      <div class="price">¥{{ product.price }}</div>
      <div class="factory">{{ product.factory }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsView",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ToDetail() {
      location.assign(this.product.click_url);
    },
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
