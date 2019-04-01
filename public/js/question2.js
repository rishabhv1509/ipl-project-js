'use strict';

var _csvToJson = require('./csvToJson');

var convert = _interopRequireWildcard(_csvToJson);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var question_2_data = convert.change_format('../../csv_data/matches.csv');
var finalAns = [];
finalAns = question_2_data.reduce(function (iterator, index) {
    if (iterator.hasOwnProperty(index['season'])) {
        if (iterator[index['season']].hasOwnProperty(index['winner'])) {
            iterator[index['season']][index['winner']] += 1;
        } else {
            if (index['winner'] != 0) {
                iterator[index['season']][index['winner']] = 1;
            }
        }
        return iterator;
    } else {
        iterator[index['season']] = {};
        if (index['winner'] != 0) {
            iterator[index['season']][index['winner']] = 1;
        }
        return iterator;
    }
}, {});
console.log(finalAns);