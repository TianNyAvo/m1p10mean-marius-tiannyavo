var databaseServices = require('./database.service');

exports.getCA = async (req, res) => {
  try {
    const result = await databaseServices.getCA(req);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error getting CA:', error);
    res.status(500).json({ error: error });
  }
};

exports.getCAJour = async (req, res) => {
  try {
    const result = await databaseServices.getCAJour(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error getting CA by month:', error);
    res.status(500).json({ error: error });
  }
};

exports.getEmpAvg = async (req, res) => {
  try {
    const result = await databaseServices.getEmpAvg(req);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error getting employe average:', error);
    res.status(500).json({ error: error });
  }
};

exports.getdepenseMois = async (req, res) => {
  try {
    const result = await databaseServices.getdepenseMois();
    res.status(200).json(result);
  } catch (error) {
    console.error('Error getting depense by month:', error);
    res.status(500).json({ error: error });
  }
}