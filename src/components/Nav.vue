<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="editor" />
      记账
    </router-link>
    <router-link to="/details" class="item" active-class="selected">
      <Icon name="money" />
      明细
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics" />
      统计
    </router-link>
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="label" />
      标签
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  flex-direction: row;
  padding: 0;
  font-size: 14px;
  font-weight: bold;
  color: var(--text-color-black);
  background: var(--bg-color-grey);
  box-shadow: 0 -3px 3px rgba(0, 0, 0, 0.1);

  > .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 33.33333%;
    padding: 10px 0;

    .icon {
      width: 32px;
      height: 32px;
    }
  }

  > .item.selected {
    color: var(--theme-color-blue);
  }
}
</style>
