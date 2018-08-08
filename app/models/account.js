
var rp = require("request-promise"),
    config = require("../../config/config.js");

var scimApi = rp.defaults({
  baseUrl: "https://www.facebook.com/scim/v1/Users",
  headers: {
    "Authorization": config.page_access_token,
    "Content-Type": "application/json",
    "User-Agent": "wp-xplat-cli",
  },
});

module.exports = {


  "getUserByEmail": function getUserByEmail(email) {
    let options = {
      url: "/",
      qs: {
        "filter": "userName eq \"" + email + "\"",
      },
    };
    return scimApi(options);
  },
  "updateUserEmail": function updateUserEmail(originalEmail, updatedEmail) {
    return this.getUserByEmail(originalEmail).then(user => {
      let newUser = JSON.parse(user).Resources[0];
      if (!newUser){
        throw new Error("Could not find " + originalEmail);
      }
      let options = {
        url: "/" + newUser.id,
        method: "PUT",
      };
      newUser.userName = updatedEmail;
      options.body = JSON.stringify(newUser);
      return scimApi(options);  
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
      let options = {
        url: "/" + newUser.id,
        method: "PUT",
      };
      newUser["urn:scim:schemas:extension:facebook:starttermdates:1.0"].startDate = unixWorkAnniversary;
      options.body = JSON.stringify(newUser);
      return scimApi(options);  
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
      let options = {
        url: "/" + newUser.id,
        method: "PUT",
      };
      newUser.locale = locale;
      options.body = JSON.stringify(newUser);
      return scimApi(options);  
    }).catch(error => {
      throw error;
    });
  },
  "updateUserAuthMethod": function updateUserAuthMethod(email, method) {
    return this.getUserByEmail(email).then(user => {
      let newUser = JSON.parse(user).Resources[0];
      if (!newUser){
        throw new Error("Could not find " + email);
      }
      let options = {
        url: "/" + newUser.id,
        method: "PUT",
      };
      newUser.auth_method = method;
      options.body = JSON.stringify(newUser);
      return scimApi(options);  
    }).catch(error => {
      throw error;
    });
  },
};
