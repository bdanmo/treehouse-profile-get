

const https = require('https');
const users = process.argv.slice(2);

function printMessage (username, badgeCount, points) {
    const message = (`${username} has ${badgeCount} total badges and ${points} points in javaScript.`);
    console.log(message);
}

function getProfile(username) {
    //connect to api url
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
        let body = "";
        //read the data
        response.on('data', data => {
            body += data.toString();
        });
        response.on('end', () => {
            //parse the data
            const profile = JSON.parse(body);
            //print the data
            printMessage(username, profile.badges.length, profile.points.JavaScript);
        });
    });
}

users.forEach(getProfile);