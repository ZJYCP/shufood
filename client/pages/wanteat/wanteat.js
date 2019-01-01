const app = getApp()
import api from '../../utils/api.js'
import util from '../../utils/util.js'
Page({
  data: {
    dishlist: [],
    none:''
  },


  onLoad: function (options) {
    util.showBusy('疯狂加载中....', 800)
    var that = this
    api.getdish_bylove({
      query: {
        userid: app.globalData.userid
      },
      success(res) {
        console.log(res)
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

})