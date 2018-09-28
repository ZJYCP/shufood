// // jkfood.js
import api from '../../utils/api.js'
import { $wuxFilterBar } from '../../components/wux'


Page({
  data: {
    category:'',
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
  },
  onLoad(options) {
var category=options.category
if(category){
  this.setData({
    category: category
  })
  wx.setNavigationBarTitle({
    title: category
  })
}


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

            }  else if (n.value === 'dishLike') {
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

        this.getRepos(params)
      },
      onScroll(e) {
        console.log('onScroll', e)
        this.setData({
          pageStyle: 'height: 100vh; overflow: hidden;',
        })
      },
    })
    this.getRepos()
  },

  getRepos(params = {}) {
    var that=this
    this.$wuxFilterBar.onCloseSelect()
    wx.showLoading({
      title:'努力加载中'
    })
    api.getdish_bysearch({
      query: {
        name:null,
        category:that.data.category||null,
        sort:params.sort||null,
        order:params.order,
        price_mult: params.price_mult||null,
        place_mult:params.place_mult||null,     
      },
      success(res) {

        that.setData({
          dishlist: res.data.data.search__res
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 2500)
      }
    })
  },

})

