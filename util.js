var storage = require('@system.storage')

// Storage存储数据，Promise 封装
function setStorageSync(k,v) {
  return new Promise(function(resolve,reject){
    storage.set({
      key: k,
      value: v,
      success: function (data) {
        resolve('success');
      },
      fail: function (data, code) {
        reject(`fail, code = ${code}`);
      }
    })
  })
}

// Storage获取数据，Promise 封装
function getStorageSync(k) {
  return new Promise(function(resolve,reject){
    storage.get({
      key: k,
      success: function (data) {
        resolve(data);
      },
      fail: function (data, code) {
        reject(`fail, code = ${code}`);
      }
    })
  })
}

// Storage 删除数据，Promise 封装
function delStorageSync(k) {
  return new Promise(function(resolve,reject){
    storage.delete({
      key: k,
      success: function (data) {
        resolve(data);
      },
      fail: function (data, code) {
        reject(`fail, code = ${code}`);
      }
    })
  })
}

// Storage 删除数据，Promise 封装
function clearStorageSync(k) {
  return new Promise(function(resolve,reject){
    storage.clear({
      success: function () {
        resolve('success');
      },
      fail: function (data, code) {
        reject(`fail, code = ${code}`);
      }
    })
  })
}

module.exports = {
  setStorageSync,
  getStorageSync,
  delStorageSync,
  clearStorageSync
}
