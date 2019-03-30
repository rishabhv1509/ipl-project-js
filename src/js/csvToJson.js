
  const a=(filename)=>{
    let csvToJson = require('convert-csv-to-json');
let json = csvToJson.fieldDelimiter(',').formatValueByType().getJsonFromCsv(filename);

// function filt(json){
//     for(let i in json){
//     if(json['batting_team']==='Mumbai Indians'){
//         return json[i]
//     }
// }
// }

// for(let i in json){
//     // if(json['batting_team']==='Kochi Tuskers Kerala'){
//         console.log(json[i])
//     // }
//     // console.log(json[i]);
// }
console.log(json.filter((e)=>{
   return e['batting_team']==='Mumbai Indians'
}))}
    // console.log(json)
    // return json;};
    // a(deliveries.csv);

    export {a}
    

