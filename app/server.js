const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb');
const customerController = require('./modules/customer/customer.controller');

console.log('server.js is running...');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));


app.listen(3000, function () {
    console.log('listening on 3000');
});

app.post('/', function (req, res) {
    console.log('insert customer');
    customerController.insertCustomer(req, res);
    
});

app.get('/customers', function (req, res) {
    console.log('get customers');
    customerController.getCustomers(req, res);
});

app.post('/customer/update', function (req, res) {
    console.log('update customer');
    customerController.updateCustomer(req, res);
});

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