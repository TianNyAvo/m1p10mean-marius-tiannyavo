var appointmentService = require('./appointment.services');

exports.insertAppointment = async (req, res) => {
  try {
      const rdv = req.body;
      const result = await appointmentService.insertAppointment(rdv);
      res.status(200).json(result);
  } catch (error) {
      console.error('Error inserting appointment:', error);
      res.status(500).json({ error: error });
  }
};

exports.listAppointments = async (req, res) => {
  try {
      const result = await appointmentService.getAppointmentList(req);
      res.status(200).json(result);
  } catch (error) {
      console.error('Error getting appointments:', error);
      res.status(500).json({ error: error });
  }
}

exports.getAppointmentById = async (req, res) => {
  try {
      const rdv = req.query;
      const result = await appointmentService.getAppointmentById(rdv);
      res.status(200).json(result);
  } catch (error) {
      console.error('Error getting appointment by id:', error);
      res.status(500).json({ error: error });
  }
};

exports.getAppointmentsByUserId = async (req, res) => {
  try {
      const user = req.query;
      const result = await appointmentService.getAppointmentsByUserId(user);
      res.status(200).json(result);
  } catch (error) {
      console.error('Error getting appointments by user id:', error);
      res.status(500).json({ error: error });
  }
}

exports.updateAppointment = async (req, res) => {
  try {
      const rdv = req.body;
      const result = await appointmentService.updateAppointment(rdv);
      res.status(200).json(result);
  } catch (error) {
      console.error('Error updating appointment:', error);
      res.status(500).json({ error: error });
  }
};