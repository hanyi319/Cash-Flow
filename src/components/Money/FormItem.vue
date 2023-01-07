<template>
  <div>
    <label class="formItem">
      <span class="name">{{ this.fieldName }}</span>
      <template v-if="type === 'date'">
        <input
          :type="type || 'text'"
          :value="x(value)"
          @input="onValueChanged($event.target.value)"
          :placeholder="placeholder"
        />
      </template>
      <template v-else>
        <input
          :type="type || 'text'"
          :value="value"
          @input="onValueChanged($event.target.value)"
          :placeholder="placeholder"
        />
      </template>
    </label>
  </div>
</template>

<script lang="ts">
import dayjs from "dayjs";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class FormItem extends Vue {
  @Prop({ default: "" }) readonly value!: string;
  @Prop({ required: true }) fieldName!: string;
  @Prop() placeholder?: string;
  @Prop() type?: string;

  onValueChanged(value: string) {
    this.$emit("update:value", value);
  }

  x(isoString: string) {
    return dayjs(isoString).format("YYYY-MM-DD");
  }
}
</script>

<style lang="scss" scoped>
.formItem {
  font-size: 18px;
  padding-left: 16px;
  display: flex;
  align-items: center;

  .name {
    padding-right: 16px;
  }

  input {
    flex-grow: 1;
    height: 48px;
    padding-right: 16px;
    font-weight: bold;
    border: none;
    background: transparent;
    caret-color: var(--theme-color-blue);
  }
}
</style>
