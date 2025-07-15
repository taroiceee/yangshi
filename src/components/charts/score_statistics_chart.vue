<template>
<div class="score_statistics_chart">
  <div class="score_statistics_chart_top">
    <div class="score">{{score_num}}</div>
    <div class="score_person">
      <el-rate
        v-model="score_num"
        disabled
        text-color="#ff9900"
        score-template="{value}">
      </el-rate>
      <div class="score_person_num">{{score_list.length}}人评价</div>
    </div>
  </div>
  <div class="bar_chart score_statistics" id="score_statistics">评分统计</div>
</div>
</template>

<script>
import * as echarts from "@/assets/js/echarts.min.js";

export default {
  name: "Home",
  components: {},
  props: {
    obj: {
      type: Object,
      default: function () {
        return {};
      },
    },
    refreshScore: {
      type: Boolean,
      default: false,
    },
    sourcetable: {
      type: String,
      default: "",
    },
    sourcefield: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      score_num: 0,
      score_list: [],
      starCounts: [0, 0, 0, 0, 0],
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function(params) {
            // params 是数组，因为我们设置了 trigger: 'axis'
            var result = params[0].name + '：'; // 显示 yAxis 的类别名称
            params.forEach(function(item) {
              // 将数据乘以100并四舍五入到整数，然后添加百分号
              var percentValue = (item.value * 100).toFixed(2) + '%';
              result += percentValue + '<br/>';
            });
            return result;
          }
        },
        grid: {
          left: '3%',
          right: '30%',
          top: '8%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: {
          show: false,
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['1星', '2星', '3星', '4星', '5星'],
          axisLine: {
            show: false // 隐藏轴线
          },
          axisTick: {
            show: false // 隐藏刻度线
          },
          splitLine: {
            show: false // 隐藏网格线
          },
          // 保留并可以自定义轴标签样式
          axisLabel: {
            show: true,
            color: '#666', // 标签颜色
            fontSize: 12 // 字体大小
          }
        },
        series: [
          {
            type: 'bar',
            data: [0.014,0.019,0.193,0.47,0.304],
            itemStyle: {
              color: '#ffd596' // 设置统一的柱子颜色
            },
            label: {
              show: true,
              position: 'right',
              formatter: function(params) {
                return (params.value * 100).toFixed(2) + '%'; // 柱子上显示百分比
              }
            }
          }
        ]
      }
    };
  },
  created() {
  },
  mounted() {
    setTimeout(() => {
      this.getOwnScore();
      this.getScore();
    }, 200)
  },
  methods: {
    async getScore() {
      const url = `~/api/score/avg`;
      const params = {
        field: "score_num",
        source_table: this.sourcetable,
        source_field: this.sourcefield,
        source_id: this.obj[this.sourcefield],
      };
      const res = await this.$get(url, params);
      const num = res.result || 0.0;
      this.score_num = Number(num.toFixed(2));
    },
    // 查询评分列表
    async getOwnScore() {
      const url = "~/api/score/get_list";
      const params = {
        source_table: this.sourcetable,
        source_field: this.sourcefield,
        source_id: this.obj[this.sourcefield],
      };
      const res = await this.$get(url, params);
      console.log(res);
      this.score_list = res.result.list;
      this.starCounts = [0, 0, 0, 0, 0];
      this.score_list.forEach((item) => {
        this.starCounts[item.score_num - 1]++
      });
      const total = this.score_list.length;
      const series = total ? this.starCounts.map(count => Number((count / total).toFixed(2))): this.starCounts;
      
      this.option.series[0].data = series;
      this.init_chart();
    },
    init_chart() {
      let option = this.option;
      let myChart = echarts.init(document.getElementById('score_statistics'));
      myChart.setOption(option);
    },
  },
  watch: {
    refreshScore: {
      handler(newValue, oldValue) {
        if (newValue) {
          this.getOwnScore();
          this.getScore();
        }
      },
      deep: true,
    },
  },
};
</script>
<style>
.score_statistics_chart {
  width: 160px;
}
.score_statistics_chart .score_statistics_chart_top {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  padding: 5px 5px 0;
  background-color: #fff;
}
.score_statistics_chart .score {
  font-size: 24px;
  margin-right: 5px;
}
.score_statistics_chart .score_person_num {
  font-size: 12px;
  color: #6195bd;
  text-align: left;
}
.score_statistics_chart .score_statistics {
  width: 100%;
  height: 160px;
  background-color: #fff;
}
.score_statistics_chart .el-rate__icon {
  margin: 0 !important;
}
</style>
