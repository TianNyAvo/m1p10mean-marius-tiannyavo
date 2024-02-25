const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb');
const customerController = require('./modules/customer/customer.controller');
const servicesController = require('./modules/services/services.controller');
const preferencesController = require('./modules/preferences/preferences.controller');

console.log('server.js is running...');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));


app.listen(3000, function () {
    console.log('listening on 3000');
});

// user
app.post('/user/create', function (req, res) {
    console.log('insert customer');
    customerController.insertCustomer(req, res);
    
});

app.get('/customers', function (req, res) {
    console.log('get customers');
    customerController.getCustomers(req, res);
});

app.get('/user', function (req, res) {
    console.log('get user');
    customerController.getUserById(req, res);
});

app.get('/employe', function (req, res) {
    console.log('get employe');
    customerController.getEmployeList(req, res);
});

app.post('/customer/update', function (req, res) {
    console.log('update customer');
    customerController.updateCustomer(req, res);
});

app.post('/user/login', function (req, res) {
    console.log('login customer');
    customerController.loginCustomer(req, res);
});

app.post('/user/delete', function (req, res) {
    console.log('delete customer');
    customerController.deleteCustomer(req, res);
});

// user

// services

app.post('/service/create', function (req, res) {
    console.log('insert service');
    servicesController.insertService(req, res);
});

app.get('/services', function (req, res) {
    console.log('get services');
    servicesController.listServices(req, res);
});

app.get('/service', function (req, res) {
    console.log('get service');
    servicesController.getServiceById(req, res);
});

app.post('/service/update', function (req, res) {
    console.log('update service');
    servicesController.updateService(req, res);
});

app.post('/service/delete', function (req, res) {
    console.log('delete service');
    servicesController.deleteService(req, res);
});

// services

// preferences

app.post('/preference/create', function (req, res) {
    console.log('insert preference');
    preferencesController.insertPreference(req, res);
});

app.get('/preferences', function (req, res) {
    console.log('get preferences');
    preferencesController.listPreferences(req, res);
});

app.get('/preference', function (req, res) {
    console.log('get preference');
    preferencesController.getPreferenceById(req, res);
});

// preferences

/* MongoClient.connect("mongodb://localhost:27017", {
    useUnifiedTopology: true
})
    .then(client => {
        console.log('Connected to Database');
        const db = client.db('cruding');
        const quotesCollection = db.collection('quotes')

        app.get('/', function (req, res) {
            console.log('GET /');
            const cursor = db.collection('quotes').find().toArray().then(results => {
                res.render('index.ejs', { quotes: results });
            });
            // console.log(cursor);
            // res.sendFile(__dirname + '/index.html');
        });

        app.post('/quotes', function (req, res) {
            console.log('POST /quotes');
            quotesCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/'); // stay on the page
                })
                .catch(error => console.error(error));
        });

        app.put('/quotes', (req, res) => {
            console.log("putting");
            quotesCollection.findOneAndUpdate(
                { name: 'ro' },
                {
                    $set: {
                        name: req.body.name,
                        quote: req.body.quote
                    }
                },
                {
                    upsert: true
                }
            )
                .then(result => { res.json('Success') })
                .catch(error => console.error(error))
        });

        app.delete('/quotes', (req, res) => {
            console.log('deleting');
            quotesCollection.deleteOne(
                {
                    _id: new mongodb.ObjectId(req.body.id)
                }
            )
                .then(result => {
                    res.redirect('/');
                })
                .catch(error => console.error(error))

        });
    }); */