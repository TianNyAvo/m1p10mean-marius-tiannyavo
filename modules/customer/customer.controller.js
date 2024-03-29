var customerServices = require('./customer.services');

exports.insertCustomer = async (req, res) => {
    try {
        const customer = req.body;
        const result = await customerServices.insertCustomer(customer);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error inserting customer:', error);
        res.status(500).json({ error: error });
    }
}

exports.getCustomers = async (req, res) => {
    try {
        const result = await customerServices.getCustomers(req);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error getting customers:', error);
        res.status(500).json({ error: error });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = req.query;
        const result = await customerServices.getUserById(user);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error getting user by id:', error);
        res.status(500).json({ error: error });
    }
};

exports.getEmployeList = async (req, res) => {
    try {
        const result = await customerServices.getEmployeList(req);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error getting employe list:', error);
        res.status(500).json({ error: error });
    }
};

exports.updateCustomer = async (req, res) => {
    try {
        const customer = req.body;
        const result = await customerServices.updateCustomer(customer);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ error: error });
    }
}

exports.deleteCustomer = async (req, res) => {
    try {
        const customer = req.body;
        const result = await customerServices.deleteCustomer(customer);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ error: error });
    }
}

exports.loginCustomer = async (req, res) => {
    try {
        const customer = req.body;
        const result = await customerServices.loginCustomer(customer);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error logging in customer:', error);
        res.status(500).json({ error: error });
    }
}
