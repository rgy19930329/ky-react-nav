/**
 * 金额校验（只校验格式，不校验必填）
 */
const amountValidator = (rule, value, callback) => {
  if (!value) {
    callback();
    return;
  }
  value = String(value);
  if (!value.match(/^\d{1,16}(\.\d{1,6})?$/)) {
    callback("金额格式错误，支持小数点前16位，后6位");
  } else {
    if (value.match(/^0{2,}/)) {
      callback("金额格式错误，支持小数点前16位，后6位");
      return;
    }
    if (Number(value) === 0) {
      callback("金额不能为0");
      return;
    }
    callback();
  }
}

export {
  amountValidator,
}

export default {
  amountValidator,
}