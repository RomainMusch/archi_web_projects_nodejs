// express
let express = require('express');
let app = express();
let bodyParser = require('body-parser');  
//post request
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// lien db file connection
let connection = require('./db.js');

// import routes
let router = require('./routes');
app.use('/', router);

// use port
var port = 8000
app.listen(port, function () { console.log('Navigateur localhost:' + port); })

//css
app.use('/css', express.static('./css'));

//img
app.use('/img', express.static('./img'));


