var dbServices = require('../database/database.service');
var mongodb = require('mongodb');

exports.insertAppointment = async (req, res) => {
    const appointment = req.body;
    const {db, client} = await dbServices.connectToDatabase();
    const collection = db.collection('appointments');
    const result = await collection.insertOne(appointment);
    console.log('Inserted appointment:', result);
    client.close();
    res.status(200).json(result.ops[0]);
};

exports.getAppointmentList = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10; // Default to 10 items per page if not provided
    const skip = (page - 1) * pageSize;

    const {db, client} = await dbServices.connectToDatabase();
    const collection = db.collection('appointments');
    const result = await collection.find().skip(skip).limit(pageSize).toArray();
    console.log('Found appointments:', result);
    client.close();
    res.status(200).json(result);
};