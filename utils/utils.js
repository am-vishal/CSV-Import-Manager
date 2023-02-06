// Function to check if the value is an object and not an array
module.exports.isObject = (value) => {
  typeof value === "object" && value !== null && !Array.isArray(value);
};

// Function to check if the value is an array
module.exports.isArray = (value) => Array.isArray(value);

// Function to check if the value is undefined or null
module.exports.isUndefinedOrNull = (value) => {
  value === undefined || value === null;
};

// Function to check if the value is null or empty
module.exports.isNullOrEmpty = (value) => {
  this.isUndefinedOrNull(value) || value.toString() === "";
};

// Function to check if the value is null or whitespace
module.exports.isNullorWhiteSpace = (value) => {
  return this.isNullOrEmpty(value) || value.toString().trim().length === 0;
};
