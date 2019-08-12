import _ from "underscore";


const slugify = text => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};


const sanitizeObjectKeys = obj => {
  let newObj = {};
  _.mapObject(obj, function(val, key) {
    let newKey = slugify(key);
    newObj[newKey] = val;
  });
  return newObj;
};
export default sanitizeObjectKeys;