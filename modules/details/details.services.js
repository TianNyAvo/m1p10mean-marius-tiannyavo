var dbServices = require('../database/database.service');
var mongodb = require('mongodb');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailSchema = new Schema({
    id_appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'appointments',
      required: true,
    },
    id_employe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'customers',
      required: true,
    },
    id_service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'services',
      required: true,
    },
    
    montant_commission: {
      type: Number,
      required: true,
      default: 0,
    },
    date: {
      type: Date,
      required: true,
    },
    prix: {
      type: Number,
      required: true,
      default: 0,
    },
    prix_final: {
      type: Number,
      required: true,
    },
    duree: {
      type: Number,
      required: true,
      default: 0,
    },
    remise: {
      type: Number,
      default: 0,
    },
  });
  
  const Detail = mongoose.model('detail_appointments', detailSchema);

mongoose.connect('mongodb+srv://tandriatoavina:mongopass1623@tiancluster.1h72rz3.mongodb.net/salon?retryWrites=true&w=majority&appName=TianCluster', {
  useNewUrlParser: true,
  bufferTimeoutMS: 60000, // Set bufferTimeoutMS to 60 seconds
});

exports.insertDetail = async (req) => {
    const detail = req;
    const {db, client} = await dbServices.connectToDatabase();

    const newDetail = new Detail({
        id_appointment: new mongodb.ObjectId(detail.id_appointment),
        id_employe: new mongodb.ObjectId(detail.id_employe),
        id_service: new mongodb.ObjectId(detail.id_service),
        montant_commission: detail.montant_commission,
        date: new Date(detail.date),
        prix: detail.prix,
        prix_final: detail.prix_final,
        duree: detail.duree,
        remise: detail.remise,
    });
    try {
        const resultat = await newDetail.save();
        console.log('Inserted detail:', resultat);
        return resultat.toObject();
    } catch (error) {
        console.error('Erreur lors de l\'insertion du detail :', error);
        return { error: 'Erreur lors de l\'insertion du detail' };
    } finally {
        client.close();
    }
};

exports.getDetailListAppointmentId = async (req) => {
    const id = req.id_appointment;
    console.log('get detail for appointment id:', id);
    const {db, client} = await dbServices.connectToDatabase();
    try {
      const details = await Detail.find({ id_appointment: id }).populate('id_employe', 'name').populate('id_service', 'name');
      return details;
    } catch (error) {
      console.error('Error getting details:', error);
      return error;  
    }
    finally {
      client.close();
    }
};

exports.getDetailListEmployeId = async (req) => {
  const id = req.id_employe;
  console.log('get detail for employe id:', id);
  const {db, client} = await dbServices.connectToDatabase();
  try {
    const details = await Detail.find({ id_employe: id }).populate('id_employe', 'name').populate('id_service', 'name').populate('id_offre', 'name');
    return details;
  } catch (error) {
    console.error('Error getting details:', error);
    return error;  
  }
  finally {
    client.close();
  }
};

