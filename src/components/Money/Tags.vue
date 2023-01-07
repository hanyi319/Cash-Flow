<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
        @click="toggle(tag)"
      >
        <div class="tag-box">
          {{ tag.name }}
        </div>
      </li>
      <li>
        <button class="new-tag" @click="createTag">
          <Icon name="others" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import TagHelper from "@/mixins/TagHelper";

@Component
export default class Tags extends mixins(TagHelper) {
  selectedTags: string[] = [];

  get tagList() {
    return this.$store.state.tagList;
  }

  created() {
    this.$store.commit("fetchTags");
  }

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      if (this.selectedTags.length >= 1) {
        this.selectedTags = [];
      }
      this.selectedTags.push(tag);
    }
    this.$emit("update:value", this.selectedTags);
  }
}
</script>

<style lang="scss" scoped>
.tags {
  order: 2;
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0 16px;
  background: var(--bg-color-grey);

  > .current {
    display: flex;
    flex-wrap: wrap;
    margin-right: -16px;
    overflow: auto;

    > li {
      display: flex;
      justify-content: center;
      width: 25%;
      margin-top: 10px;

      .tag-box {
        display: flex;
        justify-content: center;
        align-items: center;
        white-space: nowrap;
        width: 100%;
        height: 32px;
        margin-right: 16px;
        font-size: 14px;
        border-radius: var(--border-radius);
        background: var(--bg-color-white);
      }

      &.selected {
        .tag-box {
          color: var(--text-color-white);
          border: 2px solid var(--tag-selected-border);
          background: var(--tag-selected-bg);
          transition: transform 0.2s cubic-bezier(0.68, 0.01, 0.62, 0.6);
        }

        .tag-box:active {
          transform: scale(0.95);
        }
      }
    }

    .new-tag {
      width: calc(100% - 16px);
      height: 32px;
      margin-left: 0;
      margin-right: 16px;
      border-style: none;
      border-radius: var(--border-radius);
      background: var(--tag-bg);
    }
  }
}
</style>
