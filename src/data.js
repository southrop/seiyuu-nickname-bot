'use strict';

const GoogleSheet = require('google-spreadsheet');

var doc = new GoogleSheet('1Pr4rXjyBXUi24B7o02r61AkI9QuTQxTnTtJDvPkKeDI');
var sheet;

var data = {};

doc.getInfo(function (err, info) {
  sheet = info.worksheets[0];
  sheet.getRows(function (err, rows) {
    rows.forEach(function (row) {
      addToData(row.name, row.nickname);
    });
    console.log(data);
  });
});

function addToData(key, value) {
  createEntry(key, value);
  createEntry(value, key);
}

function createEntry(key, value) {
  // If key already exists
  if (data.hasOwnProperty(key) && data[key].indexOf(value) === -1) {
    data[key].push(value);
  } else {
    data[key] = [value];
  }
}
