'use strict';

var _csvToJson = require('./csvToJson');

var convert = _interopRequireWildcard(_csvToJson);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var matchData = convert.change_format('../../csv_data/matches.csv');
var deliveriesData = convert.change_format('../../csv_data/deliveries.csv');
function extras(matchData, deliveryData) {
    var matchId = matchData.reduce(function (accumulator, matches) {
        if (matches['season'] == 2016) {
            accumulator.push(matches['id']);
        }
        return accumulator;
    }, []);
    return deliveryData.filter(function (deliveries) {
        if (matchId.includes(deliveries['match_id'])) {
            return deliveries;
        }
    }).reduce(function (accumulator, delivary) {
        if (accumulator.hasOwnProperty(delivary['bowling_team'])) {
            accumulator[delivary['bowling_team']] += delivary['extra_runs'];
        } else {
            accumulator[delivary['bowling_team']] = delivary['extra_runs'];
        }
        return accumulator;
    }, {});
}

var extraRuns = extras(matchData, deliveriesData);
// console.log(matchId/)
console.log(extraRuns);