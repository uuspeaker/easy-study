// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  toScan: function () {
    wx.navigateTo({
      url: '../paperManage/scanSubject/scanSubject'
    })
  },

})