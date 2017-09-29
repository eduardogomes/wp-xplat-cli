var assert = require("assert"),
    member = require("../../app/models/member"),
    post = require("../../app/models/post"),
    event = require("../../app/models/event"),
    request = require("request-promise");

let id = "100020029960461";
describe("Member", function(){
    before(function(){

    });
    describe("getAllManagers", function(){
        it("should return manager", function(done){                    
            member.getAllManagers(id, member.getDefaultMemberFields())
            .then((admins) => {
                assert(admins.lenght != 0, "no managers found");
                done();
            }).catch(done);
        });
    });
    describe("getAllReports", function(){
        it("should return members", function(done){                    
            member.getAllReports(id, member.getDefaultMemberFields())
            .then((members) => {
                assert(members.lenght != 0, "no members found");
                done();
            }).catch(done);
        });
    });
    describe("getAllFeed", function(){
        it("should return feed", function(done){                    
            member.getAllFeed(id, post.getDefaultPostFields())
            .then((feed) => {
                assert(feed.lenght != 0, "no feed found");
                done();
            }).catch(done);
        }).timeout(5000); //likely slower
    });
    describe("getAllEvents", function(){
        it("should return events", function(done){                    
            member.getAllEvents(id, event.getAvailableEventFields())
            .then((events) => {
                assert(events.lenght != 0, "no event found");
                done();
            }).catch(done);
        });
    });
});