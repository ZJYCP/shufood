import api from '../../utils/api.js'
import { $wuxButton } from '../../components/wux'
import { $wuxNotification } from '../../components/wux'
const app = getApp()
var util = require('../../utils/util.js');
var dishid_global = ''
Page({

  data: {
    dishid: '',
    pic: "",
    name: "",
    price: "",
    where: "",
    like_count: '',
    view: '',
    comment: '',
    islove: '',
    iscollect: '',
    types: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
    index: 3,
    opened: !1,
    count:null

  },

  onLoad: function (options) {
   
    dishid_global = options.id
    var that = this
    api.getdish_byid({
      query: {
        id: options.id
      },
      success(res) {
        var data = res.data.data.res[0]
        // console.log(data)
        var floor = data.dishFloor == 1 ? '一楼' : data.dishFloor == 2 ? '二楼' : '三楼'
        api.getcomment({
          query: {
            dishid: options.id
          },
          success(res) {

            that.setData({
              comment: res.data.data.res,
              count: res.data.data.count[0].a,
              pic: data.dishImg,
              name: data.dishName,
              price: data.dishPrice,
              where: data.dishPlace + floor + '  ' + data.dishType,
              like_count: data.dishLike,
              view: data.dishView
            })
            setTimeout(function () {
              wx.hideLoading()
            }, 1000)
          }
        })
      }
    })
    this.initButton()
    if (!app.globalData.islog) {
      this.setData({
        islove: 0,
        iscollect: 0
      })
    } else {
      api.islove({
        query: {
          userid: app.globalData.userid,
          dishid: options.id
        },
        success(res) {
          //console.log(res.data.data.res)
          if (!res.data.data.res.length) {
            that.setData({
              islove: 0
            })
          } else {
            that.setData({
              islove: res.data.data.res[0].value
            })
          }
        }
      })
      api.iscollect({
        query: {
          userid: app.globalData.userid,
          dishid: options.id
        },
        success(res) {
          //console.log(res)
          if (!res.data.data.res.length) {
            that.setData({
              iscollect: 0
            })
          } else {
            that.setData({
              iscollect: res.data.data.res[0].value
            })
          }
        }
      })
    }
    wx.showLoading({
      title: '拼命加载中.....',
    })
  },

  previewImage: function (e) {

  },

  toCollect: function () {
    var that = this
    var temp = this.data.iscollect
    if (!app.globalData.islog) {
      wx.showModal({
        title: '蒽？',
        content: '你好像还没登录',
        cancelText: '不了',
        confirmText: '去登录',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/person/person'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      if (temp == 0) {
        api.collect({
          query: {
            userid: app.globalData.userid,
            dishid: dishid_global,
            value: 1
          },
          success(res) {
            //console.log(res)
            util.showSuccess('您收藏了这个菜')
            var view_old = parseInt(that.data.view)
            that.setData({
              iscollect: 1,
              view: view_old + 1
            })
          }
        })
      } else {
        api.collect({
          query: {
            userid: app.globalData.userid,
            dishid: dishid_global,
            value: 0
          },
          success(res) {
            //   console.log(res)
            util.showSuccess('您取消了收藏')
            that.setData({
              iscollect: 0,
              view: that.data.view - 1
            })
          }
        })
      }
    }

  },
  tolike: function () {
    var that = this
    var temp = this.data.islove
    if (!app.globalData.islog ) {
      wx.showModal({
        title: '蒽？',
        content: '你好像还没登录',
        cancelText: '不了',
        confirmText: '去登录',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/person/person'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      if (temp == 0) {
        api.love({
          query: {
            userid: app.globalData.userid,
            dishid: dishid_global,
            value: 1
          },
          success(res) {
            //console.log(res)
            var likecount_old = parseInt(that.data.like_count)
            util.showSuccess('您给了一个赞')
            that.setData({
              islove: 1,
              like_count: likecount_old + 1
            })
          }
        })
      } else {
        api.love({
          query: {
            userid: app.globalData.userid,
            dishid: dishid_global,
            value: 0
          },
          success(res) {
            //   console.log(res)
            util.showSuccess('您取消了这个赞')
            that.setData({
              islove: 0,
              like_count: that.data.like_count - 1
            })
          }
        })
      }
    }
  },

  toComment: function () {
    if (app.globalData.islog == 0) {
      wx.showModal({
        title: '蒽？',
        content: '你好像还没登录',
        cancelText: '不了',
        confirmText: '去登录',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/person/person'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    else {
      wx.navigateTo({
        url: '/pages/comment/comment?dishid=' + dishid_global
      });
    }
  },
  initButton(position = 'bottomRight') {
    this.setData({
      opened: !1,
    })

    this.button = $wuxButton.init('br', {
      position: position,
      buttons: [
        {
          label: '分享这道菜',
          icon: "data:image/png;base64,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",
        },
        {
          label: '回到首页',
          icon: "data:image/png;base64,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",
        }
      ],
      buttonClicked(index, item) {
        var that=this
        switch(index){
          case 0:
            {
            this.closeNotification = $wuxNotification.show({
              image: 'data:image/png;base64,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',
              title: '分享',
              text: '嘤嘤嘤，麻烦亲点击右上角的•●•    ↗↗↗',
              data: {
                message: 'okay'
              },
              timer: 3000,
              onClick(data) {
                console.log(data)
              },
              onClose(data) {
                console.log(data)
              },
            })}
            break;
          case 1:
            wx.switchTab({
              url: '/pages/index/index'
            })
            break;
            default:{
            }
        }
        return true
      },
      callback(vm, opened) {
        vm.setData({
          opened,
        })
      },
    })
  },

  showNotification() {
    this.closeNotification = $wuxNotification.show({
      image: 'http://light7.org/assets/img/i-wechat.png',
      title: '分享',
      text: '嘤嘤嘤，点击右上角',
      data: {
        message: '逗你玩的!!!'
      },
      timer: 3000,
      onClick(data) {
        console.log(data)
      },
      onClose(data) {
        console.log(data)
      },
    })
  },
  onShareAppMessage: function (res) {

  },

})