var config = require('./config/config'), 
    account = require('./app/models/account'), 
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
program.parse(process.argv); 