var app = getApp()
var qcloud=require('../../vendor/wafer2-client-sdk/index.js')
var util = require('../../utils/util.js');
Page({

  data: {
    userid: '',
    username: "",
    mylist: [
      {
        name: '想吃',
        pic: "/assets/images/lemon1.png",
        url: '../wanteat/wanteat'
      },
      {
        name: '点评',
        pic: "/assets/images/lemon4.png",
        url: '../comment_history/comment_history'
      }

    ],

  },

  onLoad: function (options) {
    //console.log(app.globalData)
    this.setData({
      userid: app.globalData.islog
    })


  },

  getuserinfo() {
    // var openid = app.globalData.openid
    // var that = this
    // var info = e.detail.userInfo
    // console.log(e)
    // wx.request({
    //   url: 'https://351750381.shuguide.org/User/adduser',
    //   data: {
    //     'nickname': info['nickName'],
    //     'gender': info['gender'],
    //     'openid': openid,
    //     'userAvatar': info['avatarUrl']
    //   },
    //   method: 'GET',
    //   success: function (res) {
    //     console.log(res)
    //     app.globalData.userid=res.data.uid
    //     that.setData({
    //       userid: 1
    //     })
    //   }
    // })

  

  },
  doLogin: function (e) {
var that=this
    const session = qcloud.Session.get()
    qcloud.setLoginUrl('https://shufood.emx6.com/login');
       // 首次登录
      qcloud.login({
        success: res => {
         // console.log(res)
          app.globalData.userid = res.uid
          app.globalData.islog = 1
          that.setData({
            userid:1
          })

          util.showSuccess('登录成功')
        },
        fail: err => {
          console.error(err)
          util.showModel('登录错误', err.message)
        }
      })
  }


})