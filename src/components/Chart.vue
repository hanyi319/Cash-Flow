<template>
  <div class="chart-wrapper">
    <div class="wrapper" :class="classPrefix && `${classPrefix}-content`" ref="wrapper">
      chart
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import * as echarts from 'echarts';
import {EChartsCoreOption} from 'echarts';

@Component
export default class Chart extends Vue {
  @Prop() options?: EChartsCoreOption;
  @Prop() classPrefix: any;

  mounted() {
    if (this.options === undefined) {
      return console.error('options 为空');
    }
    const chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
    chart.setOption(this.options);
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 400px;
}

.chart-wrapper{
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>