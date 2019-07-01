/**
 * @desc localStorage 操作封装
 */

let storage =  window.localStorage;

/**
 * 设置值
 * @param {*} key 
 * @param {*} value
 */
const set = (key, value) => {
  value = typeof value === "object" ? JSON.stringify(value) : value;
  storage.setItem(key, value);
}

/**
 * 获取值
 * @param {*} key 
 */
const get = (key) => {
  let value = storage.getItem(key);
  try {
    value = JSON.parse(value);
  } catch(e) {
    return value;
  }
  return value;
}

/**
 * 删除
 * @param {*} key 
 */
const remove = (key) => {
  storage.removeItem(key);
}

export {
  set,
  get,
  remove,
}