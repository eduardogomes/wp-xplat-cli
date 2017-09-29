var common = require("./common.js");

module.exports = {
  "getAvailableFileFields": function getAvailableFileFields(){
    return [
      "download_link", 
      "from", 
      "group", 
      "id", 
      "message", 
      "updated_time",
    ];
  },
  "getDefaultFileFields": function getDefaultFileFields(){
    return [
      "id",
      "updated_time",
    ];
  },
  "getEdgeFiles": function getEdgeFiles(url, fields) {
    if (fields.constructor !== Array) {
      fields = this.getDefaultFileFields();
    }    
    let events = [];

    return common.__getAllData(common.createGetOptions(url, fields), events);
  }, 
};
