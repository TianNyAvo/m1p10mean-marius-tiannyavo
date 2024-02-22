var dbServices = require('../database/database.service');
var mongodb = require('mongodb');
exports.insertCustomer = async (customer) => {
    const {db, client} = await dbServices.connectToDatabase();
    const collection = db.collection('customers');
    const result = await collection.insertOne(customer);
    console.log('Inserted customer:', result);
    client.close();
    return result.ops.first;
    
};

exports.getCustomers = async (req) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10; // Default to 10 items per page if not provided
    const skip = (page - 1) * pageSize;

    const {db, client} = await dbServices.connectToDatabase();
    const collection = db.collection('customers');
    const resultPromise = await collection.find().skip(skip).limit(pageSize).toArray();
    const result = await resultPromise;
    // console.log('Found customers:', result);
    client.close();
    return result;
};

exports.updateCustomer = async (customer) => {
    const {db, client} = await dbServices.connectToDatabase();
    console.log('Updating customer:', customer);
    const collection = db.collection('customers');
     await collection.findOneAndUpdate(
        { 
            _id: new mongodb.ObjectId(customer._id)
        },
        { 
            $set: {
                nom: customer.nom,
                prenom: customer.prenom
            }
        },
        {
            returnDocument: 'after'
        }
    );
    const result = await collection.findOne({ _id: new mongodb.ObjectId(customer._id) });
    console.log('Updated customer:', result);
    client.close();
    return result;
};

exports.deleteCustomer = async (customer) => {
    const {db, client} = await dbServices.connectToDatabase();
    console.log('Deleting customer:', customer);
    const collection = db.collection('customers');
    const result = await collection.deleteOne({ _id: new mongodb.ObjectId(customer._id) });
    client.close();
    return result;
};