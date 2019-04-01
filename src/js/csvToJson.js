const change_format=(filename)=>{
  let csvToJson = require('convert-csv-to-json');
  let json = csvToJson.fieldDelimiter(',').formatValueByType().getJsonFromCsv(filename);
  return json
}
export {change_format}