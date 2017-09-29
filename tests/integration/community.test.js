var assert = require("assert"),
    community = require("../../app/models/community"), 
    group = require("../../app/models/group"),
    member = require("../../app/models/member"),
    request = require("request-promise");

describe("Community", function(){
    before(function(){

    });
    describe("getAllGroups", function(){
        it("should return default group fields", function(done){        
            community.getAllGroups(group.getDefaultGroupFields())
            .then(groups => {
                assert(groups.lenght != 0, "no groups found");
                done();
            }).catch(done);
        });
        it("should return available group fields", function(done){
            community.getAllGroups(group.getAvailableGroupFields())
            .then((groups) => {
                assert(groups.lenght != 0, "no groups found");
                done();
            }).catch(done);;
        });
    });
    describe("getAllMembers", function(){
        it("should return default group fields", function(done){                    
            community.getAllMembers(member.getDefaultMemberFields())
            .then((members) => {
                assert(members.lenght != 0, "no members found");
                done();
            }).catch(done);;
        });
        it("should return available group fields", function(done){                    
            community.getAllMembers(member.getAvailableMemberFields())
            .then((members) => {
                assert(members.lenght != 0, "no members found");
                done();
            }).catch(done);;
        });
    });
    describe("createNewGroup", function(){
        it("should create a new group", function(){                    
            assert.fail("TBD");
        });
    });
});