var config = require('../../../config')
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    report: []
  },

  onLoad: function (options) {
    this.getReport()
  },

  getReport: function () {
    wx.request({
      url: `${config.service.host}/subjectReport`,
      method: 'get',
      data: {},
      success: (res) => {
        console.log(res.data)
        this.setData({
          report: res.data
        })
      }
    })
  },



})