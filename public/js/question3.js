'use strict';

var _csvToJson = require('./csvToJson');

var convert = _interopRequireWildcard(_csvToJson);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var matchData = convert.change_format('../../csv_data/matches.csv');
var deliveriesData = convert.change_format('../../csv_data/deliveries.csv');
var extraRunsPerTeam = function extraRunsPerTeam(matchData, deliveryData) {
    var matchId = matchData.reduce(function (matches, index) {
        if (index['season'] == 2016) {
            matches.push(index['id']);
        }
        return matches;
    }, []);
    return deliveryData.filter(function (deliveries) {
        if (matchId.includes(deliveries['match_id'])) {
            return deliveries;
        }
    }).reduce(function (extraRuns, delivery) {
        if (extraRuns.hasOwnProperty(delivery['bowling_team'])) {
            extraRuns[delivery['bowling_team']] += delivery['extra_runs'];
        } else {
            extraRuns[delivery['bowling_team']] = delivery['extra_runs'];
        }
        return extraRuns;
    }, {});
};

var extraRuns = extraRunsPerTeam(matchData, deliveriesData);
// console.log(matchId/)
console.log(extraRuns);