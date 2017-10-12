var assert = require("assert"),
    member = require("../../app/models/member"),
    post = require("../../app/models/post"),
    event = require("../../app/models/event"),
    request = require("request-promise");

var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');
      
var dotenv = require('dotenv').config({path: rootPath + '/.env'});

let id = process.env.TEST_MEMBER_ID2;
describe("Member", function(){
    before(function(){

    });
    describe("getAllManagers", function(){
        it("should return manager", function(done){                    
            member.getAllManagers(id, member.getDefaultMemberFields())
            .then((admins) => {
                assert(admins.length == 0, "user should have no managers");
                done();
            }).catch(done);
        });
    });
    describe("getAllReports", function(){
        it("should return members", function(done){                    
            member.getAllReports(id, member.getDefaultMemberFields())
            .then((members) => {
                assert(members.length == 0, "user should have no reports");
                done();
            }).catch(done);
        });
    });
    describe("getAllFeed", function(){
        it("should return feed", function(done){                    
            member.getAllFeed(id, post.getDefaultPostFields())
            .then((feed) => {
                assert(feed.length != 0, "no feed found");
                done();
            }).catch(done);
        }).timeout(20000); //likely slower
    });
    describe("getAllEvents", function(){
        it("should return events", function(done){                    
            member.getAllEvents(id, event.getAvailableEventFields())
            .then((events) => {
                assert(events.length != 0, "no event found");
                done();
            }).catch(done);
        });
    });
});