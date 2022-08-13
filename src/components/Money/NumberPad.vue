<template>
  <div class="numberPad">
    <div class="output">{{ output || '&nbsp;' }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
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
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  output: string = '0';

  inputContent(event: MouseEvent) {
    const button = (event.target as HTMLButtonElement);
    const input = button.textContent as string;
    if (this.output.length === 16) { return; }
    if (this.output === '0') {
      if ('0123456789'.indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf('.') >= 0 && input === '.') { return; }
    this.output += input;
  }

  remove() {
    if (this.output.length === 1) {
      this.output = '0';
    } else {
      this.output = this.output.slice(0, -1);
    }
  }

  clear() {
    this.output = '0';
  }

  ok() {
    this.$emit('update:value', this.output);
    this.$emit('submit', this.output);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  .output {
    @extend %clearFix;
    @extend %innerShadow;
    font-family: Consolas, monospace;
    font-size: 36px;
    font-weight: bold;
    padding: 9px 16px;
    text-align: right;
  }

  .buttons {
    @extend %clearFix;
    background: #f1f1f1;

    > button {
      width: 25%;
      height: 64px;
      border-radius: 10px;
      float: left;
      //font-family: Consolas, monospace;
      font-size: 24px;
      font-weight: bold;
      background: #ffffff;
      border: 4px solid #f1f1f1;

      &.ok {
        background: #2AAE67;
        color: #ffffff;
        height: 64*2px;
        float: right;
      }

      &.zero {
        width: 25*2%;
      }
    }
  }
}
</style>