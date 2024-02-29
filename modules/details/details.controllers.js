var detailsService = require('./details.services');

exports.insertDetail = async (req, res) => {
  try {
      const detail = req.body;
      const result = await detailsService.insertDetail(detail);
      res.status(200).json(result);
  } catch (error) {
      console.error('Error inserting detail:', error);
      res.status(500).json({ error: error });
  }
}

exports.getDetailListAppointmentId = async (req, res) => {
  try {
    const id = req.body;
      const result = await detailsService.getDetailListAppointmentId(id);
      res.status(200).json(result);
  } catch (error) {
      console.error('Error getting details:', error);
      res.status(500).json({ error: error });
  }
};

exports.getDetailListEmployeId = async (req, res) => {
  try {
    const id = req.body;
      const result = await detailsService.getDetailListEmployeId(id);
      res.status(200).json(result);
  } catch (error) {
      console.error('Error getting details:', error);
      res.status(500).json({ error: error });
  }
}