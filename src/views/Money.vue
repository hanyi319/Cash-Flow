<template>
  <Layout class-prefix="layout">
    <div class="summary">
      <Icon name="logo"/><span>&nbsp;开源节流</span>
    </div>
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <Tags @update:value="record.tags = $event"/>
    <div class="date-wrapper">
      <div class="createdAt">
        <FormItem field-name="日期" placeholder="在这里输入日期" type="date" :value.sync="record.createdAt"/>
      </div>
    </div>
    <div class="notes-wrapper">
      <div class="note">
        <FormItem field-name="备注" placeholder="在这里输入备注" :value.sync="record.notes"/>
      </div>
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

  record: RecordItem = {tags: [], notes: '', type: '-', amount: 0, createdAt: new Date().toISOString()};

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
    if(!this.record.tags || this.record.tags.length === 0) {
      return window.alert('添加标签有助于筛选记录哦')
    }
    this.$store.commit("createRecord", this.record);
    if(this.$store.state.createRecordError === null) {
      window.alert("记账成功");
      this.record.notes = '';
    }
  }

  selectDate() {
    window.alert('「选择日期」功能正在施工中，敬请期待')
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.tabs{
  order: 4;
}

.notes-wrapper {
  order: 2;
  padding: 12px 0 0 0;
  background: #ffffff;
  display: flex;
  justify-content: space-between;

  > .note{
    width: 100vw;
    background: #F1F1F1;
    border-radius: 4px;
    margin-left: 16px;
    margin-right: 16px;


    ::v-deep input{
      padding-right: 0;
    }
  }
}

.date-wrapper{
  order: 2;
  padding: 12px 0;
  background: #ffffff;
  display: flex;
  justify-content: space-between;

  > .createdAt{
    width: 100vw;
    background: #F1F1F1;
    border-radius: 4px;
    margin-left: 16px;
    margin-right: 16px;

    ::v-deep input{
      padding-right: 0;
    }
  }
}

.summary {
  order: 5;
  flex-grow: 1;
  background-color: $color-highlight;
  color: #ffffff;
  font-size: 30px;
  font-weight: bolder;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>