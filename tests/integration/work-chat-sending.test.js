var assert = require("assert"),
    workChat = require("../../app/models/work-chat"),
    sinon = require("sinon"),
    request = require("request-promise");

describe("Work chat", function(){
    var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');
    
    var dotenv = require('dotenv').config({path: rootPath + '/.env'});
    
    let id = process.env.TEST_MEMBER_ID2;
       
    describe("Basic Content Types", function(){
        it("should sendTextMessage", function(done){  
            let sender = workChat.createSenderFromId(id);
            workChat.sendTextMessage(sender, "message").then((res) => {
                assert(res.recipient_id != 0, "invalid response");
                done();
            }).catch(done);       
        });
        it("should sendAudioMessage", function(done){                    
            let sender = workChat.createSenderFromId(id);
            workChat.sendAudioMessage(sender, "http://www.noiseaddicts.com/samples_1w72b820/55.mp3").then((res) => {
                assert(res.recipient_id != 0, "invalid response");
                done();
            }).catch(done);
        }).timeout(10000); //likely slower
        
        it("should sendFileMessage", function(done){
            let url = "https://scontent.xx.fbcdn.net/v/t39.2365-6/14677823_1173542856063442_2879841607090176000_n.pdf?_nc_log=1&oh=62f454dbd043fc65020ff63f19ccdf57&oe=5A7BE438";
            let sender = workChat.createSenderFromId(id);
            workChat.sendFileMessage(sender, url).then((res) => {
                assert(res.recipient_id != 0, "invalid response");
                done();
            }).catch(done);
        }).timeout(5000); //likely slower;;
        
        // it("should sendVideoMessage", function(done){ 
        //     //TODO: Set to a valid Video URL          
        //     let url = "https://video.xx.fbcdn.net/v/t43.1792-2/17879150_683278481855855_7153571496697266176_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InN2ZV9oZCJ9&_nc_log=1&oh=4753a971dcc411286444f88cb499d7d6&oe=59D6A8EC";  
        //     let sender = workChat.createSenderFromId(id);
        //     workChat.sendVideoMessage(sender, url).then((res) => {
        //         assert(res.recipient_id != 0, "invalid response");
        //         done();
        //     }).catch(done);
        // }).timeout(20000); //likely slower;
        
        it("should sendImageMessage", function(done){   
            let url = "https://fb-s-a-a.akamaihd.net/h-ak-fbx/v/t39.2365-6/19831396_216982118824950_6849157748198735872_n.jpg?_nc_log=1&oh=c5eb63ea94f4b0a4e5a89cc6ac3ae2ee&oe=5A825480&__gda__=1517959694_7a017a372976a11f44bd07980b2140b4";               
            let sender = workChat.createSenderFromId(id);
            workChat.sendImageMessage(sender, url).then((res) => {
                assert(res.recipient_id != 0, "invalid response");
                done();
            }).catch(done);
        }).timeout(5000); //likely slower;
    });
    
    describe("Quick Replies", function(){
        it("should send text quick replies", function(done){           
            let replies = [];
            replies.push(workChat.createTextQuickReply("Yes", {yes: true}, null));    
            replies.push(workChat.createTextQuickReply("No", {yes: false}, null));   
            let sender = workChat.createSenderFromId(id);
            workChat.sendQuickReplies(sender, "quick 1", replies).then((res) => {
                assert(res.recipient_id != 0, "invalid response");
                done();
            }).catch(done);
        }).timeout(5000); //likely slower;;
        it("should send image quick replies", function(done){                    
            let replies = [];
            replies.push(workChat.createTextQuickReply("Yes", {yes: true}, "https://fb.facebook.com/favicon.ico"));    
            replies.push(workChat.createTextQuickReply("No", {yes: false}, "https://fb.facebook.com/favicon.ico"));   
            let sender = workChat.createSenderFromId(id);
            workChat.sendQuickReplies(sender, "quick 2", replies).then((res) => {
                assert(res.recipient_id != 0, "invalid response");
                done();
            }).catch(done);
        }).timeout(5000); //likely slower;;
        it("should send location quick reply", function(done){                    
            let replies = [];
            replies.push(workChat.createLocationQuickReply("Yes", null, null));    
            let sender = workChat.createSenderFromId(id);
            workChat.sendQuickReplies(sender, "quick 3", replies).then((res) => {
                assert(res.recipient_id != 0, "invalid response");
                done();
            }).catch(done);
        }).timeout(5000); //likely slower;;
        it("should send multiple quick replies", function(done){                    
            let replies = [];
            replies.push(workChat.createTextQuickReply("Yes", {yes: true}, "https://fb.facebook.com/favicon.ico"));    
            replies.push(workChat.createLocationQuickReply("Yes", null, null));    
            replies.push(workChat.createTextQuickReply("No", {yes: false}, null));   
            let sender = workChat.createSenderFromId(id);
            workChat.sendQuickReplies(sender, "quick 4", replies).then((res) => {
                assert(res.recipient_id != 0, "invalid response");
                done();
            }).catch(done);
        }).timeout(5000); //likely slower;;
    });
    
    describe("Templates", function(){
        it("should send WebUrlTemplate", function(done){             
            let buttons = [];
            buttons.push(workChat.createWebUrlTemplate("http://facebook.com", "Facebook"));    
            buttons.push(workChat.createWebUrlTemplate("http://facebook.com/work", "Workplace"));    
            let sender = workChat.createSenderFromId(id);
            workChat.sendButtonsTemplate(sender, "button template", buttons).then((res) => {
                assert(res.recipient_id != 0, "invalid response");
                done();
            }).catch(done);
        }).timeout(5000); //likely slower;;
        
        it("should send PostBackTemplate", function(done){                    
            let buttons = [];
            buttons.push(workChat.createPostbackTemplate("Facebook", {workplace: false}));    
            buttons.push(workChat.createPostbackTemplate("Workplace", {workplace: true}));    
            let sender = workChat.createSenderFromId(id);
            workChat.sendButtonsTemplate(sender, "postback template", buttons).then((res) => {
                assert(res.recipient_id != 0, "invalid response");
                done();
            }).catch(done);
        });
        
        it("should send GenericTemplate", function(done){         
            let image_url = "https://fb-s-a-a.akamaihd.net/h-ak-fbx/v/t39.2365-6/19831396_216982118824950_6849157748198735872_n.jpg?_nc_log=1&oh=c5eb63ea94f4b0a4e5a89cc6ac3ae2ee&oe=5A825480&__gda__=1517959694_7a017a372976a11f44bd07980b2140b4";
            let buttons = [];
            buttons.push(workChat.createPostbackTemplate("Facebook", {workplace: false}));    
            buttons.push(workChat.createPostbackTemplate("Workplace", {workplace: true}));

            let cards = [];
            cards.push(workChat.createCardTemplate("card 1", "subtitle", image_url, buttons));    
            cards.push(workChat.createCardTemplate("card 2", "subtitle", image_url, buttons)); 
            cards.push(workChat.createCardTemplate("card 3", "subtitle", image_url, buttons));   
            let sender = workChat.createSenderFromId(id);
            workChat.sendGenericTemplate(sender,  cards).then((res) => {
                assert(res.recipient_id != 0, "invalid response");
                done();
            }).catch(done);
        });
    });
    
    describe("Sender Action", function(){
        it("should send MarkSeen Action", function(done){                    
            let sender = workChat.createSenderFromId(id);
            workChat.sendSenderAction(sender, workChat.createSenderActionMarkSeen()).then((res) => {
                assert(res.recipient_id != 0, "invalid response");
                done();
            }).catch(done);
        });
        it("should send TypingOn Action", function(done){                    
            let sender = workChat.createSenderFromId(id);
            workChat.sendSenderAction(sender, workChat.createSenderActionTypingOn()).then((res) => {
                assert(res.recipient_id != 0, "invalid response");
                done();
            }).catch(done);
        });
        it("should send TypingOff Action", function(done){                    
            let sender = workChat.createSenderFromId(id);
            workChat.sendSenderAction(sender, workChat.createSenderActionTypingOff()).then((res) => {
                assert(res.recipient_id != 0, "invalid response");
                done();
            }).catch(done);
        });
        
    });
});