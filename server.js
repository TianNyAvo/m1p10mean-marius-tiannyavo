const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb');
const databaseServices = require('./modules/database/database.service');
const customerController = require('./modules/customer/customer.controller');
const servicesController = require('./modules/services/services.controller');
const preferencesController = require('./modules/preferences/preferences.controller');
const offersController = require('./modules/offers/offers.controller');
const appointmentController = require('./modules/appointment/appointment.controller');
const detailsController = require('./modules/details/details.controllers');
const databaseController = require('./modules/database/database.controller');
const depensesController = require('./modules/depenses/depenses.controller');

console.log('server.js is running...');

console.log('creating views if not exists');
databaseServices.createAppointmentView();
databaseServices.createempAvgView();

app.use(cors());
app.options('*', cors());


app.listen(3000, function () {
    console.log('listening on 3000');
});

app.use(express.json());

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


// offers

app.post('/offer/create', function (req, res) {
    console.log('insert offer');
    offersController.insertOffer(req, res);
});

app.get('/offers', function (req, res) {
    console.log('get offers');
    offersController.getOfferList(req, res);
});

// offers

// appointment

app.post('/appointment/create', function (req, res) {
    console.log('insert appointment');
    appointmentController.insertAppointment(req, res);
});

app.get('/appointments', function (req, res) {
    console.log('get appointments');
    appointmentController.listAppointments(req, res);
});

app.get('/appointment', function (req, res) {
    console.log('get appointment');
    appointmentController.getAppointmentById(req, res);
});

app.get('/appointments/id_user', function (req, res) {
    console.log('get appointments by user');
    appointmentController.getAppointmentsByUserId(req, res);
});

app.post('/appointment/update', function (req, res) {
    console.log('update appointment');
    appointmentController.updateAppointment(req, res);
});

// appointment

// details

app.post('/detail/create', function (req, res) {
    console.log('insert detail');
    detailsController.insertDetail(req, res);
});

app.get('/details/appointment', function (req, res) {
    console.log('get details by appointment');
    detailsController.getDetailListAppointmentId(req, res);
});

app.get('/details/employe', function (req, res) {
    console.log('get details by employe');
    detailsController.getDetailListEmployeId(req, res);
});

// details

// stats

app.get('/stats/getCa', function (req, res) {
    console.log('get CA');
    databaseController.getCA(req, res);
});

app.get('/stats/getCaJour', function (req, res) {
    console.log('get getCaJour');
    databaseController.getCAJour(req, res);
});

app.get('/stats/getEmpAvg', function (req, res) {
    console.log('get getEmpAvg');
    databaseController.getEmpAvg(req, res);
});

app.get('/stats/getdepenseMois', function (req, res) {
    console.log('get getdepenseMois');
    databaseController.getdepenseMois(req, res);
});

// stats

// depenses

app.post('/depense/create', function (req, res) {
    console.log('insert depense');
    depensesController.insertDepense(req, res);
});

app.get('/depenses', function (req, res) {
    console.log('get depenses');
    depensesController.getDepenseList(req, res);
});

app.get('/depense/id', function (req, res) {
    console.log('get depense by id');
    depensesController.getDepenseById(req, res);
});

app.post('/depense/update', function (req, res) {
    console.log('update depense');
    depensesController.updateDepense(req, res);
});
// depenses

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