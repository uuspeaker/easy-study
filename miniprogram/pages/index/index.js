// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  toScan: function () {
    wx.navigateTo({
      url: '../paper/scanSubject/scanSubject'
    })
  },
  toWrongSubjectList: function () {
    wx.navigateTo({
      url: '../paper/wrongSubjectList/wrongSubjectList'
    })
  },

  toReport: function () {
    wx.navigateTo({
      url: '../report/subjectReport/subjectReport'
    })
  },

  toLive: function () {
    wx.navigateTo({
      url: '../live/index/index'
    })
  },

})