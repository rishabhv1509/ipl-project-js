import * as convert from './csvToJson.js'
let question1Data=convert.change_format('../../csv_data/matches.csv')

let newArr=[];
newArr=question1Data.reduce(function (iterator,index){
    if(iterator.hasOwnProperty(index['season'])){
        iterator[index['season']]+=1
        return iterator
    } else {
        iterator[index['season']]=1
        return iterator
    }
},{});
console.log(newArr);