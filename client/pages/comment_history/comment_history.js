import api from '../../utils/api.js'
import util from '../../utils/util.js'
const app = getApp()
Page({

  data: {
    dishlist: [],
    comment:'',
    none:''

  },


  onLoad: function (options) {
    util.showBusy('疯狂加载中....', 800)
    var that=this
 api.getmycomment({
   query:{
     userid:app.globalData.userid
   },
   success(res){
     console.log(res.data)
     if(res.data==0){
       that.setData({
         none:true
       })
     }else{
       that.setData({
         dishlist: res.data
       })
     }


   }
 })

  },

  previewImage: function (e) {

  },

  toCollect: function () {

  },

  toComment: function () {
    wx.navigateTo({
      url: '/pages/show/show'
    });
  },

})