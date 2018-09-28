// client/pages/rater/rater.js
import {
  $wuxRater
} from '../../components/wux'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
        id: '001',
        text: '口味',
        value: 3,
      },
      {
        id: '002',
        text: '上菜速度',
        value: 3,
      },
      {
        id: '003',
        text: '菜品种类',
        value: 3,
      },
      {
        id: '004',
        text: '价格',
        value: 3,
      },
      {
        id: '005',
        text: '就餐环境',
        value: 3,
      },
      {
        id: '006',
        text: '服务质量',
        value: 3,
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.items.forEach(n => $wuxRater.init(n.id, {
      value: n.value,
    }))
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})