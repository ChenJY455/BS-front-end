<template>
  <div class="echarts">
    <div id="main" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "EchartsView",
  props: {
    t: {
      type: Array,
      required: true,
    },
    price: {
      type: Array,
      required: true,
    },
  },
  methods: {
    myChart() {
      var myChart = echarts.init(document.getElementById("main"));
      myChart.setOption({
        tooltip: {},
        xAxis: {
          data: this.t,
        },
        yAxis: {},
        series: [
          {
            name: "价格",
            type: "line",
            data: this.price,
          },
        ],
      });
    },
  },
  mounted() {
    this.myChart();
  },
  beforeUnmount() {
    echarts.dispose(document.getElementById("main"));
  },
  watch: {
    t: function () {
      this.myChart();
    },
    price: function () {
      this.myChart();
    },
  },
};
</script>
