var config = require('../../../config')
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subjectList: [],
    paperId: ''
  },

  onLoad: function (options) {
    console.log('options', options)
    this.getSubjectList(options.paperId)
    this.setData({
      paperId: options.paperId
    })
  },

  toEvaluate: function (e) {
    var subjectId = e.currentTarget.dataset.subject_id
    wx.navigateTo({
      url: '../subjectDetail/subjectDetail?paperId=' + this.data.paperId + '&subjectId=' + subjectId
    })
  },

  getSubjectList: function (paperId) {
    wx.request({
      url: `${config.service.host}/wrongSubjectList`,
      method: 'get',
      data: { paperId: paperId },
      success: (res) => {
        console.log('wrongSubjectList', res.data)
        this.setData({
          subjectList: res.data
        })
      }
    })
  },


})