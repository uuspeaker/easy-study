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
    knowledgeTree:[],
    knowlegeContent: '',

    showInputStatus: false,
    inputValue: '',//点击结果项之后替换到文本框的值
    adapterSource: ["app", "application", "apply", "weixin", "WeiXin"],//本地匹配源
    bindSource: [],//绑定到页面的数据，根据用户输入动态变化
  },

  onLoad: function (options) {
    console.log(options)
    this.getSubjectInfo(options.paperId, options.subjectId)
    this.setData({
      paperId: options.paperId,
      subjectId: options.subjectId
    })
    this.initRecorder()
    this.initKnowledgeData()
  },

  toPaperDetail: function (e) {
    var paperId = e.currentTarget.dataset.paper_id
    wx.navigateTo({
      url: '../paperDetail/paperDetail'
    })
  },

  initKnowledgeData: function () {
    wx.request({
      url: `${config.service.host}/knowledgeTree`,
      method: 'get',
      data: {},
      success: (res) => {
        console.log(res.data)
        this.setData({
          knowledgeTree: res.data
        })
        this.initKnowledgeInfo()
      }
    })
  },

  initKnowledgeInfo(){
    var knowledge = []
    for (var i = 0; i<this.data.knowledgeTree.length; i++){
      if (this.data.knowledgeTree[i].isLeaf == 'leaf'){
        knowledge.push(this.data.knowledgeTree[i].lable)
      }
    }
    this.setData({
      adapterSource: knowledge
    })
  },

  getKnowledge(lable){
    var knowledgeList = [lable]
    var parentId = this.getParentId(lable)
    while (parentId){
      var parentNode = this.getNode(parentId)
      knowledgeList.push(parentNode.lable)
      parentId = parentNode.paperId
    }
    return knowledgeList.reverse().join('-')
  },

  getParentId(lable){
    var parentId
    for (var i = 0; i < this.data.knowledgeTree.length; i++) {
      if (this.data.knowledgeTree[i].lable == lable) {
        parentId = this.data.knowledgeTree[i].parentId
      }
    }
  },

  getNode(id) {
    var node
    for (var i = 0; i < this.data.knowledgeTree.length; i++) {
      if (this.data.knowledgeTree[i].id == id) {
        node = this.data.knowledgeTree[i]
      }
    }
  },

  getSubjectInfo: function (paperId, subjectId) {
    wx.request({
      url: `${config.service.host}/subjectInfo`,
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
      url: `${config.service.host}/commentSubject`,
      method: 'post',
      data: { 
        paperId: this.data.paperId, 
        knowledge: this.data.inputValue, 
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

  bindKeyInput: function (e) {
    var currentInputStatu = e.currentTarget.dataset.statu;
    var prefix = e.detail.value//用户实时输入值
    var newSource = []//匹配的结果
    if (prefix != "") {
      this.setData(
        {
          showBtnStatus1: false,
          showBtnStatus2: true
        }
      );
      this.data.adapterSource.forEach(function (e) {
        if (e.indexOf(prefix) != -1) {//返回某个指定的字符串值在字符串中首次出现的位置,如果要检索的字符串值没有出现，则该方法返回 -1
          newSource.push(e)
        }
      })
    } else {
      currentInputStatu = "close";
      this.setData(
        {
          isScroll: true,
          showBtnStatus1: true,
          showBtnStatus2: false
        }
      );
    }
    if (newSource.length != 0) {
      this.setData({
        bindSource: newSource
      })
    } else {
      this.setData({
        bindSource: []
      })
      currentInputStatu = "close";
      this.setData(
        {
          isScroll: "{{false}}"
        }
      );
    }
    //关闭 
    if (currentInputStatu == "close") {
      this.setData(
        {
          showInputStatus: false,
          isScroll: true
        }
      );
    }
    // 显示 
    if (currentInputStatu == "open") {
      this.setData(
        {
          showInputStatus: true,
          isScroll: "{{false}}"
        }
      );
    }
  },
  //点击选型确定input值
  itemtap: function (e) {
    var currentInputStatu = e.currentTarget.dataset.statu;
    
    this.setData({
      inputValue: e.target.id,
      bindSource: [],
      //knowlegeContent: this.getKnowledge(e.target.id)
    })
    //关闭 
    if (currentInputStatu == "close") {
      this.setData(
        {
          showInputStatus: false,
          isScroll: true
        }
      );
    }
    // 显示 
    if (currentInputStatu == "open") {
      this.setData(
        {
          showInputStatus: true,
          isScroll: "{{false}}"
        }
      );
    }
  }


})