/**
 * @desc wilddog io 操作封装
 */

/**
 * 数据过滤，过滤掉所有值为undefined的字段（因为有这些字段的存在无法执行add和set操作）
 */
const filter = (data) => {
  const deepCopy = (p, c) => {
    var c = c || {};
    for (var i in p) {
      if (typeof p[i] === "object") {
        c[i] = (p[i].constructor === Array) ? [] : {};
        deepCopy(p[i], c[i]);
      } else {
        if (p[i] === undefined) {
          c[i] = null;
        } else {
          c[i] = p[i];
        }
      }
    }
    return c;
  }
  if (!data) {
    return null;
  }
  return deepCopy(data);
};

/**
 * 遍历数据
 */
const each = (ref, fn) => {
  ref.on('child_added', (snap) => {
    let item = snap.val();
    let id = snap.key();
    fn && fn(item, id);
  });
};

/**
 * 移除数据
 */
const remove = (ref, id) => {
  ref.child(id).remove();
};

/**
 * 新增数据
 */
const add = (ref, item) => {
  ref.push(filter(item));
};

/**
 * 设置数据
 */
const set = (ref, item) => {
  console.log(filter(item))
  ref.set(filter(item));
};

/**
 * 获取数据
 */
const get = (ref, fn) => {
  ref.on("value", (snap) => {
    fn && fn(snap.val());
  });
};

export {
  each,
  remove,
  add,
  set,
  get,
}