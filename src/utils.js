'use strict';

function matchString(string, data) {
  let keys = Object.keys(data);

  // Convert everything to lowercase for case insensitivity
  let lowerCaseKeys = keys.map((str) => {
    return str.toLowerCase();
  });
  let index = lowerCaseKeys.findIndex((key) => {
    return string.toLowerCase().indexOf(key) !== -1;
  });

  let nickname = data[keys[index]];
  if (nickname && nickname.constructor === Array) {
    nickname = nickname.join(', ');
  }
  return nickname;
}

module.exports.matchString = matchString;
