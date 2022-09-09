<template>
  <Layout>
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart class-prefix="chart" :options="lineChartOption"/>
    </div>
    <Chart :options="pieChartOption"/>
    <Chart :options="barChartOption"/>
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
import _ from 'lodash';
import day from 'dayjs';

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
  // 获取折线图最近一个月的支出数据
  get lineKeyValueList() {
    const today = new Date();
    const array = [];
    for (let i = 0; i <= 29; i++) {
      const dateString = day(today).subtract(i, 'day').format('YYYY-MM-DD');
      const found = _.find(this.groupedList, {title: dateString});
      array.push({key: dateString, value: found ? found.total : 0});
    }
    array.sort((a, b) => {
      if (a.key > b.key) {
        return 1;
      } else if (a.key === b.key) {
        return 0;
      } else {
        return -1;
      }
    });
    return array;
  }

  // 折线图配置选项
  get lineChartOption() {
    const keys = this.lineKeyValueList.map(item => item.key);
    const values = this.lineKeyValueList.map(item => item.value);
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
        data: keys,
        axisTick: {alignWithLabel: true},
        axisLine: {lineStyle: {color: '#666'}},
        axisLabel: {
          formatter: function (value: string, index: number) {
            let date = new Date(value);
            let texts = [(date.getMonth() + 1), date.getDate()];
            if (index === 0) {
              texts.unshift(date.getFullYear());
            }
            return texts.join('/');
          }
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          symbolSize: 15,
          itemStyle: {color: '#42b883'},
          data: values,
          type: 'line',
          smooth: true
        }
      ]
    };
  }

  // 获取饼图最近一个月的支出数据
  get pieKeyValueList() {
    // 用来存放标签以及对应的金额的哈希表和数组
    const map = new Map();
    const array: object[] = [];

    // 到今天为止的最近一个月
    const today = new Date();

    for (let i = 0; i <= 29; i++) {

      // 格式化时间字符串，以便根据时间字符串搜索该天对应的支出数据
      const dateString = day(today).subtract(i, 'day').format('YYYY-MM-DD');
      const found = _.find(this.groupedList, {title: dateString});

      // 如果这一天不为空，那么就根据标签分门别类统计金额
      if (found) {
        for (let j = 0; j <= found.items.length; j++) {
          if (found.items[j]) {
            map.set(found.items[j].tags[0].name, found.items[j].amount);
          }
        }
      }
    }

    // 遍历哈希表生成数组
    function transform(value: number, key: string, map: object) {
      let name = key;
      array.push({value, name});
    }

    map.forEach(transform);

    return array;
  }

  // 饼图配置选项
  get pieChartOption() {
    const array = this.pieKeyValueList;

    return {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: '金额',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: array
        }
      ]
    };
  }

  // 获取柱状图最近12个月的支出数据
  get barKeyValueList() {
    // 用来存放标签以及对应的金额的哈希表和数组
    const map = new Map();
    const arrayX:string[] = [];
    const arrayY:number[] = [];
    const array = [];

    const today = new Date();
    // 不考虑闰月，直接用 12 * 31 天代替一年
    for (let i = 0; i <= 11; i++) {
      for (let j = i * 31; j <= (i + 1) * 31; j++) {
        // 格式化时间字符串，以便根据时间字符串搜索该天对应的支出数据
        const dateString = day(today).subtract(j, 'day').format('YYYY-MM-DD');
        const found = _.find(this.groupedList, {title: dateString});
        const foundDate = found?.title.substring(0, 7);

        // 如果这一天不为空，那么就根据月份统计金额
        if (found && found.total !== 0) {
          if(!map.has(foundDate)) {
            map.set(foundDate, 0);
          }
          let temp = map.get(foundDate);
          temp += found.total;
          map.set(foundDate, temp);

          console.log('map');
          console.log(map);
        }
      }
    }

    // 遍历哈希表，数据过滤，返回一个二维数组
    function transform(value: number, key: string, map: object) {
      arrayX.push(key);
      arrayY.push(value);
    }
    map.forEach(transform);
    array[0] = arrayX;
    array[1] = arrayY;

    return array;
  }

  // 柱状图配置选项
  get barChartOption() {
    const array = this.barKeyValueList;

    return {
      xAxis: {
        type: 'category',
        data: array[0]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: array[1],
          type: 'bar'
        }
      ]
    }
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
    div.scrollLeft = div.scrollWidth;
  }

  type = '-';
  recordTypeList = recordTypeList;
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.chart {
  max-width: 100%;
  height: 400px;
}

::v-deep .chart-content {
  width: 400%;
}

.chart-wrapper {
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>