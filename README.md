# qa-storage

> quick app plugin for work with storage


### 快应用自带 system.storage 的痛点：

- 只能存取 String 字符串类型的值
- 不可以设置过期时间
- Callback 回调的方式使用不方便

### 使用帮助

### 测试

## qa-storage API

#### `QaStorage.set(key, value, expireTimes)`

写存储，返回一个 `Promise`

- `key`: 存储内容的 key 
- `value`: 存储内容的值，类型可以是字符串、数组、对象
- `expireTimes`: 默认是0，表示永不过期
  - expireTimes 传入数字，表示多少秒后过期
  - expireTimes 传入字符串，可以带如下单位： `m`、`d`、`h`、`min`、`s`、`y`。如:
    - `"1y"`: 1年后过期
    - `"1m"`: 1月后过期
    - `"1d"`: 1天后过期
    - `"1h"`: 1小时后过期
    - `"1min"`: 1分钟后过期
    - `"1s"`: 1秒后过期
  - expireTimes 传入`Date`类型，表示在这个时间之后过期

#### `QaStorage.get(key)`

读存储，返回一个 `Promise(value)`

- `key`: 存储内容的 key 

#### `QaStorage.remove(key)`

移除指定存储，返回一个 `Promise`

- `key`: 存储内容的 key 

#### `QaStorage.clear()`

移除所有存储，返回一个 `Promise`


## 关于快应用
[快应用官网](https://www.quickapp.cn/)

