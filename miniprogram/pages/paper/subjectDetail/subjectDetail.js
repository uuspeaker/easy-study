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

  initRecorder: function () {
    recorderManager.onStop((res) => {
      tempFilePath = res.tempFilePath
      this.saveFile(res.tempFilePath)
    })
  },

})