var config = require('./config/config'), 
    account = require('./app/models/account'),
    group = require('./app/models/group'),  
    member = require('./app/models/member'),  
    community = require('./app/models/community'),     
    program = require('commander');

program
.version('0.0.1')
.command('update-email <email> <newEmail>')
.description("Update an user's email")
.action(function(email, newEmail){
  console.log("About to change e-mail from " + email + " to " + newEmail);
    account.updateUserEmail(email, newEmail)
    .then(user => {
        console.log("SUCCESS updating email from " +  email + " to " + newEmail);
    }).catch(error=>{
        console.log("ERROR updating email from " +  email + " to " + newEmail + "Error: " + error);
    });
});
program
.version('0.0.1')
.command('update-locale <email> <locale>')
.description("Update an user's locale")
.action(function(email, locale){
  console.log("About to change locale for user " + email + " to " + locale);
    account.updateUserLocale(email, locale)
    .then(user => {
        console.log("SUCCESS updating locale for " +  email + " to " + locale);
    }).catch(error=>{
        console.log("ERROR updating locale for " +  email + " to " + locale + "Error: " + error);
    });
});
program
.version('0.0.1')
.command('create-group <name> <description> <privacy>')
.description("Create a group using the informed name, description, privacy (OPEN, CLOSED, SECRET)")
.action(function(name, description, privacy, members, admins){
    //console.log("About to create group " + name + " description " + description + " and privacy " + privacy);
    community.createNewGroup(name, description, privacy)
    .then(newgroup => {
        console.log(JSON.parse(newgroup).id);
    }).catch(error=>{
        console.log("ERROR creating group " + name + " description " + description + " and privacy " + privacy + " Error: " + error);
    });
});
program
.version('0.0.1')
.command('add-member <groupid> <member>')
.description("Add a new member in a existing group ")
.action(function(groupid, member){
  console.log("About to add member  " + member + " id " + groupid);
    group.addMemberToGroupByEmail(groupid, member).then(result => {
        console.log("SUCCESS adding member  " + member +  " id " + groupid);
    }).catch(error=>{
        console.log("ERROR adding member  " + member +  " id " + groupid + " Error: " + error);
    });
});
program
.version('0.0.1')
.command('add-admin <groupid> <admin>')
.description("Add a new admin in a existing group ")
.action(function(groupid, admin){
  console.log("About to add admin  " + admin + " id " + groupid);
    member.getSingleMember(admin).then(adm => {
        console.log(adm);
        group.promoteMemberToAdmin(groupid, adm.id).then(result => {
            console.log("SUCCESS adding admin  " + admin +  " id " + groupid);
        }).catch(error=>{
            console.log("ERROR adding admin  " + admin +  " id " + groupid + " Error: " + error);
        });    
    });    
});
program
.version('0.0.1')
.command('list-groups')
.description("List all groups")
.action(function(){
    community.getAllGroups(group.getAvailableGroupFields())
    .then((groups) => {
        groups.forEach(g => {
            console.log("\"" + g.name + "\" ," + g.id + ", \"" + g.privacy + "\"");
        });
    })
});
program
.version('0.0.1')
.command('update-workanniversary <email> <startDate>')
.description("Update an user's startDate")
.action(function(email, startDate){
  console.log("About to update work anniversary of " + email + " to " + startDate);
    account.updateWorkAnniversary(email, startDate)
    .then(user => {
        console.log("SUCCESS updating work anniversary from " +  email + " to " + startDate);
    }).catch(error=>{
        console.log("ERROR updating work anniversary from " +  email + " to " + startDate + " Error: " + error);
    });
});
program.parse(process.argv);