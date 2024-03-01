var preferencesService = require('./preferences.services');

exports.insertPreference = async (req, res) => {
  try {
      const customer = req.body;
      const result = await preferencesService.insertPreference(customer);
      res.status(200).json(result);
  } catch (error) {
      console.error('Error inserting preference:', error);
      res.status(500).json({ error: error });
  }
}

exports.listPreferences = async (req, res) => {
  try {
      const result = await preferencesService.listPreferences(req);
      res.status(200).json(result);
  } catch (error) {
      console.error('Error getting preferences:', error);
      res.status(500).json({ error: error });
  }
}

exports.getPreferenceById = async (req, res) => {
  try {
      const pref = req.query;
      const result = await preferencesService.getPreferenceById(pref);
      res.status(200).json(result);
  } catch (error) {
      console.error('Error getting preference by id:', error);
      res.status(500).json({ error: error });
  }
};

exports.updatePreference = async (req, res) => {
  try {
      const customer = req.body;
      const result = await preferencesService.updatePreference(customer);
      res.status(200).json(result);
  } catch (error) {
      console.error('Error updating preference:', error);
      res.status(500).json({ error: error });
  }
};

exports.deletePreference = async (req, res) => {
  try {
      const customer = req.body;
      const result = await preferencesService.deletePreference(customer);
      res.status(200).json(result);
  } catch (error) {
      console.error('Error deleting preference:', error);
      res.status(500).json({ error: error });
  }
};