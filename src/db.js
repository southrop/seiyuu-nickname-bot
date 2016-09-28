'use strict';

const util = require('./utils');
const mongojs = require('mongojs');
const db = mongojs(process.env.MONGODB_URI, ['nicknames']);

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

function getNickname(string) {
  return new Promise(function (resolve, reject) {
    if (Date.now() - last_update > 3600000) {
      updateData()
        .then(() => resolve(util.matchString(string, data)))
        .catch(err => reject(err));
    } else {
      resolve(util.matchString(string, data));
    }
  });
}

module.exports.getNickname = getNickname;
