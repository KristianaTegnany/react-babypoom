

export function extractParams(hash, { name, only, except }={}) {
  if (null != only) {
    only = [].concat(only);
  }
  if (null != except) {
    except = [].concat(except);
  }
  let formData = {};
  Object.keys(hash).forEach(key => {
    if ((!only || only.indexOf(key) >= 0) && (!except || except.indexOf(key) < 0)) {
      formData[name ? `${name}[${key}]` : key] = hash[key];
    }
  });
  return formData;
}