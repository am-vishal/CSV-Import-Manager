module.exports.isObject = (value) => {
  typeof value === "object" && value !== null && !Array.isArray(value);
};

module.exports.isArray = (value) => Array.isArray(value);

module.exports.isUndefinedOrNull = (value) => {
  value === undefined || value === null;
};

module.exports.isNullOrEmpty = (value) => {
  this.isUndefinedOrNull(value) || value.toString() === "";
};

module.exports.isNullorWhiteSpace = (value) => {
  return this.isNullOrEmpty(value) || value.toString().trim().length === 0;
};
