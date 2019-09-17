var config = require('../../../config')
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paper: []
  },

  onLoad: function (options) {
    this.getSubjectList(options.paperId, options.subjectId)
  },

  toPaperDetail: function (e) {
    var paperId = e.currentTarget.dataset.paper_id
    wx.navigateTo({
      url: '../paperDetail/paperDetail'
    })
  },

  getSubjectList: function (paperId, subjectId) {
    wx.request({
      url: `${config.service.ocrHost}/api/subjectInfo`,
      method: 'get',
      data: { paperId: paperId, subjectId: subjectId },
      success: (res) => {
        console.log(res.data)
        this.setData({
          paper: res.data
        })
      }
    })
  },


})