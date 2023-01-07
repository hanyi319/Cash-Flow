<template>
  <Layout class-prefix="layout">
    <Tabs :data-source="recordTypeList" :value.sync="record.type" />
    <Tags @update:value="record.tags = $event" />
    <div class="notes-wrapper">
      <div class="note">
        <FormItem field-name="备注" placeholder="在这里输入备注" :value.sync="record.notes" />
      </div>
    </div>
    <div class="date-wrapper">
      <div class="createdAt">
        <FormItem
          field-name="日期"
          placeholder="在这里输入日期"
          type="date"
          :value.sync="record.createdAt"
        />
      </div>
    </div>
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component } from "vue-property-decorator";
import recordTypeList from "@/constants/recordTypeList";
import Tabs from "@/components/Tabs.vue";

@Component({
  components: { Tags, FormItem, NumberPad, Tabs },
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }

  recordTypeList = recordTypeList;

  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
    createdAt: new Date().toISOString(),
  };

  created() {
    this.$store.commit("fetchRecords");
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert("添加标签有助于筛选记录哦");
    }
    this.$store.commit("createRecord", this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert("记账成功");
      this.record.notes = "";
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column;
}

.date-wrapper {
  order: 3;
  display: flex;
  justify-content: space-between;
  background: var(--bg-color-grey);

  > .createdAt {
    width: 100vw;
    margin-left: 8px;
    margin-right: 8px;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    background: var(--bg-color-white);

    ::v-deep input {
      padding-right: 0;
    }
  }
}

.notes-wrapper {
  order: 4;
  display: flex;
  justify-content: space-between;
  background: var(--bg-color-grey);

  > .note {
    width: 100vw;
    margin-left: 8px;
    margin-right: 8px;
    background: var(--bg-color-white);

    ::v-deep input {
      padding-right: 0;
    }
  }
}
</style>
