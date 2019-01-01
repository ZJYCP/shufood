var app = getApp()
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

    this.setData({
      userid: app.globalData.userid
    })


  },

  getuserinfo: function (e) {
    var openid = app.globalData.openid
    var that = this
    var info = e.detail.userInfo
    console.log(e)
    wx.request({
      url: 'https://351750381.shuguide.org/User/adduser',
      data: {
        'nickname': info['nickName'],
        'gender': info['gender'],
        'openid': openid,
        'userAvatar': info['avatarUrl']
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        app.globalData.userid=res.data.uid
        that.setData({
          userid: 1
        })
      }
    })

  }


})