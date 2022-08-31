<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <div ref="chartWrapper">
      <Chart class-prefix="chart" :options="option1"/>
    </div>
    <Chart :options="option2"/>
    <ol v-if="groupedList.length>0">
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
    <div v-else>
      <div class="noResult">
        <Icon name="no-result"/>
        <span>点滴汇聚，以成江河</span>
      </div>
      <div class="createRecord-wrapper">
        <router-link to="/money">
          <Button class="createRecord" @click.native="createRecord">新增记账</Button>
        </router-link>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import VChart, {THEME_KEY} from 'vue-echarts';
import {use} from 'echarts/core';
import {CanvasRenderer} from 'echarts/renderers';
import {PieChart} from 'echarts/charts';
import {BarChart} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';
import Chart from '@/components/Chart.vue';

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);

@Component({
  components: {Tabs, VChart, Chart},
})
export default class Statistics extends Vue {
  get option1() {
    return {
      title: {
        text: '支出趋势',
        left: 'center'
      },
      tooltip: {
        show: true,
        formatter: '{b}日<br/>￥{c}',
        position: 'top'
      },
      grid: {
        left: 48,
        top: 48,
        right: 16,
        bottom: 32
      },
      xAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        axisTick: {alignWithLabel: true},
        axisLine: {lineStyle: {color: '#666'}}
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          symbolSize: 15,
          itemStyle: {color: '#42b883'},
          data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 1],
          type: 'line',
          smooth: true
        }
      ]
    };
  }

  get option2() {
    return {
      title: {
        text: '支出构成',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: [
          '衣',
          '食',
          '住',
          '行',
        ]
      },
      series: [
        {
          name: '金额',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            {value: 59, name: '衣'},
            {value: 119, name: '食'},
            {value: 1600, name: '住'},
            {value: 200, name: '行'},
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const {recordList} = this;
    const newList = clone(recordList).filter(r => r.type === this.type).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());

    if (newList.length === 0) { return [];}

    type Result = { title: string, total?: number, items: RecordItem[] }[]
    const result: Result = [{title: dayjs(recordList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
      }
    }
    result.map(group => {group.total = group.items.reduce((sum, item) => sum + item.amount, 0);});
    return result;
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  mounted() {
    let div = (this.$refs.chartWrapper as HTMLDivElement);
    div.scrollLeft = 10;
    // div.scrollLeft = div.scrollWidth;
    console.log('div');
    console.log(div);
    console.log('div.scrollLeft');
    console.log(div.scrollLeft);
    // console.log(div.scrollWidth);
  }

  type = '-';
  recordTypeList = recordTypeList;

  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.map(t => t.name).join('、');
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
.chart {
  max-width: 100%;
  height: 400px;
}

.noResult {
  margin: 32px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ::v-deep .icon {
    width: 20vw;
    height: 10vh;
    color: grey;
  }

  span {
    margin-top: 20px;
    font-size: 20px;
    color: grey;
  }
}

.createRecord {
  background: #2AAE67;
  color: #ffffff;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;

  &-wrapper {
    text-align: center;
    padding: 16px;
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

::v-deep .chart-content {
  width: 400%;
}
</style>