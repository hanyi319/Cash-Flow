<template>
  <div>
    <router-link to="/labels">标签</router-link>
    |
    <router-link to="/money">记账</router-link>
    |
    <router-link to="/statistics">统计</router-link>
  </div>
</template>

<script lang="ts">
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Nav'
};
</script>

<style lang="scss" scoped>

</style>