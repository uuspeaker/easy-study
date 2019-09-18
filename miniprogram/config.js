/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'http://129.211.21.250:80/api';
// var host = 'http://10.100.168.82:3000';
// var host = 'https://734232337.uuspeaker.com';

var config = {
  // 下面的地址配合云端 Demo 工作
  service: {
    host,
  },

  options: {
    duration: 600000,
    sampleRate: 16000,
    numberOfChannels: 1,
    encodeBitRate: 51200,
    format: 'mp3',
    frameSize: 50
  },

};

module.exports = config;
