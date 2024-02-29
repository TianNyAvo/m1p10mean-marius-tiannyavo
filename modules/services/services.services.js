var dbServices = require('../database/database.service');
var mongodb = require('mongodb');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  creator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customers', // Assurez-vous de remplacer 'User' par le nom de votre modèle utilisateur
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  duree: {
    type: Number,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  commission: {
    type: Number,
    required: true,
  },
});

const Service = mongoose.model('services', serviceSchema);

// module.exports = Service;

exports.insertService = async (serv) => {
  const {db, client} = await dbServices.connectToDatabase();
  const collection = db.collection('services');
  const result = await collection.insertOne(serv);
  console.log('Inserted service:', result);
  client.close();
  return result.ops[0];
  
};

exports.listServices = async (req) => {
  // const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  // const pageSize = parseInt(req.query.pageSize) || 10; // Default to 10 items per page if not provided
  // const skip = (page - 1) * pageSize;

  const {db, client} = await dbServices.connectToDatabase();
  const collection = db.collection('services');
  try {
    const resultPromise = await collection.find().toArray();
    const result = await resultPromise;
    console.log('Found services:', result);
    client.close();
    return result;
  } catch (error) {
    console.error('Error getting services:', error);
    return { error: error };
  }
};

exports.getServiceById = async (serv) => {
  const {db, client} = await dbServices.connectToDatabase();
  const collection = db.collection('services');
  try {
    const result = await collection.findOne({ _id: new mongodb.ObjectId(serv._id) });
    console.log('Found service:', result);
    client.close();
    return result;
  } catch (error) {
    console.error('Error getting service:', error);
    return { error: error };
  }
}

exports.updateService = async (serv) => {
  const {db, client} = await dbServices.connectToDatabase();
  console.log('Updating service:', serv);
  const collection = db.collection('services');
   try {
    const result = await collection.findOneAndUpdate(
       { 
           _id: new mongodb.ObjectId(serv._id)
       },
       { 
           $set: {
               creator_id: serv.creator_id,
               name: serv.name,
               duree: serv.duree,
               prix: serv.prix,
               commission: serv.commission,
 
           }
       }
   )
   client.close();
   return result;
   } catch (error) {
        console.error('Error updating service:', error);
        return { error: error };
   }
};

exports.deleteService = async (serv) => {
  const {db, client} = await dbServices.connectToDatabase();
  const collection = db.collection('services');
  const result = await collection.deleteOne({ _id: new mongodb.ObjectId(serv._id) });
  console.log('Deleted service:', result);
  client.close();
  return result;
}