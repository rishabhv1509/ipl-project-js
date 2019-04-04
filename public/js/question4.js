'use strict';

var _csvToJson = require('./csvToJson');

var convert = _interopRequireWildcard(_csvToJson);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var matchData = convert.change_format('../../csv_data/matches.csv');
var deliveriesData = convert.change_format('../../csv_data/deliveries.csv');
function economicBowlers(matchData, deliveryData) {
    var matchId = matchData.reduce(function (accumulator, matches) {
        if (matches['season'] == 2015) {
            accumulator.push(matches['id']);
        }
        return accumulator;
    }, []);
    var bowlerObj = deliveryData.filter(function (delivery) {
        if (matchId.includes(delivery['match_id'])) {
            return delivery;
        }
    }).reduce(function (accumulator, deliveries) {
        if (accumulator.hasOwnProperty(deliveries['bowler'])) {
            accumulator[deliveries['bowler']]['runs'] += deliveries['total_runs'];
            if (deliveries['ball'] == 1) {
                accumulator[deliveries['bowler']]['overs'] += 1;
            }
            return accumulator;
        } else {
            accumulator[deliveries['bowler']] = {};
            accumulator[deliveries['bowler']]['runs'] = deliveries['total_runs'];
            accumulator[deliveries['bowler']]['overs'] = 1;
            return accumulator;
        }
    }, {});
    var bowlerArr = Object.keys(bowlerObj);
    var ecoBowlersObj = bowlerArr.reduce(function (ac, ec) {
        ac[Math.round(bowlerObj[ec]['runs'] / bowlerObj[ec]['overs'] * 100) / 100] = ec;
        return ac;
    }, {});
    var ecoBowlersArr = Object.keys(ecoBowlersObj);
    return ecoBowlersArr.map(function (item) {
        return parseFloat(item);
    }).sort(function (a, b) {
        return a - b;
    }).slice(0, 20).reduce(function (acc, item) {
        acc[ecoBowlersObj[item]] = item;
        return acc;
    }, {});
}

var ecoBowlerData = economicBowlers(matchData, deliveriesData);
console.log(ecoBowlerData);