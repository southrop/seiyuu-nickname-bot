'use strict';

function toTitleCase(str) {
  if (!str) {
    return null;
  }
  if (str.constructor === Array) {
    // Turn array of values into single string
    str = str.join(', ');
  }
  return str.toLowerCase().replace(/\b\w/g, function (txt) {
    return txt.charAt(0).toUpperCase();
  });
}

function matchString(string, data) {
  let keys = Object.keys(data);

  let key = keys.find((key) => {
    return string.toLowerCase().indexOf(key) !== -1;
  });

  return toTitleCase(data[key]);
}

module.exports.toTitleCase = toTitleCase;
module.exports.matchString = matchString;
