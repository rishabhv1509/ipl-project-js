'use strict';

var _csvToJson = require('./csvToJson.js');

var convert = _interopRequireWildcard(_csvToJson);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var matchData = convert.change_format('../../csv_data/matches.csv');

var numberOfMatchesPlayedPerYear = function numberOfMatchesPlayedPerYear(matchData) {
    var numberOfMatchesPerYear = [];
    numberOfMatchesPerYear = matchData.reduce(function (matches, index) {
        if (matches.hasOwnProperty(index['season'])) {
            matches[index['season']] += 1;
            return matches;
        } else {
            matches[index['season']] = 1;
            return matches;
        }
    }, {});
    return numberOfMatchesPerYear;
};

console.log(numberOfMatchesPlayedPerYear(matchData));