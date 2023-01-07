<template>
  <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <div class="logo">
      <Icon name="logo" />
      <span class="app-name">点滴记账简洁版</span>
    </div>
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot />
    </div>
    <Nav />
  </div>
</template>

<script lang="ts">
export default {
  props: ["classPrefix"],
  name: "Layout",
};
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.logo {
  padding-top: var(--top-safe-area-height);
  font-size: 24px;
  font-weight: bold;
  padding-left: 20px;
  background: var(--bg-color-grey);

  > .app-name {
    padding-left: 8px;
  }
}

.content {
  overflow: auto;
  flex-grow: 1;
  background: var(--bg-color-grey);
}
</style>
