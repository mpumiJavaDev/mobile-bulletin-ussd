// BASE SET UP

//Call the packages we need
var express  = require('express'); // call express module
var app  = express(); 			   // define that our app uses express
var bodyParser = require('body-parser');
var jsontoxml = require('jstoxml');



var mongoose = require('mongoose');
mongoose.connect('mongodb://mobile:mobile123@ds031631.mlab.com:31631/heroku_vmn1kxq5'); //connection for Heroku hosting
//mongoose.connect('mongodb://localhost:27017/mobilebulletin-dev'); // connect to our database locally


//configure the app to use body-parser
// this will let us get the data from the POST

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


//var port  = process.env.PORT || 8280; // set up the port

// ROUTES FOR OUR APP

//======================================================

var router  = express.Router(); // get an instance of a router

// middleware to use for all requests
router.use(function(req, resp, next){
	// do logging
	console.log('Something is happening');
	next(); // make sure we go to the next routes and don't stop here
});


//test router to make sure everything is working(accessed at GET http://localhost:8280/api)
router.get('/', function(req, res){
	res.json({message: 'hooray welcome to our API!'});
});

// more routes for API will happen here
// on routes that end in numbers

var Numbers = require('./models/numbers');

router.route('/xml')

//create a number (accessed at GET http://localhost:8280/api/xml)
.get(function(req, res){

	var number = new Numbers();
	number.number = req.query.msidn;
	console.log(req.query.msidn);

	// save the number and check for errors
	number.save(function(err){
		if(err)
			res.send(err);

        var xml = jsontoxml.toXML({
            msg: {
                sessionid: req.query.sessionid,
                response: 'Welcome to Mobile Bulletin, Please Enter Your Name to register'
            }
        },{header: true, indent: ' '});

        console.log(xml);

        console.log('Number created!!');

        res.header('Content-Type', 'text/xml').send(xml);
	});
});


//Register the Routes
//all of our routes will be prefixed with /api

app.use('/api', router);

//START THE SERVER
app.listen(process.env.PORT || 8082, function(){
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});









