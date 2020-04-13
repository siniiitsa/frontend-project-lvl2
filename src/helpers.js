const isObject = (value) => {
  if (Array.isArray(value) || value === null) {
    return false;
  }
  return typeof value === 'object';
};

export {
  isObject as default,
};