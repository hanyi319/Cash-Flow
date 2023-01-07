<template>
  <div class="numberPad">
    <div class="output">￥{{ output || "&nbsp;" }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">
        <Icon name="delete" />
      </button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">C</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class NumberPad extends Vue {
  output: string = "0";

  inputContent(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    const input = button.textContent as string;
    if (this.output.length === 16) {
      return;
    }
    if (this.output === "0") {
      if ("0123456789".indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf(".") >= 0 && input === ".") {
      return;
    }
    this.output += input;
  }

  remove() {
    if (this.output.length === 1) {
      this.output = "0";
    } else {
      this.output = this.output.slice(0, -1);
    }
  }

  clear() {
    this.output = "0";
  }

  ok() {
    const number = parseFloat(this.output);
    this.$emit("update:value", number);
    this.$emit("submit", number);
    this.output = "0";
  }
}
</script>

<style lang="scss" scoped>
.numberPad {
  order: 5;
  margin-bottom: 4px;

  .output {
    position: relative;
    display: flex;
    align-items: center;
    text-align: left;
    height: 72px;
    margin: 0 8px;
    padding: 10px;
    line-height: 60px;
    font-size: 40px;
    font-weight: bold;
    border: 4px solid var(--inputPad-button-border);
    border-radius: 0 0 var(--border-radius) var(--border-radius);
    background: var(--bg-color-white);
  }

  .buttons {
    margin: 4px;
    background: var(--bg-color-grey);

    > button {
      float: left;
      width: 25%;
      height: 64px;
      font-size: 24px;
      font-weight: bold;
      border: 4px solid var(--numberPad-border);
      border-radius: var(--border-radius);
      color: var(--numberPad-text);
      background: var(--numberPad-button-bg);
      transition: transform 0.2s cubic-bezier(0.68, 0.01, 0.62, 0.6), opacity 0.08s linear;

      &.ok {
        float: right;
        height: 64 * 2px;
        color: var(--text-color-white);
        background: var(--theme-color-blue);
      }

      &.zero {
        width: 25 * 2%;
      }
    }

    > button:active {
      transform: scale(0.95);
      opacity: 0.5;
    }
  }
}
</style>
