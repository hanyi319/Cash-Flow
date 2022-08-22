<template>
  <Layout class-prefix="layout">
    <div class="summary">
      <span>开源节流</span>
    </div>
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <Tags/>
    <div class="notes">
      <FormItem field-name="备注：" placeholder="在这里输入备注" @update:value="onUpdateNotes"/>
    </div>
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component} from 'vue-property-decorator';
import recordTypeList from '@/constants/recordTypeList';
import Tabs from '@/components/Tabs.vue';


@Component({
  components: {Tags, FormItem, NumberPad, Tabs},
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }

  recordTypeList = recordTypeList;

  record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};

  created() {
    this.$store.commit('fetchRecords');
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  saveRecord() {
    this.$store.commit("createRecord", this.record);
  }
};
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.tabs{
  order: 4;
}

.notes {
  order: 2;
  padding: 12px 0;
}

.summary {
  order: 5;
  flex-grow: 1;
  background-color: #2AAE67;
  color: #ffffff;
  font-size: 24px;
  font-weight: bolder;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>