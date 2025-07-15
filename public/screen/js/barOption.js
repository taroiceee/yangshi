// 柱状图 option 封装（支持双系列、工具箱、标记等）
// data: 数据数组，格式为 [[商家名称1, 注册资本, 员工数], [商家名称2, 注册资本, 员工数], ...]
// labels: 标签数组，对应data中每个子数组的第一个元素
// seriesNames: 系列名称数组，如 ['注册资本', '员工数']
function getBarOption(data, labels, seriesNames) {
    var values = [];
    data.forEach(o => {
        values.push(o.splice(1));
    });
    var series = [];
    for (let i = 0; i < seriesNames.length; i++) {
        series.push({
            name: seriesNames[i],
            type: 'bar',
            data: values.map(v => v[i]),
            markPoint: {
                data: [
                    { type: 'max', name: 'Max' },
                    { type: 'min', name: 'Min' }
                ],
                itemStyle: {
                    color: barColors.gradient[i % barColors.gradient.length]
                }
            },
            markLine: {
                data: [{ type: 'average', name: 'Avg' }]
            },
            itemStyle: {
                ...barColors.itemStyle,
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: barColors.gradient[i % barColors.gradient.length] // 顶部颜色
                        },
                        {
                            offset: 1,
                            color: hexToRGBA(barColors.gradient[i % barColors.gradient.length], barColors.bar_opacity) // 底部颜色变浅
                        }
                    ]
                }
                // barColors.gradient[i % barColors.gradient.length]
            },
            emphasis: barColors.emphasis
        });
    }
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            textStyle: {
                color: barColors.tooltip.color
            }
        },
        legend: {
            data: seriesNames,
            textStyle: {
                color: barColors.text
            }
        },
        grid: {
            left: '3%',
            right: '7%',
            bottom: '8%',
            top: '25%',
            containLabel: true
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                data: labels,
                axisLine: {
                    lineStyle: {
                        color: barColors.axis.line
                    }
                },
                axisLabel: {
                    color: barColors.axis.label,
                    rotate: 45
                },
                splitLine: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: barColors.axis.line
                    }
                },
                axisLabel: {
                    color: barColors.axis.label
                },
                splitLine: {
                    lineStyle: {
                        color: barColors.axis.splitLine
                    }
                }
            }
        ],
        dataZoom: [{
            type: 'slider',  // 滑动条型dataZoom
            show: labels.length > 6, // 只有数据超过6条时才显示
            start: 0,        // 默认起始位置
            end: Math.min(100, (6 / labels.length * 100)), // 默认显示6个柱子的比例
            xAxisIndex: 0,   // 控制第一个x轴
            height: 15,      // 滑动条高度
            bottom: 5       // 距离底部距离
        }],
        series: series
    };
}
function hexToRGBA(hex, opacity) {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
