var dbServices = require('../database/database.service');
var mongodb = require('mongodb');
exports.insertCustomer = async (customer) => {
    const {db, client} = await dbServices.connectToDatabase();
    const collection = db.collection('customers');
    const result = await collection.insertOne(customer);
    console.log('Inserted customer:', result);
    client.close();
    return result.ops[0];
    
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

exports.getUserById = async (user) => {
    const {db, client} = await dbServices.connectToDatabase();
    const collection = db.collection('customers');
    const result = await collection.findOne({ _id: new mongodb.ObjectId(user._id) });
    console.log('Found customer:', result);
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
                role_id: customer.role_id,
                name: customer.name,
                email: customer.email,
                mdp: customer.mdp,
                naissance: customer.naissance,
                create_date: customer.create_date,
                debut_horaire: customer.debut_horaire,
                fin_horaire: customer.fin_horaire
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

exports.loginCustomer = async (customer) => {
    const {db, client} = await dbServices.connectToDatabase();
    const collection = db.collection('customers');
    console.log('Logging in customer:', customer);
    try {
        const result = await collection.findOne({ email: customer.email});
        if (result) {
            if (result.mdp === customer.mdp) {
                console.log('Logged in customer:', result);
                client.close();
                return result;
            }
        
            else {
                console.log('Incorrect email or password');
                client.close();
                return  'Incorrect password';
            }
        }
        else {
            console.log('Incorrect email or password');
            client.close();
            return 'Incorrect email or password';
        }
    } catch (error) {
        console.error('Error logging in customer:', error);
        client.close();
        throw error;
    }

};