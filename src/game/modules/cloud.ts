

async function getWXContext() {
  const data = await wx.cloud.callFunction({ name: 'getWXContext' });
  return data.result;
}

wx.$cloud = {
  getWXContext
};