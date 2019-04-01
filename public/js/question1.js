'use strict';

var _csvToJson = require('./csvToJson.js');

var convert = _interopRequireWildcard(_csvToJson);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var question1Data = convert.change_format('../../csv_data/matches.csv');

var newArr = [];
newArr = question1Data.reduce(function (iterator, index) {
    if (iterator.hasOwnProperty(index['season'])) {
        iterator[index['season']] += 1;
        return iterator;
    } else {
        iterator[index['season']] = 1;
        return iterator;
    }
}, {});
console.log(newArr);