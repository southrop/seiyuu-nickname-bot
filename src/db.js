'use strict';

const data = require('../data/nicknames.json');

function getNickname(string) {
  let keys = Object.keys(data);

  let key = keys.find((key) => {
    return string.toLowerCase().indexOf(key) !== -1
  });

  return data[key];
}

module.exports.getNickname = getNickname;
