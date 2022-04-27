const filterObj = (obj, ...allowfields) => {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    if (allowfields.includes(key)) {
      newObj[key] = obj[key];
    }
  });

  return newObj;
};

module.exports = { filterObj };
