var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');

// Calls user endpoint with payload
function callUserEndpoint(endpoint, payload){
  // Setting URL and headers for request
  var options = {
      url: endpoint.url + '/'+ payload.userId,
      method: endpoint.verb
  };
  // return new promise
  return new Promise(function(resolve, reject) {
   // Do async job
      request(options, function(err, resp, body) {
          if (err) {
              reject(err);
          } else {
            resolve(body);
          }
      });
  });
}

  /* Batch POST endpoint. */
  router.post('/', function(req, res, next) {
    // Get request body endpoint and payload
    var endpoint =  req.body.endpoint;
    var payload =  req.body.payload;
      
    // Process batch edits for each item in payload array
    var responseValue =  [];
    payload.forEach((payloadItem) => {
      // For each item in payload make request to endpoint
      callUserEndpoint(endpoint, payloadItem);
      responseValue.push({
        status: "SUCCESS",
        userId: payloadItem.userId
      });
    });
    // Send Response
    res.send(responseValue);
});

module.exports = router;
