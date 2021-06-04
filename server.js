/**
 * @fileoverview Simple http server that dumps out all the incoming request
 * headers as json response.
 */

var jwt_decode = require('jwt-decode')
var http = require('http');  // 1 - Import Node.js code module
var ArgumentParser = require('argparse').ArgumentParser;

var parser = new ArgumentParser({
  version: '0.0.1',
  addHelp: true,
  description: 'IAP onprem sample application'
});

parser.addArgument(['--port'], {
  type: 'int',
  required: true,
  help: 'http port that the server listens to'
});

var server = http.createServer(function(req, res) {  // 2 - creating server
  res.setHeader('Content-Type', 'application/json');
  var payload = '';
  if (req.headers['x-goog-iap-jwt-assertion']) {
    try {
      payload = jwt_decode(req.headers['x-goog-iap-jwt-assertion']);
    } catch (e) {
      payload = 'INVALID_JWT';
    }
  }

  console.debug(payload);
  console.debug(JSON.stringify({headers: req.headers, iap_jwt_payload: payload}, null, '  '));
  res.end(JSON.stringify({headers: req.headers, iap_jwt_paylaod: payload}, null, '  '));
});

var args = parser.parseArgs();
console.log(args['port']);
server.listen(args['port']);  // 3 - listen for any incoming requests

console.log('Node.js web server at port %s is running..', args['port']);
