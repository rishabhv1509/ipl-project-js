'use strict';

var _csvToJson = require('./csvToJson');

var convert = _interopRequireWildcard(_csvToJson);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var matchData = convert.change_format('../../csv_data/matches.csv');
var deliveriesData = convert.change_format('../../csv_data/deliveries.csv');
var economicBowlers = function economicBowlers(matchData, deliveryData) {
    var matchId = matchData.reduce(function (matches, index) {
        if (index['season'] == 2015) {
            matches.push(index['id']);
        }
        return matches;
    }, []);
    var bowlerObj = deliveryData.filter(function (delivery) {
        if (matchId.hasOwnProperty(delivery['match_id'])) {
            return delivery;
        }
    }).reduce(function (returnedMatchId, deliveries) {
        if (returnedMatchId.hasOwnProperty(deliveries['bowler'])) {
            returnedMatchId[deliveries['bowler']]['runs'] += deliveries['total_runs'];
            if (deliveries['ball'] == 1) {
                returnedMatchId[deliveries['bowler']]['overs'] += 1;
            }
            return returnedMatchId;
        } else {
            returnedMatchId[deliveries['bowler']] = {};
            returnedMatchId[deliveries['bowler']]['runs'] = deliveries['total_runs'];
            returnedMatchId[deliveries['bowler']]['overs'] = 1;
            return returnedMatchId;
        }
    }, {});

    var bowlerArr = Object.keys(bowlerObj);
    var economicBowlersObj = bowlerArr.reduce(function (names, runs) {
        names[Math.round(bowlerObj[runs]['runs'] / bowlerObj[runs]['overs'] * 100) / 100] = runs;
        return names;
    }, {});
    var ecoBowlersArr = Object.keys(economicBowlersObj);
    return ecoBowlersArr.map(function (averageRuns) {
        return parseFloat(averageRuns);
    }).sort(function (a, b) {
        return a - b;
    }).slice(0, 10).reduce(function (runs, index) {
        runs[economicBowlersObj[index]] = index;
        return runs;
    }, {});
};

var ecoBowlerData = economicBowlers(matchData, deliveriesData);
console.log(ecoBowlerData);