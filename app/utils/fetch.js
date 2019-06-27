import axios from 'axios';

let defaultOpts = {
  method: 'get',
  responseType: 'json',
  timeout: 6000,
}

export default (opts) => {
  let combinedOpts = Object.assign({}, defaultOpts, opts);
  const { method, data } = combinedOpts;
  if(method === 'get') {
    combinedOpts['params'] = data;
  }
  return axios(combinedOpts).then(res => res.data);
}
