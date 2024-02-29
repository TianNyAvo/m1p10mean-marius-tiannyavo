var dbServices = require('../database/database.service');
var mongodb = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  remise: {
    type: Number,
    required: true,
  },
  date_debut: {
    type: Date,
    required: true,
  },
  date_fin: {
    type: Date,
    required: true,
  },
});

const Offer = mongoose.model('offers', offerSchema);

mongoose.connect('mongodb+srv://tandriatoavina:mongopass1623@tiancluster.1h72rz3.mongodb.net/salon?retryWrites=true&w=majority&appName=TianCluster', {
  useNewUrlParser: true,
  bufferTimeoutMS: 60000, // Set bufferTimeoutMS to 60 seconds
});

exports.insertOffer = async (req) => {
  const offer = req;
    
  // Utilisez le modèle Mongoose pour créer une instance avec les données de la requête
  const newOffer = new Offer({
      name: offer.name,
      remise: offer.remise,
      date_debut: new Date(offer.date_debut),
      date_fin: new Date(offer.date_fin),
  });

  const { db, client } = await dbServices.connectToDatabase();

  
  try {
      // Utilisez save() pour enregistrer l'objet dans la base de données
      const resultat = await newOffer.save();
      console.log('Inserted offer:', resultat);
      return resultat.toObject();
  } catch (error) {
      console.error('Erreur lors de l\'insertion de l\'offre :', error);
      return { error: 'Erreur lors de l\'insertion de l\'offre' };
  } finally {
      client.close();
  }
};

exports.getOfferList = async (req) => {
    const {db, client} = await dbServices.connectToDatabase();
    const collection = db.collection('offers');
    try {
      const result = await collection.find().toArray();
      console.log('Found offers:', result);
      client.close();
      return result;
    } catch (error) {
      console.error('Error getting offers:', error);
      return { error: error };
    }
};

exports.getOfferById = async (req) => {
    const {db, client} = await dbServices.connectToDatabase();
    const collection = db.collection('offers');
    try {
      const result = await collection.findOne({ _id: new mongodb.ObjectId(req._id) });
      console.log('Found offer:', result);
      client.close();
      return result;
    } catch (error) {
      console.error('Error getting offer:', error);
      return { error: error };
    }
};

exports.updateOffer = async (req, res) => {
    const {db, client} = await dbServices.connectToDatabase();
    console.log('Updating offer:', req);
    const collection = db.collection('offers');
     try {
      const result = await collection.findOneAndUpdate(
         { 
             _id: new mongodb.ObjectId(req._id)
         },
         { 
             $set: {
                 name: req.name,
                 remise: req.remise,
                 price: req.price,
                 date_debut: req.date_debut,
                 date_fin: req.date_fin
             }
         }
     );
     client.close();
     return result;
     } catch (error) {
        console.error('Error updating offer:', error);
        return { error: error };
     }
};

exports.deleteOffer = async (req, res) => {
    const {db, client} = await dbServices.connectToDatabase();
    console.log('Deleting offer:', req);
    const collection = db.collection('offers');
     await collection.findOneAndDelete(
        { 
            _id: new mongodb.ObjectId(req._id)
        }
    );
    client.close();
    return true;
};