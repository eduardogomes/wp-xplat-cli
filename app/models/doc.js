var common = require("./common.js");

module.exports = {
  "getAvailableDocFields": function getAvailableDocFields(){
    return [
      "can_delete",
      "can_edit",
      "created_time",
      "from",
      "icon", 
      "message",
      "revision",
      "subject",
      "updated_time",
      "id",
    ];
  },

  "getEdgeDocs": function getEdgeDocs(url, fields) {
    if (fields.constructor !== Array) {
      fields = this.getAvailableDocFields();
    }    
    let events = [];

    return common.__getAllData(common.createGetOptions(url, fields), events);
  }, 
};
