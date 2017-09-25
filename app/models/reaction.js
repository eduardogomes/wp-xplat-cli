var common = require("common");

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

    common.__getAllData(common.createGetOptions(url, fields), reactions)
      .then (function(reactions) {
        return JSON.parse(reactions);
      });
  }, 
};
