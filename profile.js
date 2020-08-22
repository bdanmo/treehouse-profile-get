//const http = require('http');
import http from 'http';
import https from 'https';
import * as print from './print.js';

function get(username) {
  //connect to REST API  url
  try {
    const request = https.get(
      `https://teamtreehouse.com/${username}.json`,
      response => {
        if (response.statusCode === 200) {
          let body = '';
          //read the data
          response.on('data', data => {
            body += data.toString();
          });

          response.on('end', () => {
            //parse and print the data
            try {
              const profile = JSON.parse(body);
              print.message(
                username,
                profile.badges.length,
                profile.points.javaScript
              );
            } catch (error) {
              print.error('JSON Parsing Error', error);
            }
          });
        } else {
          let message = `There was error getting profile for ${username} (${
            response.statusCode
          }: ${http.STATUS_CODES[response.statusCode]})`;
          let statusCodeError = new Error(message);
          print.error('Response error', statusCodeError);
        }
      }
    );

    request.on('error', error => {
      print.error('Problem With Reqest', error);
    });
    /* 
      node API will throw error immediately (no handling) if there is a problem with the arguments passed in to the API
      (e.g. the .get() method) -- use try/catch to handle these node-specific errors
    */
  } catch (error) {
    print.error('Node.js Error', error);
  }
}

export { get };
