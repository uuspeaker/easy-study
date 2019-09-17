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
    isPlay: 0
  },

  onLoad: function (options) {
    console.log(options)
    this.getSubjectInfo(options.paperId, options.subjectId)
    this.setData({
      paperId: options.paperId,
      subjectId: options.subjectId
    })
    this.initRecorder()
  },

  toPaperDetail: function (e) {
    var paperId = e.currentTarget.dataset.paper_id
    wx.navigateTo({
      url: '../paperDetail/paperDetail'
    })
  },

  getSubjectInfo: function (paperId, subjectId) {
    wx.request({
      url: `${config.service.ocrHost}/subjectInfo`,
      method: 'get',
      data: { paperId:paperId, subjectId: subjectId },
      success: (res) => {
        console.log(res.data)
        this.setData({
          subjectInfo: res.data
        })
      }
    })
  },

  //用户按下录音按钮
  startRecord: function () {
    wx.showToast({
      title: '录音中',
    })
    this.setData({
      isPlay: 1
    })
      recorderManager.start(config.options)
  },

  //用户放开录音按钮
  stopRecord: function () {
    wx.showToast({
      title: '录音结束',
    })
    this.setData({
      isPlay: 0
    })
    recorderManager.stop();
  },

  commentChange(e){
    console.log(e)
    this.setData({
      comment: e.detail.value
    })
  },

  saveComment: function () {
    wx.request({
      url: `${config.service.ocrHost}/commentSubject`,
      method: 'post',
      data: { 
        paperId: this.data.paperId, 
        subjectId: this.data.subjectId, 
        commentText: this.data.comment, 
        commentAudioUrl: this.data.fileUrl 
        },
      success: (res) => {
        console.log(res.data)
        wx.showToast({
          title: '保存成功',
        })
      }
    })
  },

  saveFile: function (filePath) {
    var that = this
    const uploadTask = wx.uploadFile({
      url: `${config.service.ocrHost}/uploadFile`,
      filePath: filePath,
      name: 'file',
      success:  (result) => {
        console.log(result.data)
        this.setData({
          fileUrl: result.data
        })
      },

      fail: (e) => {
        console.error(e)
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