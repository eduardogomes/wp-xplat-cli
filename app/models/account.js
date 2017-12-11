
var common = require("./common.js"),
    rp = require("request-promise"),
    config = require("../../config/config.js");


const scimAPIUrl = "https://www.facebook.com/scim/v1/Users";
module.exports = {
  
  "getUserByEmail": function getUserByEmail(email) {
    let options = {
      url: scimAPIUrl,
      qs: {
        "filter": "userName eq \"" + email + "\"",
      },
      headers: {
        "Authorization": config.page_access_token,
      },
      method: "GET",
    };
    return rp(options);
  },
  "updateUserEmail": function updateUserEmail(originalEmail, updatedEmail) {
    return this.getUserByEmail(originalEmail).then(user => {
      let newUser = JSON.parse(user).Resources[0];
      if (!newUser){
        throw new Error("Could not find " + originalEmail);
      }
      let options = common.createPutOptions(scimAPIUrl + "/" + newUser.id)
      newUser.userName = updatedEmail;
      options.body = JSON.stringify(newUser);
      return rp(options);  
    }).catch(error => {
      throw error;
    });
  },
  "updateWorkAnniversary": function updateWorkAnniversary(email, workAnniversary) {
    let unixWorkAnniversary = Date.parse(workAnniversary) / 1000;
    return this.getUserByEmail(email).then(user => {
      let newUser = JSON.parse(user).Resources[0];
      if (!newUser){
        throw new Error("Could not find " + email);
      }
      let options = common.createPutOptions(scimAPIUrl + "/" +  newUser.id)
      newUser["urn:scim:schemas:extension:facebook:starttermdates:1.0"].startDate = unixWorkAnniversary;
      options.body = JSON.stringify(newUser);
      return rp(options);  
    }).catch(error => {
      throw error;
    });
  },
  "updateUserLocale": function updateUserLocale(email, locale) {
    return this.getUserByEmail(email).then(user => {
      let newUser = JSON.parse(user).Resources[0];
      if (!newUser){
        throw new Error("Could not find " + email);
      }
      let options = common.createPutOptions(scimAPIUrl + "/" + newUser.id)
      newUser.locale = locale;
      options.body = JSON.stringify(newUser);
      return rp(options);  
    }).catch(error => {
      throw error;
    });
  },

};
