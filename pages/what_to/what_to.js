var Zan = require('../../components/dist/index');

const config = require('./config');
const app = getApp()
const timer = null


Page(Object.assign({}, Zan.TopTips, {
  data: {
    config,
    dishesObjects: null,
    dish: "今天吃什么呢？",
    dishid: '',
    btnText: "开始！",
    isProcess: false,
    count: 0,
    loading: true,
  },

  bindClickTap: function () {
    var that = this
    clearInterval(this.data.timer);
    if (this.data.isProcess) {
      console.log("停止")
      this.setData({
        isProcess: false,
        btnText: "开始选择！"
      })

      wx.showModal({
        title: 'Okay！',
        content: '今天就吃' + that.data.dish + "！",
        confirmText: "好！看看",
        cancelText: "不吃，换",
        success: function (res) {
          console.log(that.data)
          if (res.confirm) {
            wx.redirectTo({
              url: '/pages/details/details?id=' + that.data.dishid
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      var newDishes = that.data.dishesObjects
      if (newDishes.length > 0) {
        this.setData({
          isProcess: true,
          btnText: "决定了！"
        })
        this.data.timer = setInterval(function () {
          var randomIndex = Math.floor((Math.random() * 100 % newDishes.length))
          var dishObject = newDishes[randomIndex]
          // if (!newDishes[randomIndex].keyword) {
          //   newDishes[randomIndex].keyword = newDishes[randomIndex].dishid
          // }
          that.setData({
            dish: newDishes[randomIndex].name,
            dishid: newDishes[randomIndex].dishid
          })
        }, 10);
      } else {
        wx.showModal({
          title: '提示',
          content: '菜单为空，请到自定义菜单中添加',
          showCancel: false
        })
      }
    }
  },
  onLoad: function () {
  },

  getDishesObjects() {
    var that = this
    wx.getStorage({
      key: 'dishesObjects',
      success: function (res) {
        that.setData({
          
          dishesObjects: res.data,
          loading: false
        });
      },
      fail: function (e) {
        wx.setStorage({
          key: "dishesObjects",
          data: config.dishesObjects,
          success: function (res) {
            that.getDishesObjects();
          },
          fail: function () {
          }
        })
      }
    })
  },
  onShow: function () {
    this.getDishesObjects()
  },

}))
