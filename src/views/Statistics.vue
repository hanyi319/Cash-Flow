<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <ol>
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">{{ beautify(group.title) }} <span>￥{{ group.total }}</span></h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{ tagString(item.tags) }}</span>
            <span class="trade-notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }} </span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';

@Component({
  components: {Tabs},
})
export default class Statistics extends Vue {
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const {recordList} = this;
    if (recordList.length === 0) { return [];}

    const newList = clone(recordList).filter(r => r.type === this.type).sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());

    type Result = { title: string, total?: number, items: RecordItem[] }[]
    const result: Result = [{title: dayjs(recordList[0].createAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createAt).format('YYYY-MM-DD'), items: [current]});
      }
    }
    result.map(group => {group.total = group.items.reduce((sum, item) => sum + item.amount, 0);});
    return result;
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  type = '-';
  recordTypeList = recordTypeList;

  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',');
  }

  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日');
    } else {
      return day.format('YYYY年M月D日');
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep {
  .type-tabs-item {
    background: white;

    &.selected {
      background: #2AAE67;
      color: #ffffff;

      &::after {
        display: none;
      }
    }
  }

  interval-tabs-item {
    height: 48px;
    font-size: 16px;
  }
}

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  @extend %item;
}

.trade-notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}

.record {
  @extend %item;
  background: #ffffff;
}
</style>