const app = getApp()
import api from '../../utils/api.js'
Page({
  data: {
    awardsList: {},
    animationData: {},
    btnDisabled: '',
    modalControl: false,

    scrollLeft: 0,
    //滚动的数组
    dishlist: [],
    list: [
      {
        name: '日韩料理',
        pic: "/assets/images/rihan.png",
        url: '/pages/jkfood/jkfood?category=日韩料理',
      },
      {
        name: '西式餐点',
        pic: '/assets/images/xishi.png',
        url: '/pages/jkfood/jkfood?category=西式餐点',
      },
      {
        name: '港式风味',
        pic: '/assets/images/gangshi.png',
        url: '/pages/jkfood/jkfood?category=港式风味',
      },
      {
        name: '清真美食',
        pic: "/assets/images/qingzhen.png",
        url: '/pages/jkfood/jkfood?category=清真美食',
      },
      {
        name: '包子粥面',
        pic: '/assets/images/baozi.png',
        url: '/pages/jkfood/jkfood?category= 包子粥面',
      },
      {
        name: '香锅小炒',
        pic: '/assets/images/xiangguo.png',
        url: '/pages/jkfood/jkfood?category=香锅小炒',
      },
    ],
  },
  //点击搜索框
  click_search: function () {
    wx.navigateTo({
      url: '/pages/search/search'
    });
  },

  //今天吃啥
  click_whattoeat: function () {
    wx.navigateTo({
      url: '/pages/what_to/what_to'
    });


  },

  showtous: function () {
    wx.showModal({
      title: '34',
      content: '555',
    })
  },
  showModal: function (e) {
    this.setData({
      modalControl: true
    })
  },
  hideModal: function (e) {
    this.setData({
      modalControl: false
    })
  },
  getdish_byhot: function () {
    // api.getdish_byhot()
  },

  onLoad: function (options) {
    var that = this
    api.getdish_byhot({
      query: {
      },
      success(res) {
        //console.log(res.data)
        that.setData({
          dishlist: res.data.data.hotdish
        })
      }
    }
    )

  },
  onPullDownRefresh: function () {
    // Do something when pull down.
  },
  onReachBottom: function () {
    // Do something when page reach bottom.
  },
  onPageScroll: function () {
    // Do something when page scroll
  },

})

