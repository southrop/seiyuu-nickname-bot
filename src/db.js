'use strict';

const mongojs = require('mongojs')
const db = mongojs(process.env.MONGODB_URI, ['nicknames'])

var data = null;
var last_update = null;

function updateData() {
  return new Promise(function (resolve, reject) {
    db.nicknames.findOne({
      _id: mongojs.ObjectID('57eb5ecedcba0f4c79311a39')
    }, function (err, doc) {
      if (err) {
        console.log('Error: ' + err);
        reject(err);
      } else {
        data = doc;
        last_update = Date.now();
        resolve();
      }
    });
  });
}

function toTitleCase(str) {
  if (!str) {
    return null;
  }
  if (str.constructor === Array) {
    // Turn array of values into single string
    str = str.join(', ')
  }
  return str.toLowerCase().replace(/\b\w/g, function (txt) {
    return txt.charAt(0).toUpperCase();
  });
}

function findNickname(string) {
  let keys = Object.keys(data);

  let key = keys.find((key) => {
    return string.toLowerCase().indexOf(key) !== -1
  });

  return toTitleCase(data[key]);
}

function getNickname(string) {
  return new Promise(function (resolve, reject) {
    if (Date.now() - last_update > 3600000) {
      updateData()
        .then(() => resolve(findNickname(string)))
        .catch(err => reject(err));
    } else {
      resolve(findNickname(string));
    }
  });
}

module.exports = exports = {
  getNickname: getNickname
};
