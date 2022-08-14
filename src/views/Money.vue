<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component, Watch} from 'vue-property-decorator';
import model from '@/model';

const recordList = model.fetch();

@Component({
  components: {Tags, Notes, Types, NumberPad},
})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行'];
  record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};
  recordList: RecordItem[] = recordList;

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  };

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  saveRecord() {
    const record2: RecordItem = model.clone(this.record); // 深拷贝
    record2.createAt = new Date();
    this.recordList.push(record2);
    console.log(this.recordList);
  }

  @Watch('recordList')
  onRecordListChange() {
    model.save(this.recordList);
  }
};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>