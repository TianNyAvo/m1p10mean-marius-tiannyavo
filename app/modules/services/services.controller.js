var servicesServices = require('./services.services');

exports.insertService = async (req, res) => {
  try {
      const customer = req.body;
      const result = await servicesServices.insertService(customer);
      res.status(200).json(result);
  } catch (error) {
      console.error('Error inserting service:', error);
      res.status(500).json({ error: error });
  }
}

exports.listServices = async (req, res) => {
  try {
      const result = await servicesServices.listServices(req);
      res.status(200).json(result);
  } catch (error) {
      console.error('Error getting services:', error);
      res.status(500).json({ error: error });
  }
}

exports.getServiceById = async (req, res) => {
  try {
      const user = req.body;
      const result = await servicesServices.getServiceById(user);
      res.status(200).json(result);
  } catch (error) {
      console.error('Error getting service by id:', error);
      res.status(500).json({ error: error });
  }
};

exports.updateService = async (req, res) => {
  try {
      const customer = req.body;
      const result = await servicesServices.updateService(customer);
      res.status(200).json(result);
  } catch (error) {
      console.error('Error updating service:', error);
      res.status(500).json({ error: error });
  }
};

exports.deleteService = async (req, res) => {
  try {
      const customer = req.body;
      const result = await servicesServices.deleteService(customer);
      res.status(200).json(result);
  } catch (error) {
      console.error('Error deleting service:', error);
      res.status(500).json({ error: error });
  }
};