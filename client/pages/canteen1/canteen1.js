//ct1.js

import api from '../../utils/api.js'
const app = getApp()
Page({

  data: {
    canteen:'',
    dishlist: [],
    stairs: [
      {  //一楼
        index: 0,
        floor: "一楼",
        ishaveChild: true,
        children:
        [
          //自选
          {
            winid: 1,
            name: '自选',
          },
          //面食
          {
            winid: 2,
            name: '面食'
          },

          //点心
          {
            winid: 3,
            name: '点心'
          },

          //小炒
          {
            winid: 4,
            name: '小炒'
          },

          //铁板
          {
            winid: 5,
            name: '铁板'
          },

          //砂锅
          {
            winid: 6,
            name: '砂锅'
          }
        ]
      },

      {  // 二楼
        index: 1,
        floor: "二楼",
        ishaveChild: true,
        children:
        [
          {
            winid: 1,
            name: '自选'
          },
          {
            winid: 2,
            name: '面条'
          },
          {
            winid: 3,
            name: '粥点'
          },
          {
            winid: 4,
            name: '焗饭'
          },
          {
            winid: 5,
            name: '香锅'
          },
          {
            winid: 6,
            name: '盖饭'
          },
          {
            winid: 7,
            name: '粉丝汤'
          }
        ]
      },
      {  // 三楼
        index: 2,        
        floor: "三楼",
        ishaveChild: true,
        children:
        [
          {
            winid: 1,
            name: '人气推荐'
          },
          {
            winid: 2,
            name: '江浙口味'
          },
          {
            winid: 3,
            name: '川香麻辣'
          },
          {
            winid: 4,
            name: '爽口凉菜'
          },
          {
            winid: 5,
            name: '花样主食'
          },
          {
            winid: 6,
            name: '当季新品'
          }
        ]
      }

    ],
    curIndex: 0,
    curWindow: 1,
    curplace:''



  },    //  data end

  onLoad: function (options) {
    var canteen = options.canteen
    if (canteen) {
      wx.setNavigationBarTitle({
        title: canteen+'食堂'
      })
      this.getdish(canteen,0)
      this.setData({
        curplace:canteen,
      })
    }

    var that = this
    //TEST
    // api.getdish_byhot({
    //   query: {
    //   },
    //   success(res) {
    //     //console.log(res.data)
    //     that.setData({
    //       dishlist: res.data
    //     })
    //   }
    // })
  },

  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { },


  stairTab: function (e) {
    let i = e.target.dataset.index;
this.getdish(this.data.curplace,i)
    // this.setData({
    //   curIndex: i,
    //   curWindow: 1
    // })
  },

  windowTab: function (e) {
    let i = e.target.dataset.index;
    this.setData({
      curWindow: i
    })
  },

getdish:function(place,floor=1){
  var that=this
  wx.showLoading({
    title: '努力加载中.....',
  })
  api.getdish_bycant({
    query: {
        place:place,
        floor:floor+1
    },
    success(res) {
      setTimeout(function () {
        wx.hideLoading()
      }, 500)
      that.setData({
        dishlist: res.data,
        curIndex: floor,
        curWindow: 1
      })
    }
  })
}

})