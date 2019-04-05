import * as convert from './csvToJson'
let matchData=convert.change_format('../../csv_data/matches.csv');
let deliveriesData=convert.change_format('../../csv_data/deliveries.csv');
const fs = require('fs');

const numberOfMatchesPlayedPerYear=(matchData)=>{
    let numberOfMatchesPerYear=[];
    numberOfMatchesPerYear=matchData.reduce((matches,index)=>{
    if(matches.hasOwnProperty(index['season'])){
        matches[index['season']]+=1
        return matches
    } else {
        matches[index['season']]=1
        return matches
    }
},{});
return numberOfMatchesPerYear
}

let answer1=numberOfMatchesPlayedPerYear(matchData);
let numberOfMatchesPlayedPerYearJSON = JSON.stringify(answer1, null, 2);
fs.writeFileSync('../../json_files/matchesPerYear.json',numberOfMatchesPlayedPerYearJSON);

const totalMatchesWonPerTeamPerYear=(matchData)=>{
    let matchesWonPerTeam=[]
    matchesWonPerTeam=matchData.reduce((matches,index)=>{
    if(matches.hasOwnProperty(index['season'])){
        if(matches[index['season']].hasOwnProperty(index['winner'])){
            matches[index['season']][index['winner']]+=1
        } else {
            if(index['winner']!=0){
                matches[index['season']][index['winner']]=1
        }
    }
    return matches
    } else {
        matches[index['season']] = {};
            if(index['winner']!=0){
                matches[index['season']][index['winner']] = 1;
            }
            return matches;
    }
},{})
return matchesWonPerTeam
}

let answer2=totalMatchesWonPerTeamPerYear(matchData)
let totalMatchesWonJSON = JSON.stringify(answer2, null, 2);
fs.writeFileSync('../../json_files/totalMatchesWon.json',totalMatchesWonJSON);

const extraRunsPerTeam=(matchData,deliveryData)=>{
    let matchId = matchData.reduce((matches,index) => {
        if(index['season']==2016){
            matches.push(index['id']);
        }
        return matches;
    },[]);
    return deliveryData.filter(deliveries => {
        if(matchId.includes(deliveries['match_id'])){
            return deliveries;
        }
    }).reduce((extraRuns,delivery) => {
        if(extraRuns.hasOwnProperty(delivery['bowling_team'])){
            extraRuns[delivery['bowling_team']] += delivery['extra_runs'];
        }else{
            extraRuns[delivery['bowling_team']] = delivery['extra_runs'];
        }
    return extraRuns;
    },{})
}
let extraRuns = extraRunsPerTeam(matchData,deliveriesData);
let extraRunsJSON = JSON.stringify(extraRuns, null, 2);
fs.writeFileSync('../../json_files/extraRuns.json',extraRunsJSON);

const economicBowlers=(matchData,deliveryData)=>{
    let matchId = matchData.reduce((matches,index) => {
        if(index['season']==2015){
            matches.push(index['id']);
        }
        return matches;
    },[]);
    let bowlerObj =  deliveryData.filter(delivery => {
        if(matchId.hasOwnProperty(delivery['match_id'])){
            return delivery;
        }
    }).reduce((returnedMatchId,deliveries) => {
        if(returnedMatchId.hasOwnProperty(deliveries['bowler'])){
            returnedMatchId[deliveries['bowler']]['runs'] += deliveries['total_runs'];
            if(deliveries['ball']==1){
                returnedMatchId[deliveries['bowler']]['overs'] +=1;
            }
            return returnedMatchId;
        }else{
            returnedMatchId[deliveries['bowler']] = {};
            returnedMatchId[deliveries['bowler']]['runs'] = deliveries['total_runs'];
            returnedMatchId[deliveries['bowler']]['overs'] = 1;
            return returnedMatchId;
        }
    },{});
    
    let bowlerArr = Object.keys(bowlerObj);
    let economicBowlersObj =  bowlerArr.reduce((names,runs) => {
        names[Math.round((bowlerObj[runs]['runs']/bowlerObj[runs]['overs'])*100)/100] = runs;
        return names;
    },{});
    let ecoBowlersArr = Object.keys(economicBowlersObj);
    return ecoBowlersArr.map(averageRuns => parseFloat(averageRuns)).sort((a,b) => a-b).slice(0,10).reduce((runs,index) => {
        runs[economicBowlersObj[index]] = index;
        return runs;
    },{});
}

let ecoBowlerData = economicBowlers(matchData,deliveriesData);
let ecoBowlersJSON = JSON.stringify(ecoBowlerData, null, 2);
fs.writeFileSync('../../json_files/ecoBowlers.json',ecoBowlersJSON);