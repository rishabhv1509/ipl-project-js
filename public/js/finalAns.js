'use strict';

var _csvToJson = require('./csvToJson');

var convert = _interopRequireWildcard(_csvToJson);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var matchData = convert.change_format('../../csv_data/matches.csv');
var deliveriesData = convert.change_format('../../csv_data/deliveries.csv');
var fs = require('fs');

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

var answer1 = numberOfMatchesPlayedPerYear(matchData);
var numberOfMatchesPlayedPerYearJSON = JSON.stringify(answer1, null, 2);
fs.writeFileSync('../../json_files/matchesPerYear.json', numberOfMatchesPlayedPerYearJSON);

var totalMatchesWonPerTeamPerYear = function totalMatchesWonPerTeamPerYear(matchData) {
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

var answer2 = totalMatchesWonPerTeamPerYear(matchData);
var totalMatchesWonJSON = JSON.stringify(answer2, null, 2);
fs.writeFileSync('../../json_files/totalMatchesWon.json', totalMatchesWonJSON);

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
var extraRunsJSON = JSON.stringify(extraRuns, null, 2);
fs.writeFileSync('../../json_files/extraRuns.json', extraRunsJSON);

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
var ecoBowlersJSON = JSON.stringify(ecoBowlerData, null, 2);
fs.writeFileSync('../../json_files/ecoBowlers.json', ecoBowlersJSON);