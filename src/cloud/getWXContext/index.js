// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({ env: 'cloud1-9gr5cd4babd2ab94' });

exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
  
    return {
      event,
      openid: wxContext.OPENID,
      // appid: wxContext.APPID,
      // unionid: wxContext.UNIONID,
    }
  }