<template>
  <div class="tags">
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id" :class="{selected: selectedTags.indexOf(tag) >= 0}"
          @click="toggle(tag)">
        <div class="tag-box">
          {{ tag.name }}
        </div>
      </li>
      <li>
        <button class="new-tag" @click="createTag">
          <Icon name="others"/>
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';


@Component
export default class Tags extends mixins(TagHelper) {
  selectedTags: string[] = [];

  get tagList() {
    return this.$store.state.tagList;
  }

  created() {
    this.$store.commit('fetchTags');
  }

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value', this.selectedTags);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.tags {
  order: 3;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  height: 15vh;
  padding: 0 16px;
  position: relative;

  > .current {
    order: 2;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    margin-right: -16px;

    > li {
      width: 25%;
      margin-top: 10px;
      display: flex;
      justify-content: center;

      .tag-box {
        background: #F1F1F1;
        width: 100%;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        border-radius: 4px;
        white-space: nowrap;
        text-align: center;
        margin-right: 16px;
      }

      &.selected {
        .tag-box {
          background: $color-highlight;
          color: #ffffff;
        }
      }
    }

    .new-tag{
      width: calc(100% - 16px);
      height: 32px;
      margin-left: 0;
      margin-right: 16px;
      border-style: none;
      border-radius: 4px;
      background: #F1F1F1;
    }
  }
}
</style>