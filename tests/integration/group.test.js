var assert = require("assert"),
    group = require("../../app/models/group"),
    member = require("../../app/models/member"),
    album = require("../../app/models/album"),
    doc = require("../../app/models/doc"),
    file = require("../../app/models/file"),
    post = require("../../app/models/post"),
    event = require("../../app/models/event"),
    request = require("request-promise");

let id = "1958444081104480";
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
                assert(admins.lenght != 0, "no admins found");
                done();
            }).catch(done);
        });
    });
    describe("getAllMembers", function(){
        it("should return members", function(done){                    
            group.getAllMembers(id, member.getDefaultMemberFields())
            .then((members) => {
                assert(members.lenght != 0, "no members found");
                done();
            }).catch(done);
        });
    });
    describe("getAllAlbums", function(){
        it("should return albums", function(done){                    
            group.getAllAlbums(id, album.getDefatulAlbumFields())
            .then((albums) => {
                assert(albums.lenght != 0, "no albums found");
                done();
            }).catch(done);;
        });
    });
    describe("getAllFeed", function(){
        it("should return feed", function(done){                    
            group.getAllFeed(id, post.getDefaultPostFields())
            .then((feed) => {
                assert(feed.lenght != 0, "no feed found");
                done();
            }).catch(done);
        }).timeout(5000); //likely slower
    });
    describe("getAllEvents", function(){
        it("should return events", function(done){                    
            group.getAllEvents(id, event.getAvailableEventFields())
            .then((events) => {
                assert(events.lenght != 0, "no event found");
                done();
            }).catch(done);
        });
    });
    describe("getAllMemeberRequests", function(){
        it("should return member requests", function(done){                    
            group.getAllMemberRequests(id, member.getDefaultMemberFields())
            .then((members) => {
                assert(members.lenght != 0, "no member requests found");
                done();
            }).catch(done);
        });
    });
    describe("getAllDocs", function(){
        it("should return docs", function(done){                    
            group.getAllDocs(id, doc.getAvailableDocFields())
            .then((members) => {
                assert(members.lenght != 0, "no docs found");
                done();
            }).catch(done);
        });
    });
    describe("getAllFiles", function(){
        it("should return docs", function(done){                    
            group.getAllFiles(id, file.getDefaultFileFields())
            .then((files) => {
                assert(files.lenght != 0, "no files found");
                done();
            }).catch(done);
        });
    });
    describe("updateGroup", function(){
        it("should update group", function(done){    
            assert.fail("TBD");                
        });
    });
});