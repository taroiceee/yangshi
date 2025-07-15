<template>
  <div style="height: 100%">
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane v-for="item in vm.tabs" :label="item" :name="item"></el-tab-pane>
    </el-tabs>
    <div style="height: 300px;">
      <div class="line_chart" :id="id">折线图</div>
    </div>
  </div>
</template>

<script>
import * as echarts from "@/assets/js/echarts.min.js";
import fa from "element-ui/src/locale/lang/fa";
export default {
  name: "Home",
  components: {},
  props: {
    id: {
      type: String,
      default: "lineChart"
    },
    title: {
      type: String,
      default: "XXX折线图"
    },
    vm: {
      type: Object,
      default: function() {
        return {
          xAxis: "xAxis",
          names: "names",
          values: "values",
        };
      },
    },
    avg:{
      type:Boolean,
      default: false
    }
  },
  data() {
    return {
      activeName:"1111",
      option: {
        title: {
          text: "XXX折线图",
          left: "center",
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          y: 'bottom'
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: [{
          type: 'category',
          axisTick: {
            show: false
          },
          data: []
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [
          // {
          // 	name: 'Forest',
          // 	type: 'bar',
          // 	barGap: 0,
          // 	emphasis: {
          // 		focus: 'series'
          // 	},
          // 	data: [320, 332, 301, 334, 390]
          // },
        ]
      }
    };
  },
  created() {
    this.activeName = this.vm.tabs[0]
  },
  mounted() {
    this.init_chart();
  },
  methods: {
    changeTab(e){
      this.$emit('changeTab', this.activeName)
    },
    init_chart() {
      var option = this.option;

      var title = this.title;
      if (title) {
        option.title.text = title;
      }

      var series = this.series;
      option.series = series;

      var xAxis = option.xAxis[0];
      xAxis.data = this.vm.xAxis;

      if (xAxis.data.length>4){
        option.axisLabel= {
          interval: 0, //使x轴文字显示全
          formatter: function (params) {
            let newParamsName = '';
            const paramsNameNumber = params.length; // 文字总长度
            const provideNumber = 4; //一行显示几个字
            const rowNumber = Math.ceil(paramsNameNumber / provideNumber);
            if (paramsNameNumber > provideNumber) {
              for (let p = 0; p < rowNumber; p++) {
                const start = p * provideNumber;
                const end = start + provideNumber;
                const tempStr = p === rowNumber - 1 ? params.substring(start, paramsNameNumber) : params.substring(start, end) + '\n';
                newParamsName += tempStr;
              }
            } else {
              newParamsName = params;
            }
            return newParamsName;
          },
        }
      }

      let myChart = echarts.init(document.getElementById(this.id));
      myChart.setOption(option);
    },
  },
  computed: {
    series() {
      var vm = this.vm;
      var list = this.vm.names;
      var values = vm.values;
      let labelOption = {
        show: true,
        position: "insideBottom",
        distance: 15,
        align: 'left',
        verticalAlign: 'middle',
        rotate: 90,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
          name: {}
        }
      };
      var series = [];
      for (let i=0;i<list.length;i++){
        let data = []

        if(this.avg){
          data = values[i]
        }else {
          for (let j=0;j<values.length;j++){
            data.push(values[j][i]);
          }
        }
        let dict_type = {
          barWidth:50,
          name: list[i],
          type: 'bar',
          barGap: 0,
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: data
        }
        series.push(dict_type);
      }
      return series;
    }
  },
  watch: {
    series: {
      handler(){
        this.init_chart();
      }
    },
  },
};
</script>
