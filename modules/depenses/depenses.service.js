var dbServices = require('../database/database.service');
var mongodb = require('mongodb');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const depenseSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  montant: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Depense = mongoose.model('depenses', depenseSchema);

mongoose.connect('mongodb+srv://tandriatoavina:mongopass1623@tiancluster.1h72rz3.mongodb.net/salon?retryWrites=true&w=majority&appName=TianCluster', {
  useNewUrlParser: true,
  bufferTimeoutMS: 60000, // Set bufferTimeoutMS to 60 seconds
});

// module.exports = Depense;

exports.insertDepense = async (req) => {
  const depense = req;
  const {db, client} = await dbServices.connectToDatabase();

  const dep = new Depense({
      type: depense.type,
      date: new Date(depense.date),
      montant: depense.montant,
  });
  try {
      const resultat = await dep.save();
      console.log('Inserted depense:', resultat);
      return resultat.toObject();
  } catch (error) {
      console.error('Erreur lors de l\'insertion de depense :', error);
      return error;
  } finally {
      client.close();
  }
  // console.log('Inserted appointment:', result);
  // client.close();
  // return result.ops[0];
};


exports.getDepenseList = async () => {
  try {
    const depenses = await Depense.find();
    return depenses;
  } catch (error) {
    console.error('Erreur lors de la récupération des depenses :', error);
    return error;
  }
};

exports.getDepenseById = async (depense) => {
  const id = depense._id
  console.log('get depense id:', id);
  try {
    const dep = await Depense.findById(id);
    return dep;
  } catch (error) {
    console.error('Erreur lors de la récupération de la depense :', error);
    return error;
  }
};

exports.updateDepense = async (req) => {
  const depense = req;
    try {
      const result = await Depense.updateOne({ _id: depense._id }, { $set: depense });
  
      if (result.nModified === 1) {
        console.log('Depense updated successfully');
      } else {
        console.log('No depense was updated. It may not exist or the data was the same.');
      }
    } catch (error) {
      console.error('Error updating depense:', error);
      throw error;
    }
};