
var assert = require("assert"),
    account = require("../../app/models/account"), 
    group = require("../../app/models/group"),
    member = require("../../app/models/member"),
    request = require("request-promise");

describe("Account", function(){
    let currentEmail = "edu.mndc.gms+test4@gmail.com";
    let newEmail = "edu.mndc.gms+test3@gmail.com";     

    before(function(){

    });
    describe("updateUserEmail", function(){
        it("should update user e-mail", function(done){
            account.updateUserEmail(currentEmail, newEmail)
            .then(user => {
                assert(user.length != 0, "no groups found");
                done();
            }).catch(done);
        });
    });
    after(function(done){
        account.updateUserEmail(newEmail, currentEmail)
        .then(user => {
            assert(user.length != 0, "no groups found");
            done();
        }).catch(done);
    });
});