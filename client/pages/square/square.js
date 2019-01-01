const app = getApp()
import api from '../../utils/api.js'
Page({


  data: {
    ///导航two
    two: [
      {
        index: 1,
        name: '吃货说',
      },

      {
        index: 0,
        name: '食堂说'
      }
    ],

    ///吃货咨询

    eat_info:[],

    ///食堂咨询
    can_info: [],
    cur: 1
  },


  onLoad: function (options) {
    var _this = this
    this.getarticlelist(1)

  },

  onShareAppMessage: function () { },
getarticlelist:function(type){
  var that=this
  if (type== 1) {
    api.articlelist({
      query: {
        type: 'eat'
      },
      success(res) {
        that.setData({
          eat_info: res.data
        })
      }
    })
  }
  else if (type == 0) {
    api.articlelist({
      query: {
        type: 'cant'
      },
      success(res) {
        that.setData({
          can_info: res.data
        })
      }
    })
  }
},

  Tab: function (e) {
    let i = e.target.dataset.index;
    this.getarticlelist(i)
    this.setData({
      cur: i
    })
  }


})