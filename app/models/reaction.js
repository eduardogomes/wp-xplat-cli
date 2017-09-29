var common = require("./common.js");

module.exports = {
  "getAvailableReactionFields": function getAvailableReactionFields(){
    return [
      "id",
      "name",
      "type",
    ];
  },

  "getEdgeReactions": function getEdgeReactions(url, fields) {
    if (fields.constructor !== Array) {
      fields = this.getAvailableReactionFields();
    }    
    let reactions = [];

    return common.__getAllData(common.createGetOptions(url, fields), reactions);
  }, 
};
