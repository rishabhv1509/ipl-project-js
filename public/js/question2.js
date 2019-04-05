'use strict';

var _csvToJson = require('./csvToJson');

var convert = _interopRequireWildcard(_csvToJson);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var matchData = convert.change_format('../../csv_data/matches.csv');
var totalMatchesWonPerTeam = function totalMatchesWonPerTeam(matchData) {
    var matchesWonPerTeam = [];
    matchesWonPerTeam = matchData.reduce(function (matches, index) {
        if (matches.hasOwnProperty(index['season'])) {
            if (matches[index['season']].hasOwnProperty(index['winner'])) {
                matches[index['season']][index['winner']] += 1;
            } else {
                if (index['winner'] != 0) {
                    matches[index['season']][index['winner']] = 1;
                }
            }
            return matches;
        } else {
            matches[index['season']] = {};
            if (index['winner'] != 0) {
                matches[index['season']][index['winner']] = 1;
            }
            return matches;
        }
    }, {});
    return matchesWonPerTeam;
};

console.log(totalMatchesWonPerTeam(matchData));