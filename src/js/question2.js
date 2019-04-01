import * as convert from './csvToJson'
let question_2_data=convert.change_format('../../csv_data/matches.csv')
let finalAns=[]
finalAns=question_2_data.reduce(function(iterator,index){
    if(iterator.hasOwnProperty(index['season'])){
        if(iterator[index['season']].hasOwnProperty(index['winner'])){
            iterator[index['season']][index['winner']]+=1
        } else {
            if(index['winner']!=0){
                iterator[index['season']][index['winner']]=1
        }
    }
    return iterator
    } else {
        iterator[index['season']] = {};
            if(index['winner']!=0){
                iterator[index['season']][index['winner']] = 1;
            }
            return iterator;
    }
},{})
console.log(finalAns)