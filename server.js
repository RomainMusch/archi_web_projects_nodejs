// express
let express = require('express');
let app = express();
let bodyParser = require('body-parser');  
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// let session    = require('express-session');  

// lien db file connection
let connection = require('./db.js');

// import routes
let router = require('./routes');
app.use('/', router);

// use port
var port = 8000
app.listen(port, function () { console.log('Navigateur localhost:' + port); })


