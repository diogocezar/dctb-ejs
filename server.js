const Server = {
	express        : null,
	faker          : null,
	bodyParser     : null,
	expressLayouts : null,
	app            : null,
	port           : null,
	init: () => {
		Server.express        = require('express');
		Server.faker          = require('faker');
		Server.bodyParser     = require('body-parser');
		Server.expressLayouts = require('express-ejs-layouts');
		Server.app            = Server.express();
		Server.port           = process.env.PORT || 8000;

		Server.configuration();
		Server.routes();
	},
	configuration: () => {
		Server.app.set('view engine', 'ejs');
		Server.app.use(Server.expressLayouts);
		Server.app.use(Server.bodyParser.urlencoded());
		Server.app.use(Server.express.static(__dirname + '/public'));
		Server.app.listen(Server.port, () => {
		    console.log(`Server started at: http://localhost:${Server.port}`);
		});
	},
	routes: () => {
		Server.app.get('', (req, res) => {
			res.render('pages/home');
		});

		Server.app.get('/about', (req, res) => {
			var users = [{
				name: Server.faker.name.findName(),
				email: Server.faker.internet.email(),
				avatar: 'https://api.adorable.io/avatars/' + Math.random() * 100
			}, {
				name: Server.faker.name.findName(),
				email: Server.faker.internet.email(),
				avatar: 'https://api.adorable.io/avatars/' + Math.random() * 100
			}, {
				name: Server.faker.name.findName(),
				email: Server.faker.internet.email(),
				avatar: 'https://api.adorable.io/avatars/' + Math.random() * 100
			}];
			res.render('pages/about', {
				users: users
			})
		});

		Server.app.get('/contact', (req, res) => {
			res.render('pages/contact')
		});

		Server.app.post('/contact', (req, res) => {
			res.send('Obrigado por entrar em contato conosco, ' + req.body.name + '! Responderemos em breve!');
		});
	}
}

Server.init();