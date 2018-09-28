import api from '../../utils/api.js'
import util from '../../utils/util.js'
import { $wuxFilterBar } from '../../components/wux'

Page({

  data: {
    pageStyle: undefined,
    items: [{
      type: 'text',
      label: '智能排序',
      value: 'null',
      groups: ['001'],
    },
    {
      type: 'sort',
      label: '价格',
      value: 'dishPrice',
      groups: ['002'],
    },
    {
      type: 'sort',
      label: '喜爱',
      value: 'dishLike',
      groups: ['003'],
    },
    {
      type: 'filter',
      label: '筛选',
      value: 'filter',
      children: [
        {
          type: 'check',
          label: '价格等级',
          value: 'price',
          children: [{
            label: '1元',
            value: '1',
          },
          {
            label: '2元',
            value: '2',
          },
          {
            label: '3元',
            value: '3',
          },
          {
            label: '4元',
            value: '4',
          },
          {
            label: '5元土豪',
            value: '5',
          },
          ],
        },
        {
          type: 'checkbox',
          label: '食堂',
          value: 'place',
          children: [{
            label: '益新',
            value: '益新',
          },
          {
            label: '尔美',
            value: '尔美',
          },
          {
            label: '山明',
            value: '山明',
          },
          {
            label: '水秀',
            value: '水秀',
          },
          ],
        },
      ],
      groups: ['001', '002', '003'],
    },
    ],
    havesearch: 0,
    dishlist: [],
    hotKeys: [],
    tipkeys: [],
    input: [],
    history: []
  },

  onLoad: function () {
    this.getHisKeys()
    this.gethotsearch()

    this.$wuxFilterBar = $wuxFilterBar.init({
      items: this.data.items,
      onChange: (checkedItems, items) => {
        const params = {}

        checkedItems.forEach((n) => {
          if (n.checked) {
            if (n.value === 'auto') {
              //  const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
              //params.place = n.value
              params.sort = n.value

            } else if (n.value === 'dishPrice') {
              params.sort = n.value
              params.order = n.sort === 1 ? 'ASC' : 'DESC'

            } else if (n.value === 'dishLike') {
              params.sort = n.value
              params.order = n.sort === 1 ? 'ASC' : 'DESC'
            } else if (n.value === 'filter') {
              n.children.filter((n) => n.selected).forEach((n) => {
                if (n.value === 'price') {
                  const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
                  params.price_mult = selected
                } else if (n.value === 'place') {
                  const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
                  params.place_mult = selected
                }

              })
            }
          }
        })

        this.gosearch(params)
      },
      onScroll(e) {
        console.log('onScroll', e)
        this.setData({
          pageStyle: 'height: 100vh; overflow: hidden;',
        })
      },
    })

  },

  gethotsearch: function () {
    var that = this
    api.getHotsearch({
      query: {
      },
      success(res) {
        //console.log(res.data)
        that.setData({
          hotKeys: res.data.data.res
        })
      }
    })
  },

  /************输入时操作************/
  inputing: function (e) {
    var that = this
    var inputValue = e.detail.value
    var tipKey = []
    if (inputValue && inputValue.length > 0) {
      api.gettipkey({
        query: {
          name: inputValue
        },
        success(res) {
          that.setData({
            tipkeys: res.data.data.res,
            input: inputValue,
          });
        }
      })
    } else {
      that.setData({
        tipkeys: [],
        input: inputValue
      });
    }

  },

  /************历史记录相关**********/
  getHisKeys: function () {
    var value = [];
    try {
      value = wx.getStorageSync('historysearch')
      if (value) {
        this.setData({
          history: value
        });
      }
    } catch (e) {
    }
  },
  AddHisKey: function (inValue) {
    var that = this
    if (!inValue || inValue.length == 0) {
      return;
    }
    var value = wx.getStorageSync('historysearch');
    if (value) {
      if (value.indexOf(inValue) < 0) {
        value.unshift(inValue);
      }
      wx.setStorage({
        key: "historysearch",
        data: value,
        success: function () {
          that.getHisKeys();
        }
      })
    } else {
      value = [];
      value.push(inValue);
      wx.setStorage({
        key: "historysearch",
        data: value,
        success: function () {
          that.getHisKeys();
        }
      })
    }
  },
  DeleteHistory: function () {
    var that = this
    wx.removeStorage({
      key: 'historysearch',
      success: function (res) {
        var value = [];
        that.setData({
          history: value
        });
      }
    })
  },


  /*********搜索相关***************/
  directsearch: function (e) {
    this.setData({
      input: e.target.dataset.key
    })
    this.gosearch(e.target.dataset.key)
  },

  gosearch(params = {}) {
    var that = this
    var searchname = that.data.input
    if (searchname && searchname.length > 0) {
      that.$wuxFilterBar.onCloseSelect()
      //wx.showLoading()
      console.log(params)
      this.AddHisKey(searchname)
      api.getdish_bysearch({
        query: {
          name: that.data.input,
          category: null,
          sort: params.sort || null,
          order: params.order,
          price_mult: params.price_mult || null,
          place_mult: params.place_mult || null,
        },
        success(res) {
        //  wx.hideLoading()
          util.showBusy('正在搜索', 700)
          that.setData({
            havesearch: 1,
            dishlist: res.data.data.search__res
          })
        }
      })
      api.recordsearch({
        query: {
          content: searchname
        }
      })
    }
  },

  // gosearch: function (comvalue) {
  //   var that = this
  //   if (comvalue && comvalue.length > 0) {
  //     var value = comvalue
  //   } else {
  //     var value = this.data.input
  //   }
  //   util.showBusy('正在搜索', 700)
  //   if (value && value.length > 0) {
  //     this.AddHisKey(value)
  //     api.getdish_bysearch({
  //       query: {
  //         name: value,
  //         category:null,
  //         sort:  null,
  //         order:null ,
  //         price_mult: null,
  //         place_mult:  null,     
  //       },
  //       success(res) {
  //         that.setData({
  //           havesearch: 1,
  //           dishlist: res.data
  //         })
  //       }
  //     })
  //     api.recordsearch({
  //       query: {
  //         content: value
  //       }
  //     })
  //   }
  // },


})