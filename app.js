const https = require('https');
const username = "brendanmoran";

function printMessage (username, badgeCount, points) {
    const message = (`${username} has ${badgeCount} total badges and ${points} total points in javaScript.`);
    console.log(message);
}

//connect to api url
const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
    console.dir(response);
});
//read the data
//parse the data
//print the data