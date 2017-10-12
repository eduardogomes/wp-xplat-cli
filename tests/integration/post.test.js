var assert = require("assert"),
    member = require("../../app/models/member"),
    post = require("../../app/models/post"),
    reaction = require("../../app/models/reaction"),
    request = require("request-promise");

var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

var dotenv = require('dotenv').config({path: rootPath + '/.env'});

let id = process.env.TEST_POST_ID;
let memberId2 = process.env.TEST_MEMBER_ID2;
describe("Post", function(){
    before(function(){

    });
    describe("getAllLikes", function(){
        it("should return likes", function(done){                    
            post.getAllLikes(id, reaction.getAvailableReactionFields())
            .then((likes) => {
                assert(likes.length != 0, "no likes found");
                done();
            }).catch(done);
        });
    });
    describe("getAllReactions", function(){
        it("should return reactions", function(done){                    
            post.getAllReactions(id, reaction.getAvailableReactionFields())
            .then((reactions) => {
                assert(reactions.length != 0, "no reactions found");
                done();
            }).catch(done);
        });
    });
    describe("getAllComments", function(){
        it("should return comments", function(done){                    
            post.getAllComments(id, post.getAvailableCommentFields())
            .then((comments) => {
                assert(comments.length != 0, "no comments found");
                done();
            }).catch(done);
        });
    });
    describe("getAllAttachments", function(){
        it("should return attachments", function(done){                    
            post.getAllAttachments(id, post.getAvailableAttachmentFields())
            .then((attachments) => {
                assert(attachments.length != 0, "no attachments found");
                done();
            }).catch(done);
        });
    });
    describe("comment", function(){
        it("should comment", function(done){      
            let msg = "Hi " + member.createMemberTag(memberId2);              
            post.comment(id, msg)
            .then((res) => {
                assert(res.id != 0, "no comments found");
                done();
            }).catch(done);
        }).timeout(5000);
    });
});