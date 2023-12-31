// Load the express library into a variable
const express = require('express');

// Create an instance of express, called "app"
let app = express();

// set up handlebars view engine, register w/ express
let handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// The default port will be 3000 unless otherwise specified
app.set('port', process.env.PORT || 3000);

// Serve all static resources from the public directory
app.use(express.static(__dirname + '/public'));

// Serve the home page
app.get('/', (req, res) => {
	// Render the "home" template as HTML
	res.render('home'); 
});

// 404 catch-all handler (middleware)
app.use( (req, res, next) => {
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use( (err, req, res, next) => {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

// Tell express to start listening for requests
// on the port we specified
app.listen(app.get('port'), () => {
  console.log( `Express started on http://localhost: ${app.get('port')}; press Ctrl-C to terminate.` );
});
