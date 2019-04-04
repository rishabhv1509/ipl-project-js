import * as convert from './csvToJson'
var matchData=convert.change_format('../../csv_data/matches.csv');
var deliveriesData=convert.change_format('../../csv_data/deliveries.csv');
function extras(matchData,deliveryData){
    let matchId = matchData.reduce((accumulator,matches) => {
        if(matches['season']==2016){
            accumulator.push(matches['id']);
        }
        return accumulator;
    },[]);
    return deliveryData.filter(deliveries => {
        if(matchId.includes(deliveries['match_id'])){
            return deliveries;
        }
    }).reduce((accumulator,delivary) => {
        if(accumulator.hasOwnProperty(delivary['bowling_team'])){
            accumulator[delivary['bowling_team']] += delivary['extra_runs'];
        }else{
            accumulator[delivary['bowling_team']] = delivary['extra_runs'];
        }
    return accumulator;
    },{})
}

let extraRuns = extras(matchData,deliveriesData);
// console.log(matchId/)
console.log(extraRuns)