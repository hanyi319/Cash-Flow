<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    <div>
      type: {{type}}
      <br>
      interval: {{interval}}
    </div>
  </Layout>
</template>

<script lang="ts">
import Types from '@/components/Money/Types.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';

@Component({
  components: {Tabs, Types},
})
export default class Statistics extends Vue {
  type = '-';
  interval = 'day';
  typeList = [
    {text: '支出', value: '-'},
    {text: '收入', value: '+'},
  ];
  intervalList = [
    {text: '按天', value: 'day'},
    {text: '按周', value: 'week'},
    {text: '按月', value: 'month'}];
};
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item {
  background: white;

  &.selected1 {
    background: #2AAE67;
    color: #ffffff;

    &::after {
      display: none;
    }
  }

  &.selected2 {
    background: #FFD859;
    color: #ffffff;

    &::after {
      display: none;
    }
  }
}
</style>