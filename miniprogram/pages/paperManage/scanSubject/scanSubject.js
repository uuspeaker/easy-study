var config = require('../../../config')
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 上传图片
  scan: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.uploadFile({
          url: `${config.service.host}/upload`,
          filePath: filePath,
          name: 'file',
          formData: {
            'user': '123'
          },
          success(res) {
            wx.hideLoading()
            util.showNotice('上传成功')
            const data = res.data
            console.log(data)
            //do something
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

  parsePhoto: function (url) {
    var that = this
    qcloud.request({
      url: `${config.service.host}/parsePhoto`,
      login: true,
      method: 'post',
      data: {
        'url': url
      },
      success: (result) => {
        console.log(result.data.data)
      },
      fail: (error) => {
        util.showModel('请求失败', error);
        console.log('request fail', error);
        this.setData({
          isLogin: 0
        })
      }
    })
  },

  toPaperList: function () {
    wx.navigateTo({
      url: '../paperList/paperList'
    })
  },
})