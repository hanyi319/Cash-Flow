<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack" />
      <span class="title">编辑标签</span>
      <span class="rightIcon" />
    </div>
    <div class="form-wrapper">
      <FormItem
        :value="currentTag.name"
        @update:value="update"
        field-name="标签名："
        placeholder="请输入标签名"
      />
    </div>
    <div class="button-wrapper">
      <Button class="delete-button" @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import FormItem from "@/components/Money/FormItem.vue";
import Button from "@/components/Button.vue";

@Component({
  components: { Button, FormItem },
})
export default class EditLabel extends Vue {
  get currentTag() {
    return this.$store.state.currentTag;
  }

  created() {
    const id = this.$route.params.id;
    this.$store.commit("fetchTags");
    this.$store.commit("setCurrentTag", id);
    if (!this.currentTag) {
      this.$router.replace("/404");
    }
  }

  update(name: string) {
    if (this.currentTag) {
      this.$store.commit("updateTag", { id: this.currentTag.id, name: name });
    }
  }

  remove() {
    if (this.currentTag) {
      this.$store.commit("removeTag", this.currentTag.id);
    }
  }

  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  margin: 16px 16px 0;
  border-radius: var(--border-radius) var(--border-radius) 0 0;
  background: var(--bg-color-white);

  > .title {
    font-size: 18px;
  }

  > .leftIcon {
    width: 24px;
    height: 24px;
    color: var(--arrow-pointing);
  }

  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}

.form-wrapper {
  margin: 0 16px 0;
  border-radius: 0 0 var(--border-radius) var(--border-radius);
  background: var(--bg-color-white);
}

.button-wrapper {
  padding: 16px;
  margin-top: 16px;

  > .delete-button {
    background: var(--theme-color-red);
  }
}
</style>
