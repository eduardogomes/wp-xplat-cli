var assert = require("assert"),
    group = require("../../app/models/group"),
    member = require("../../app/models/member"),
    album = require("../../app/models/album"),
    doc = require("../../app/models/doc"),
    file = require("../../app/models/file"),
    post = require("../../app/models/post"),
    event = require("../../app/models/event"),
    request = require("request-promise");

var path = require('path'),
rootPath = path.normalize(__dirname + '/..');

var dotenv = require('dotenv').config({path: rootPath + '/.env'});

let id = process.env.TEST_GROUP_ID1;
let memberId2 = process.env.TEST_MEMBER_ID2;
let memberId = process.env.TEST_MEMBER_ID1;
let email = process.env.TEST_MEMBER_EMAIL;

describe("Group", function(){
    before(function(){

    });
    describe("getGroup", function(){
        it("should return default group fields", function(done){
            group.getGroup(id, group.getDefaultGroupFields())
            .then(group => {
                assert(group.id != id, "no groups found");
                done();
            }).catch(done);
        });
        it("should return available group fields", function(done){
            group.getGroup(id, group.getAvailableGroupFields())
            .then(group => {
                assert(group.id != id, "no groups found");
                done();
            }).catch(done);
        });
    });
    describe("getAllAdmins", function(){
        it("should return admins", function(done){                    
            group.getAllAdmins(id, member.getDefaultMemberFields())
            .then((admins) => {
                assert(admins.length != 0, "no admins found");
                done();
            }).catch(done);
        });
    });
    describe("getAllMembers", function(){
        it("should return members", function(done){                    
            group.getAllMembers(id, member.getDefaultMemberFields())
            .then((members) => {
                assert(members.length != 0, "no members found");
                done();
            }).catch(done);
        });
    });
    describe("getAllAlbums", function(){
        it("should return albums", function(done){                    
            group.getAllAlbums(id, album.getDefaultAlbumFields())
            .then((albums) => {
                assert(albums.length != 0, "no albums found");
                done();
            }).catch(done);;
        });
    });
    describe("getAllFeed", function(){
        it("should return feed", function(done){                    
            group.getAllFeed(id, post.getDefaultPostFields())
            .then((feed) => {
                assert(feed.length != 0, "no feed found");
                done();
            }).catch(done);
        }).timeout(20000); //likely slower
    });
    describe("getAllEvents", function(){
        it("should return events", function(done){                    
            group.getAllEvents(id, event.getAvailableEventFields())
            .then((events) => {
                assert(events.length != 0, "no event found");
                done();
            }).catch(done);
        });
    });
    describe("getAllMemberRequests", function(){
        it("should return member requests", function(done){                    
            group.getAllMemberRequests(id, member.getDefaultMemberFields())
            .then((members) => {
                assert(members.length == 0, "open groups do not have member requests");
                done();
            }).catch(done);
        });
    });
    describe("getAllDocs", function(){
        it("should return docs", function(done){                    
            group.getAllDocs(id, doc.getAvailableDocFields())
            .then((members) => {
                assert(members.length != 0, "no docs found");
                done();
            }).catch(done);
        });
    });
    describe("getAllFiles", function(){
        it("should return docs", function(done){                    
            group.getAllFiles(id, file.getDefaultFileFields())
            .then((files) => {
                assert(files.length != 0, "no files found");
                done();
            }).catch(done);
        });
    });

    // This should work accordingly to the docs
    // TODO: check https://developers.facebook.com/docs/workplace/integrations/custom-integrations/reference/group
    // describe("updateGroup", function(){
    //     it("should update group", function(done){   
    //         let description = "Test " + new Date();
    //         group.updateGroup("General", description)
    //         .then((res)=>{
    //             assert(res.id != 0, "could not update group");
    //             done();
    //         }).catch(done);              
    //     });
    // });

    describe("Member/Admin Management", function(){
        it("should add member to group by id", function(done){
            group.addMemberToGroupById(id, memberId)
            .then((res)=>{
                assert(JSON.parse(res).success == true, "could not add to group");
                done();
            }).then((done) => {
                group.promoteMemberToAdmin(id, memberId)
                .then((res)=>{
                    assert(JSON.parse(res).success == true, "could not promote to admin");
                    done();
                }).catch(done);    
            }).catch(done);
        });
        it("should remove member to group by id", function(done){   
            group.demoteMemberToAdmin(id, memberId)
            .then((res)=>{
                assert(JSON.parse(res).success == true, "could not remove to admin");
                done();
            }).then((done) => {
                group.removeMemberToGroupById(id, memberId)
                .then((res)=>{
                    assert(JSON.parse(res).success == true, "could not remove from  group");
                    done();
                }).catch(done);
            }).catch(done);
        });
        it("should add member to group by email", function(done){    
            group.addMemberToGroupByEmail(id, email)
            .then((res)=>{
                assert(JSON.parse(res).success == true, "could not add to group");
                done();
            }).catch(done);
        });
        it("should remove member to group by email", function(done){   
            group.removeMemberToGroupByEmail(id, email)
            .then((res)=>{
                assert(JSON.parse(res).success == true, "could not remove from group");
                done();
            }).catch(done);
        });
    });
    describe("Posting", function(){
        it("should post to group", function(done){   
            let msg = "Hi " + member.createMemberTag(memberId2);
            let url = "https://developers.facebook.com/docs/workplace/custom-integrations/";
            group.post(id, msg, url, true)
            .then((res)=>{
                assert(res.id != 0, "could not post to group");
                done();
            }).catch(done);              
        }).timeout(5000);
    });

});