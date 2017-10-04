var common = require("./common.js");

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

  "getDefaultAlbumFields": function getDefaultAlbumFields(){
    return [
      "id", 
      "created_time", 
      "name", 
    ];
  },

  "getEdgeAlbums": function getEdgeAlbums(url, fields) {
    if (fields.constructor !== Array) {
      fields = this.getDefaultAlbumFields();
    }    
    let events = [];

    return common.__getAllData(common.createGetOptions(url, fields), events);
  }, 
};
