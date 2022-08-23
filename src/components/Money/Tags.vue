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
  //flex-grow: 1;

  > .current {
    order: 2;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;

    > li {
      width: 25%;
      margin-top: 10px;
      display: flex;
      justify-content: center;

      .tag-box {
        background: #F1F1F1;
        height: 32px;
        line-height: 30px;
        font-size: 14px;
        padding: 0 10px;
        border-radius: 4px;
        white-space: nowrap;
      }

      &.selected {
        .tag-box {
          background: $color-highlight;
          color: #ffffff;
        }
      }
    }

    .new-tag{
      width: 48px;
      border-style: none;
      border-radius: 4px;
      background: #F1F1F1;
    }
  }
}
</style>