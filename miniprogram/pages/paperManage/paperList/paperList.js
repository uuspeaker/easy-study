var config = require('../../../config')
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paperList: []
  },

  onLoad: function (options) {
    this.getPaperList()
  },

  toPaperDetail: function (e) {
    var paperId = e.currentTarget.dataset.paper_id
    wx.navigateTo({
      url: '../paperDetail/paperDetail?paperId=' + paperId
    })
  },

  getPaperList: function () {
    wx.request({
      url: `${config.service.ocrHost}/api/testPaper`,
      method: 'get',
      data: {},
      success:(res) => {
        console.log(res.data)
        this.setData({
          paperList: res.data
        })
      }
    })
  },
  deletePaper: function (e) {
    var paperId = e.currentTarget.dataset.paper_id
    wx.request({
      url: `${config.service.ocrHost}/api/testPaper`,
      method: 'delete',
      data: {id: paperId},
      success:(res) => {
        this.getPaperList()
      }
    })
  },
  checkPaper: function (e) {
    var paperId = e.currentTarget.dataset.paper_id
    wx.navigateTo({
      url: '../checkPaper/checkPaper?paperId=' + paperId
    })
  },

  
})