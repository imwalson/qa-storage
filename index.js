var util = require('./util')

var QaStorage = {
  get: function(key) {
    return new Promise(function(resolve,reject){
      if(!key){
        reject('storage key is empty');
      }
      util.getStorageSync(key)
      .then(function(value){
        if(value && value.startsWith("{") && value.endsWith("}")) {
          try {
            value = JSON.parse(value);
            //console.log(value);
            let expireTimes = value.expireTimes;
            let json = value.value;
            // 检查过期时间
            if(expireTimes){
              let now = parseInt((new Date()).getTime()/1000);
              //console.log(now);
              //console.log(expireTimes);
              // 已经过期
              if( now > expireTimes ){
                // 移除 storage
                util.delStorageSync(key)
                .then( ()=> {
                  reject('expired');
                })
                .catch( (e)=> {
                  reject('remove storage error');
                })
              }else{// 未过期
                try {
                  json = JSON.parse(json);
                } catch (error) {
                }
                resolve(json);
              }
            }else{
              try {
                json = JSON.parse(json);
              } catch (error) {
              }
              resolve(json);
            }

          }catch (e) {
            reject('parse json error');
          }
        }else{
          reject('invalid value,not an json string');
        }
      })
      .catch(function(err){
        reject(err.message)
      })
    })
  },
  set: function(key, value, expireTimes) {
    return new Promise(function(resolve,reject){
      if (!key) {
        reject("storage key is not find in first argument")
      }
      if (!value) {
        reject("storage value can not be null")
      }
      // support json object
      if(value && value.constructor === Object ) {
        value = JSON.stringify(value);
      }
      var _expires = 0; // temp value, default expire time 
      var defaultExpires = 0;
      expireTimes = expireTimes || defaultExpires;
      if (expireTimes) {
        let now = parseInt((new Date()).getTime()/1000);
        switch (expireTimes.constructor) {
          case Number:
            if (expireTimes === Infinity || expireTimes === -1) _expires = 0;
            else _expires = expireTimes + now;
            break;
          case String:
            if (/^(?:\d{1,}(y|m|d|h|min|s))$/i.test(expireTimes)) {
              // get capture number group
              var _expireTime = expireTimes.replace(/^(\d{1,})(?:y|m|d|h|min|s)$/i, "$1");
              // get capture type group , to lower case
              switch (expireTimes.replace(/^(?:\d{1,})(y|m|d|h|min|s)$/i, "$1").toLowerCase()) {
                // Frequency sorting
                case 'm': _expires = _expireTime * 2592000 + now; break; // 60 * 60 * 24 * 30
                case 'd': _expires = _expireTime * 86400 + now; break; // 60 * 60 * 24
                case 'h': _expires = _expireTime * 3600 + now; break; // 60 * 60
                case 'min': _expires = _expireTime * 60 + now; break; // 60
                case 's': _expires = _expireTime + now; break;
                case 'y': _expires = _expireTime * 31104000 + now; break; // 60 * 60 * 24 * 30 * 12
                default: reject("unknown exception of 'set operation'");
              }
            }
            break;
          case Date:
            _expires = parseInt(expireTimes.getTime()/1000);
            break;
          default: reject("Unsupported expireTimes");
        }
      }
      let obj = {
        value: value,
        expireTimes: _expires
      }
      util.setStorageSync(key,JSON.stringify(obj))
      .then( ()=> {
        resolve('success');
      })
      .catch( (e)=> {
        reject(e)
      })
    })

  },
  remove: function(key) {
    return new Promise(function(resolve,reject){
      if(!key){
        reject('storage key is empty');
      }
      util.delStorageSync(key)
      .then( ()=> {
        resolve('success');
      })
      .catch( (e)=> {
        reject('remove storage error');
      })
    })
  },
  clear: function() {
    return util.clearStorageSync();
  }

};

module.exports = QaStorage;