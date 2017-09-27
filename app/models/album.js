var common = require("common");

module.exports = {
  "getAvailableAlbumFields": function getAvailableAlbumFields(){
    return [
      "id", 
      "can_upload", 
      "count", 
      "cover_photo", 
      "created_time", 
      "description", 
      "event", 
      "from", 
      "link", 
      "location", 
      "name", 
      "place", 
      "privacy", 
      "type", 
      "updated_time",
    ];
  },

  "getDefatulAlbumFields": function getDefatulAlbumFields(){
    return [
      "id", 
      "created_time", 
      "name", 
    ];
  },

  "getEdgeAlbums": function getEdgeAlbums(url, fields) {
    if (fields.constructor !== Array) {
      fields = this.getDefatulAlbumFields();
    }    
    let events = [];

    common.__getAllData(common.createGetOptions(url, fields), events)
      .then (function(events) {
        return JSON.parse(events);
      });
  }, 
};
