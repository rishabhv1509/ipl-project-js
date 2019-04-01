'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var change_format = function change_format(filename) {
  var csvToJson = require('convert-csv-to-json');
  var json = csvToJson.fieldDelimiter(',').formatValueByType().getJsonFromCsv(filename);
  return json;
};
exports.change_format = change_format;