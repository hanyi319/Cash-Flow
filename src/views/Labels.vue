<template>
  <Layout>
    <div class="tags">
      <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`">
        <span class="tag-name">{{ tag.name }}</span>
        <Icon name="right" />
      </router-link>
    </div>
    <div class="button-wrapper">
      <Button @click.native="createTag">新增标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Button from "@/components/Button.vue";
import { mixins } from "vue-class-component";
import TagHelper from "@/mixins/TagHelper";

@Component({
  components: { Button },
})
export default class Labels extends mixins(TagHelper) {
  get tags() {
    return this.$store.state.tagList;
  }

  beforeCreate() {
    this.$store.commit("fetchTags");
  }
}
</script>

<style lang="scss" scoped>
.tags {
  margin: 16px;
  font-size: 16px;
  font-weight: bold;
  border-radius: var(--border-radius);
  background: var(--bg-color-white);

  > .tag {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 44px;
    border-bottom: 1px solid var(--split-line);
    transition: transform 0.2s cubic-bezier(0.68, 0.01, 0.62, 0.6);

    > .tag-name {
      padding-left: 16px;
    }

    svg {
      width: 18px;
      height: 18px;
      margin-right: 16px;
      color: var(--arrow-pointing);
    }
  }

  > .tag:active {
    transform: scale(0.95);
  }
}

.button-wrapper {
  padding: 16px;
  margin-top: 16px;
}
</style>
