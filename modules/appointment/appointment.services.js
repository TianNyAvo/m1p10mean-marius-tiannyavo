var dbServices = require('../database/database.service');
var mongodb = require('mongodb');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    id_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'customers', // Remplacez 'Utilisateur' par le nom de votre modèle utilisateur
      required: true,
    },
    date_appointment: {
      type: Date,
      required: true,
    },
    date_insertion: {
      type: Date,
      default: Date.now,
    
    is_finished: {
      type: Boolean,
      default: false,
    },
  }});
  
  const Appointment = mongoose.model('appointments', appointmentSchema);

mongoose.connect('mongodb+srv://tandriatoavina:mongopass1623@tiancluster.1h72rz3.mongodb.net/salon?retryWrites=true&w=majority&appName=TianCluster', {
  useNewUrlParser: true,
  bufferTimeoutMS: 60000, // Set bufferTimeoutMS to 60 seconds
});


exports.insertAppointment = async (req) => {
    const appointment = req;
    const {db, client} = await dbServices.connectToDatabase();

    const rdv = new Appointment({
        id_user: new mongodb.ObjectId(appointment.id_user),
        date_appointment: new Date(appointment.date_appointment),
        date_insertion: new Date(appointment.date_insertion),
        is_finished: appointment.is_finished,
    });
    try {
        const resultat = await rdv.save();
        console.log('Inserted appointment:', resultat);
        return resultat.toObject();
    } catch (error) {
        console.error('Erreur lors de l\'insertion de l\'appointment :', error);
        return error;
    } finally {
        client.close();
    }
    // console.log('Inserted appointment:', result);
    // client.close();
    // return result.ops[0];
};

exports.getAppointmentList = async (req) => {
    try {
        const appointments = await Appointment.find().populate('id_user', 'name');
        return appointments;
      } catch (error) {
        console.error('Erreur lors de la récupération des rendez-vous :', error);
        return error;
      }
};

exports.getAppointmentById = async (rdv) => {
  console.log("appointment id:" + rdv._id);
    try {
      const appointment = await Appointment.findById(rdv._id).populate('id_user', 'name');
      return appointment;
    } catch (error) {
      console.error('Erreur lors de la récupération du rendez-vous par ID :', error);
      return error;
    }
  };

exports.getAppointmentsByUserId = async (userId) => {
    const id = userId.id_user
    console.log("get appointment user id:" + id);
    try {
      const appointments = await Appointment.find({ id_user: id })
        .populate('id_user', 'name')
        .exec();
  
      return appointments;
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez-vous par ID utilisateur :', error);
      throw error;
    }
  };

exports.updateAppointment = async (req) => {
    const rdv = req;
    try {
      const result = await Appointment.updateOne({ _id: rdv._id }, { $set: rdv });
  
      if (result.nModified === 1) {
        console.log('Appointment updated successfully');
      } else {
        console.log('No appointment was updated. It may not exist or the data was the same.');
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }
};