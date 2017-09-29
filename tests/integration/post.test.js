var assert = require("assert"),
    member = require("../../app/models/member"),
    post = require("../../app/models/post"),
    reaction = require("../../app/models/reaction"),
    request = require("request-promise");

let id = "1958444081104480_1989628914652663";
describe("Post", function(){
    before(function(){

    });
    describe("getAllLikes", function(){
        it("should return likes", function(done){                    
            post.getAllLikes(id, reaction.getAvailableReactionFields())
            .then((likes) => {
                assert(likes.lenght != 0, "no likes found");
                done();
            }).catch(done);
        });
    });
    describe("getAllReactions", function(){
        it("should return reactions", function(done){                    
            post.getAllReactions(id, reaction.getAvailableReactionFields())
            .then((reactions) => {
                assert(reactions.lenght != 0, "no reactions found");
                done();
            }).catch(done);
        });
    });
    describe("getAllComments", function(){
        it("should return comments", function(done){                    
            post.getAllComments(id, post.getAvailableCommentFields())
            .then((comments) => {
                assert(comments.lenght != 0, "no comments found");
                done();
            }).catch(done);
        });
    });
    describe("getAllAttachments", function(){
        it("should return attachments", function(done){                    
            post.getAllAttachments(id, post.getAvailableAttachmentFields())
            .then((attachments) => {
                assert(attachments.lenght != 0, "no attachments found");
                done();
            }).catch(done);
        });
    });
});