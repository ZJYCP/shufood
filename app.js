var qcloud = require('./vendor/wafer2-client-sdk/index.js')

App({

  onLaunch: function () {
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        //console.log(res.windowHeight)
        that.globalData.height=res.windowHeight
      },
    })
    // wx.login({
    //   success: function (res) {
    //     var code = res.code;
    //     if (code) {
    //       console.log('获取用户登录凭证：' + code);

    //       // --------- 发送凭证 ------------------
    //       wx.request({
    //         url: 'https://351750381.shuguide.org/User/login',
    //         data: { code: code },
    //         success: function (res) {
    //           console.log(res)
    //           that.globalData.userid = res.data[0]
    //           that.globalData.openid = res.data[1]

    //         }
    //       })
    //       // ------------------------------------

    //     } else {
    //       console.log('获取用户登录态失败：' + res.errMsg);
    //     }
    //   }
    // });
    qcloud.setLoginUrl('https://shufood.emx6.com/login');

      // 第二次登录
      // 或者本地已经有登录态
      // 可使用本函数更新登录态
      qcloud.loginWithCode({
        success: res => {

          that.globalData.userid = res.uid
          that.globalData.islog=res.islog
          // util.showSuccess('登录成功')
        },
        fail: err => {
          // console.error(err)
          // util.showModel('登录错误', err.message)
        }
      })
  
    console.log(this.globalData)

  },

  globalData: {
    imghost: 'https://shufood-1252832257.cos.ap-shanghai.myqcloud.com',
    userid: '',
    islog:'',
    height:''
  }
})
