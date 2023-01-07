<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type" />
    <div v-if="groupedList.length > 0" class="export"></div>
    <div v-if="groupedList.length > 0" class="bill">
      <ol>
        <li v-for="(group, index) in groupedList" :key="index" class="oneDay">
          <h3 class="title">
            {{ beautify(group.title) }} <span class="amount">￥{{ group.total }}</span>
          </h3>
          <ol>
            <li v-for="item in group.items" :key="item.id" class="record">
              <div>{{ tagString(item.tags) }}</div>
              <div class="remark">{{ item.notes }}</div>
              <div>{{ item.amount }}</div>
            </li>
          </ol>
        </li>
      </ol>
    </div>
    <div v-else>
      <div class="noResult">
        <Icon name="note" />
        <span>点滴汇聚，以成江河</span>
      </div>
      <div class="createRecord-wrapper">
        <router-link to="/money">
          <div class="button-wrapper">
            <Button class="createRecord" @click.native="createRecord">新增记账</Button>
          </div>
        </router-link>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";

@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const { recordList } = this;
    const newList = clone(recordList)
      .filter((r) => r.type === this.type)
      .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());

    if (newList.length === 0) {
      return [];
    }

    type Result = { title: string; total?: number; items: RecordItem[] }[];
    const result: Result = [
      { title: dayjs(recordList[0].createdAt).format("YYYY-MM-DD"), items: [newList[0]] },
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
        last.items.push(current);
      } else {
        result.push({ title: dayjs(current.createdAt).format("YYYY-MM-DD"), items: [current] });
      }
    }
    result.map((group) => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    });
    return result;
  }

  beforeCreate() {
    this.$store.commit("fetchRecords");
  }

  mounted() {
    let div = this.$refs.chartWrapper as HTMLDivElement;
    div.scrollLeft = div.scrollWidth;
  }

  type = "-";
  recordTypeList = recordTypeList;

  tagString(tags: Tag[]) {
    return tags.length === 0 ? "无" : tags.map((t) => t.name).join("、");
  }

  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYYY年M月D日");
    }
  }
}
</script>

<style lang="scss" scoped>
.export {
  width: calc(100% - 16px);
  height: 10px;
  margin: 16px 8px 0;
  border-radius: var(--border-radius);
  background: var(--text-color-black);
}

.bill {
  width: calc(100% - 32px);
  margin-top: -5px;
  margin-left: 16px;
  border-radius: 0 0 var(--border-radius) var(--border-radius);
  background: var(--bg-color-white);
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);

  .oneDay:not(:last-child) {
    border-bottom: 1px dashed var(--button-border-color);
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    line-height: 24px;
  }

  .amount {
    font-weight: bold;
    color: var(--theme-color-blue);
  }

  .record {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    line-height: 24px;
    background: var(--bg-color-white);

    .remark {
      text-align: center;
      color: var(--text-color-muted);
    }
  }
}

.button-wrapper {
  padding: 16px;
  margin-top: 16px;

  > .createRecord {
    width: 100%;
    height: var(--button-height);
    padding: 8px 16px;
    font-size: var(--button-font-size);
    text-align: center;
    border: none;
    border-radius: var(--border-radius);
    color: var(--button-text);
    background: var(--button-bg-normal);
  }
}

.noResult {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 32px 0;

  ::v-deep .icon {
    width: 128px;
    height: 128px;
  }

  span {
    margin-top: 20px;
    font-size: 20px;
    color: var(--text-color-muted);
  }
}
</style>
