var WxParse= require('../../wxParse/wxParse.js');
import util from '../../utils/util.js'
import api from '../../utils/api.js'

Page({

 
  data: {
    
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
        temp=res.data.content
        WxParse.wxParse('article', 'html', temp, that, 5);  

      }
    })
  
  },

  onShareAppMessage: function () {},


  
})