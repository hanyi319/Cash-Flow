<template>
  <div class="wrapper" ref="wrapper">chart</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import * as echarts from 'echarts';
import {EChartsCoreOption} from 'echarts';

@Component
export default class Chart extends Vue {
  @Prop() options?: EChartsCoreOption;

  mounted() {
    if (this.options === undefined) {
      return console.error('options 为空');
    }
    console.log(echarts);
    console.log(this.options);
    const chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
    console.log(chart)
    chart.setOption(this.options);
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 400px;
}
</style>