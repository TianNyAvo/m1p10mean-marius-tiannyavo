const { MongoClient } = require('mongodb');

async function connectToDatabase() {
    try {
        const client = await MongoClient.connect("mongodb://localhost:27017", {
            useUnifiedTopology: true
        });
        const db = client.db('cruding');
        console.log('Connected to Database');
        return { client, db};
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}

exports.connectToDatabase = connectToDatabase;