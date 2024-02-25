const { MongoClient } = require('mongodb');

async function connectToDatabase() {
    try {
        const client = await MongoClient.connect("mongodb+srv://tandriatoavina:mongopass1623@tiancluster.1h72rz3.mongodb.net/?retryWrites=true&w=majority&appName=TianCluster", {
            useUnifiedTopology: true
        });
        const db = client.db('salon');
        console.log('Connected to Database');
        return { client, db};
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}

exports.connectToDatabase = connectToDatabase;