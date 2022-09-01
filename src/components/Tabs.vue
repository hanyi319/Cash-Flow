<template>
  <ul class="tabs" :class="{[classPrefix+'-tabs']: classPrefix}">
    <li v-for="item in dataSource"
        :key="item.value"
        @click="select(item)"
        class="tabs-item"
        :class="liClass(item)">
      {{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

type DataSourceItem = { text: string, value: string };

@Component
export default class Tabs extends Vue {
  @Prop({required: true, type: Array}) dataSource!: DataSourceItem[];
  @Prop(String) readonly value!: string;
  @Prop(String) classPrefix?: string;

  liClass(item: DataSourceItem) {
    return {
      [this.classPrefix + '-tabs-item']: this.classPrefix,
      selected1: item.value === this.value && item.value === '-',
      selected2: item.value === this.value && item.value === '+',
    };
  }

  select(item: DataSourceItem) {
    this.$emit('update:value', item.value);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.tabs {
  background: #ffffff;
  display: flex;
  text-align: center;
  font-size: 24px;
  font-weight: bold;

  &-item {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.selected1 {
      background: $color-highlight;
      color: #ffffff;
    }

    &.selected2 {
      background: #FFD859;
      color: #ffffff;
    }
  }
}
</style>