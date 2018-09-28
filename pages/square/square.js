const app = getApp()
import api from '../../utils/api.js'
import * as echarts from '../../utils/ec-canvas/echarts';
import { $wuxPicker} from '../../components/wux'
let chart = null;
let chart_radar=null

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    color: [ '#32c5e9'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['喜爱度']
    },
    grid: {
      left: 20,
      right: 20, 
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['宫保鸡丁','夫妻肺片', '年糕肉片', '咖喱鸡块', '青瓜贡丸', '麻辣豆腐','红烧鱼'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '喜爱度',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data:[210,230,270,300,300,340,344],
        itemStyle: {
          // emphasis: {
          //   color: '#37a2da'
          // }
        }
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

function initbadChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    color: ['#67e0e3'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['差评']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['奶香水果肉', '炸猪排', '鱼香豆腐', '葱油南瓜', '西兰花肉片'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '差评',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [23,24,43,57,60],
        itemStyle: {
          // emphasis: {
          //   color: '#37a2da'
          // }
        }
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

function initradarChart(canvas, width, height) {
  const chart_radar = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart_radar);

  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#FF9F7F"],
    tooltip: {},
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    radar: {
      // shape: 'circle',
      indicator: [{
        name: '口感',max: 500},{name: '服务质量',max: 500},{name: '种类',max: 500},{name: '上菜速度',max: 500},{name: '价格',max: 500},
      {name: '就餐环境',max: 500}]
    },
    series: [{
      name: 'radar_canteen',
      type: 'radar',
      data: [{
        value: [430, 340, 500, 300, 490, 400],
        name: 'radar'
      }
      ]
    }]
  };

  chart_radar.setOption(option);
  return chart_radar;
}
Page({


  data: {
    ///导航two
    two: [{index: 1,name: '吃货说',},{index: 2,name: '排行榜',},{index: 3,name: '说食堂'}],
    ec: {
      onInit: initChart
    },
    ec_bad:{
      onInit:initbadChart
    },
    ec_radar:{
      onInit:initradarChart
    },
    ///吃货咨询
    height:'' ,
    eat_info:[],
    cur: 1,
    name:'益新一楼'
  },


  onLoad: function (options) {
    var _this = this
    this.getarticlelist()
    var query = wx.createSelectorQuery();
    query.select('.two').boundingClientRect(function (rect) {
      //console.log(rect.height)
      _this.setData({
        height: app.globalData.height-rect.height
      })
    }).exec();

  },

  onShareAppMessage: function () { },
  getarticlelist:function(){
    var that=this
      api.articlelist({
        query: {
        },
        success(res) {
          that.setData({
            eat_info: res.data.data.res
          })
        }
      })
  },

  Tab: function (e) {
    let i = e.target.dataset.index;
    this.getarticlelist(i)
    this.setData({
      cur: i
    })
  },
  gotoratar(){
    wx.navigateTo({
      url: '../rater/rater',
    })
  },
  onTapName() {
    $wuxPicker.init('name', {
      title: "请选择",
      cols: [
        {
          textAlign: 'center',
          values: ['益新','山明','水秀','尔美','吾馨']
        },
        {
          textAlign: 'center',
          values: ['全部', '一楼', '二楼', '三楼']
        },
        {
          textAlign: 'center',
          values: ['一周', '一月','所有']
        }
      ],
      value: [0, 0, 0],
      onChange(p) {
        console.log(p)
        this.setData({
          name: p.value
        })
      },
    })
  },

  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      console.log(chart)
    }, 2000);
  }


})