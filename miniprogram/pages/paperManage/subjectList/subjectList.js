var config = require('../../../config')
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paper: [],
    paperId : ''
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
      url: '../checkSubject/checkSubject?paperId=' + this.data.paperId + '&subjectId=' + subjectId
    })
  },

  checkSubject(e){
    console.log(e)
    var answer = 0
    if(e.detail.value == true){
      answer = 1
    }
    var subjectId = e.currentTarget.dataset.subject_id
    wx.request({
      url: `${config.service.host}/checkSubject`,
      method: 'put',
      data: { paperId: this.data.paperId, subjectId: subjectId, answer: answer },
      success: (res) => {
        console.log(res.data)
      }
    })
  },

  getSubjectList: function (paperId) { 
    wx.request({
      url: `${config.service.host}/paperInfo`,
      method: 'get',
      data: {paperId: paperId},
      success: (res) => {
        console.log(res.data)
        this.setData({
          paper: res.data
        })
      }
    })
  },


})