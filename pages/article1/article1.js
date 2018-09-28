
import util from '../../utils/util.js'
import api from '../../utils/api.js'

Page({

 
  data: {
    articleurl:''
  },

 
  onLoad: function (options) {
    var that = this;
    var temp = ``;
    util.showBusy('疯狂加载中....',800)
    api.articledetail({
      query:{
        uid:options.uid
      },
      success(res){
        that.setData({
          articleurl:res.data.data.res[0].content
        })

      }
    })
  
  },

  onShareAppMessage: function () {},


  
})