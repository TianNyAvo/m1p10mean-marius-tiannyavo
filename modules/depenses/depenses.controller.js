var depenseService = require('./depenses.service');

exports.insertDepense = async (req, res) => {
  try {
      const depense = req.body;
      const result = await depenseService.insertDepense(depense);
      res.status(200).json(result);
  } catch (error) {
      console.error('Error inserting depense:', error);
      res.status(500).json({ error: error });
  }
},

exports.getDepenseList = async (req, res) => {
  try {
      const result = await depenseService.getDepenseList(req);
      res.status(200).json(result);
  } catch (error) {
      console.error('Error getting depenses:', error);
      res.status(500).json({ error: error });
  }
};

exports.getDepenseById = async (req, res) => {
  try {
      const depense = req.body;
      const result = await depenseService.getDepenseById(depense);
      res.status(200).json(result);
  } catch (error) {
      console.error('Error getting depense by id:', error);
      res.status(500).json({ error: error });
  }
};

exports.updateDepense = async (req, res) => {
  try {
      const depense = req.body;
      const result = await depenseService.updateDepense(depense);
      res.status(200).json(result);
  } catch (error) {
      console.error('Error updating depense:', error);
      res.status(500).json({ error: error });
  }
};