var express = require('express'),
    config = require('./config/config');

var app = express();

require('./config/express')(app, config);

app.listen(config.port || 9000, function () {
    console.log('Express server started and listening on ' + this.address().port + ".");
})

/* The following snippet can be used to trigger an action accordingly to a CRON pattern
* e.g.: triggering a work chat message to an user.
*/
// let job = new CronJob('00 * * * * 1-5', function() {
//     /*
//    * Runs every hour (minute 00), form Monday through Friday
//    */

//     // Execute code here

// }, null, true, 'America/Los_Angeles');
// job.start();