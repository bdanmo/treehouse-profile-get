const https = require('https');
const users = process.argv.slice(2);

function printMessage(username, badgeCount, points) {
    const message = (`${username} has ${badgeCount} total badges and ${points} points in javaScript.`);
    console.log(message);
}

function printError (clarifier, error) {
    console.error(`${clarifier}: ${error.message}`)
}

function getProfile(username) {
    //connect to REST API  url
    try { //node API will throw error immediately (no handling) if there is a problem with the arguments passed in to the API (e.g. the .get() method), use try/catch to handle these node-specific errors
        const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
            let body = "";
            //read the data
            response.on('data', data => {
                body += data.toString();
            });
            response.on('end', () => {
                //parse the data
                try {
                    const profile = JSON.parse(body);
                    //print the data
                    printMessage(username, profile.badges.length, profile.points.JavaScript);
                } catch (error) {
                    printError('JSON Parsing Error', error);
                }  
            });
        });

        request.on('error', error => {
            printError('Problem With Reqest', error);
        });
    } catch(error) {
        printError('Node.js Error', error);
    }
}


users.forEach(getProfile);