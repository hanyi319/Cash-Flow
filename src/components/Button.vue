<template>
  <button class="button" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Button extends Vue {}
</script>

<style lang="scss" scoped>
.button {
  width: 100%;
  height: var(--button-height);
  padding: 8px 16px;
  font-size: var(--button-font-size);
  text-align: center;
  border: none;
  border-radius: var(--border-radius);
  color: var(--button-text);
  background: var(--button-bg-normal);
}
</style>
