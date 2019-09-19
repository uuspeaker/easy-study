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
          url: `${config.service.host}/paperInfo`,
          filePath: filePath,
          name: 'file',
          formData: {},
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

  toPaperList: function () {
    wx.navigateTo({
      url: '../paperList/paperList'
    })
  },
})