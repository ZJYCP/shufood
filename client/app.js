App({

  onLaunch: function () {
    var that=this;
    wx.login({
      success: function (res) {
        var code = res.code;
        if (code) {
          console.log('获取用户登录凭证：' + code);

          // --------- 发送凭证 ------------------
          wx.request({
            url: 'https://351750381.shuguide.org/User/login',
            data: { code: code },
            success: function (res) {
              console.log(res)
              that.globalData.userid = res.data[0]
              that.globalData.openid = res.data[1]

            }
          })
          // ------------------------------------

        } else {
          console.log('获取用户登录态失败：' + res.errMsg);
        }
      }
    });
  },

  globalData: {
    imghost: 'https://food.shuguide.org/uploads/',
    userid: '',
    openid:''
  }
})
