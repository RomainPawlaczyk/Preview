const https = require('https');
const http = require('http');
const app = require('./app');
const fs = require('fs');
const port = 3001;

//set the application port
app.set('port', port);

//create https server
const server = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/www.pawlaczyk.fr/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/www.pawlaczyk.fr/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/www.pawlaczyk.fr/fullchain.pem')
}, app);

//server listening on port
server.listen(port);

console.log('API server now running on port ' + port + ' ...');
