function message(username, badgeCount, points) {
    const message = (`${username} has ${badgeCount} total badges and ${points} points in javaScript.`);
    console.log(message);
}

function error(clarifier, error) {
    console.error(`${clarifier}: ${error.message}`)
}

module.exports.message = message;
module.exports.error = error;