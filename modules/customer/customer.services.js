var dbServices = require('../database/database.service');
var mongodb = require('mongodb');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Assurez-vous que l'email est unique si c'est le cas dans votre application
  },
  mdp: {
    type: String,
    required: true,
  },
  naissance: {
    type: Date,
    required: true,
  },
  create_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  debut_horaire: {
    type: Date,
  },
  fin_horaire: {
    type: Date,
  },
});

const Customer = mongoose.model('customers', customerSchema);

// module.exports = Customer;

exports.insertCustomer = async (customer) => {
    const {db, client} = await dbServices.connectToDatabase();
    const collection = db.collection('customers');
   try {
     const result = await collection.insertOne(customer);
     console.log('Inserted customer:', result);
     client.close();
     return result.ops[0];
   } catch (error) {
        console.error('Error inserting customer:', error);
        return { error: error };
   }
    
};

exports.getCustomers = async (req) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10; // Default to 10 items per page if not provided
    const skip = (page - 1) * pageSize;

    const {db, client} = await dbServices.connectToDatabase();
    const collection = db.collection('customers');
    try {
        const resultPromise = await collection.find().skip(skip).limit(pageSize).toArray();
        const result = await resultPromise;
        // console.log('Found customers:', result);
        client.close();
        return result;
    } catch (error) {
        console.error('Error getting customers:', error);
        return { error: error };
    }
};

exports.getUserById = async (user) => {
    console.log('Getting customer:', user._id)
    const {db, client} = await dbServices.connectToDatabase();
    const collection = db.collection('customers');
    try {
        const result = await collection.findOne({ _id: new mongodb.ObjectId(user._id) });
        console.log('Found customer:', result);
        client.close();
        return result;
    } catch (error) {
        console.error('Error getting customer:', error);
        return { error: error };
    }
};

exports.getEmployeList = async (req) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10; // Default to 10 items per page if not provided
    const skip = (page - 1) * pageSize;

    const {db, client} = await dbServices.connectToDatabase();
    const collection = db.collection('customers');
    try {
        const result = await collection.find({ role_id: "65db14c425c95f8472ad1ec9" })/* .skip(skip).limit(pageSize) */.toArray();
        console.log('Found employe:', result);
        client.close();
        return result;
    } catch (error) {
        console.error('Error getting employe:', error);
        return { error: error };
    }
};

exports.updateCustomer = async (customer) => {
    const {db, client} = await dbServices.connectToDatabase();
    console.log('Updating customer:', customer);
    const collection = db.collection('customers');
     try {
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
     } catch (error) {
        return { error: error };
     }
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