
var app = getApp();
var util = require('../../utils/util.js');
var api = require('../../utils/api.js');
var dishid = ''
//var api = require('../../config/api.js');
Page({
  data: {
    typeId: 0,
    valueId: 0,
    content: '',
    hidden_piclist: [], //用于存储本地待上传的图片数组
    preview_piclist: [],//用于存储本地展示的数组
    ForumTypesName: [],
    ForumTypesId: [],
    nowfid: null,
    HostUrl: '',
    editMod: 'new',
    editId: 0,
    SelectHidden: false,
  },
  onLoad: function (options) {
    dishid = options.dishid
    var that = this;
    that.setData({
      typeId: parseInt(options.typeId),
      valueId: parseInt(options.valueId)
    });

  },
  onClose() {
    wx.navigateBack({
      delta: 1
    });
  },
  onPost() {
    let that = this;

    if (!this.data.content) {
      //util.showErrorToast('请填写评论')
      util.showModel('蒽？', '好像什么都没写哦')
      return false;
    }

    api.addcomment({
      query: {
        userid: app.globalData.userid,
        dishid: dishid,
        content: that.data.content
      },
      success(res) {
        //console.log(res)
        util.showBusy('提交中......',1000)
       // 
        setTimeout(function () {
          util.showSuccess('发布成功')
        }, 1300)
            

        setTimeout(function () {
          wx.redirectTo({
            url: '../details/details?id=' + dishid,
          })
        }, 1600)

      }
    })


  },
  bindInpuntValue(event) {

    let value = event.detail.value;

    //判断是否超过140个字符
    if (value && value.length > 140) {
      return false;
    }

    this.setData({
      content: event.detail.value,
    })
    console.log(event.detail)
  },
  Selectimg: function () {
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        //console.log(res)
        var hidden_piclist = that.data.hidden_piclist;
        var preview_piclist = that.data.preview_piclist;
        var tempFilePaths = res.tempFilePaths;

        if (hidden_piclist.length + tempFilePaths.length >= 6) {
          //utils.showModel('提示', '最多只能同时上传五张图片')
          return false;
        }
        if (hidden_piclist.length + tempFilePaths.length == 5) {
          that.setData({ SelectHidden: true })
        }
        for (var i = 0; i < tempFilePaths.length; i++) {
          preview_piclist.push(tempFilePaths[i]);
          that.setData({ preview_piclist: preview_piclist });
          //utils.showBusy('请稍后，正在加载图片');
          wx.uploadFile({
            url: 'https://351750381.shuguide.org/upload/do_upload',
            filePath: tempFilePaths[i],
            name: 'file',
            success: function (res) {
              console.log(res)
              // res.data = JSON.parse(res.data);
              // hidden_piclist.push(res.data.img);
              // preview_piclist.push(tempFilePaths[i]);
              // console.log(preview_piclist)
              that.setData({ hidden_piclist: hidden_piclist });

              // if (i == tempFilePaths.length) {
              //   wx.hideToast();
              // }
            }
          })


        }




      }
    })
  },
  delpic: function (e) {
    var that = this;
    var hidden_piclist = that.data.hidden_piclist;
    var preview_piclist = that.data.preview_piclist;

    hidden_piclist.splice(e.currentTarget.id, 1);
    preview_piclist.splice(e.currentTarget.id, 1);

    that.setData({ hidden_piclist: hidden_piclist });
    that.setData({ preview_piclist: preview_piclist });
    if (hidden_piclist.length < 9) {
      that.setData({ SelectHidden: '' })
    }
  },
})