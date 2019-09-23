var config = require('../../../config')
var util = require('../../../utils/util.js')

const recorderManager = wx.getRecorderManager()
var tempFilePath
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subjectInfo: {},
    comment: '',
    paperid: '',
    subjectId: '',
    fileUrl: '',
    isPlay: 0,
    current: ''
  },

  onLoad: function (options) {
    console.log(options)
    this.getSubjectInfo(options.paperId, options.subjectId)
  },

  getSubjectInfo: function (paperId, subjectId) {
    wx.request({
      url: `${config.service.host}/subjectInfo`,
      method: 'get',
      data: { paperId: paperId, subjectId: subjectId },
      success: (res) => {
        console.log(res.data)
        this.setData({
          subjectInfo: res.data[0]
        })
      }
    })
  },

  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,//当前点击的图片链接
      urls: [current]
    })
  },

})