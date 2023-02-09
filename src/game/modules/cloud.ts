wx.cloud.init({ env: wx.$store.CLOUD_ENV });

async function getWXContext() {
  const data = await wx.cloud.callFunction({ name: 'getWXContext' });
  return data.result;
}

wx.$cloud = {
  getWXContext
};