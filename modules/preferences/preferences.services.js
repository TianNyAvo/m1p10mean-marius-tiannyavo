var dbServices = require('../database/database.service');
var mongodb = require('mongodb');

exports.insertPreference = async (pref) => {
  const {db, client} = await dbServices.connectToDatabase();

  pref.user_id = new mongodb.ObjectId(pref.user_id);
  pref.service_id = new mongodb.ObjectId(pref.service_id);
  pref.employe_id = new mongodb.ObjectId(pref.employe_id);

  const collection = db.collection('preferences');
  try {
    const result = await collection.insertOne(pref);
    console.log('Inserted preference:', result);
    client.close();
    return result.ops[0];
  } catch (error) {
    console.error('Error inserting preference:', error);
    return { error: error };
  }
  
}

exports.listPreferences = async (req) => {
  // const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  // const pageSize = parseInt(req.query.pageSize) || 10; // Default to 10 items per page if not provided
  // const skip = (page - 1) * pageSize;

  const user_id = req.body.user_id;
  console.log('user_id:', user_id);

  const {db, client} = await dbServices.connectToDatabase();
  const collection = db.collection('preferences');
  try {
    const resultPromise = await collection
      .aggregate([
        {
            $match: {
                user_id: new mongodb.ObjectId(user_id)
            }
        },
        {
            $lookup: {
                from: 'customers',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user_data'
            }
        },
        {
            $lookup: {
                from: 'customers',
                localField: 'employe_id',
                foreignField: '_id',
                as: 'employe_data'
            }
        },
        {
            $lookup: {
                from: 'services',
                localField: 'service_id',
                foreignField: '_id',
                as: 'service_data'
            }
        }
    ])
    .toArray();
    const result = resultPromise;
    console.log('Found preferences:', result);
    client.close();
    return result;
  } catch (error) {
    console.error('Error getting preferences:', error);
    return { error: error };
  }
};

exports.getPreferenceById = async (pref) => {
  const _id = pref._id;
  const {db, client} = await dbServices.connectToDatabase();
  const collection = db.collection('preferences');
  try {
  const resultPromise = await collection
      .aggregate([
        {
            $match: {
                _id: new mongodb.ObjectId(_id)
            }
        },
        {
            $lookup: {
                from: 'customers',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user_data'
            }
        },
        {
            $lookup: {
                from: 'customers',
                localField: 'employe_id',
                foreignField: '_id',
                as: 'employe_data'
            }
        },
        {
            $lookup: {
                from: 'services',
                localField: 'service_id',
                foreignField: '_id',
                as: 'service_data'
            }
        }
    ])
    .toArray();
    const result = resultPromise;
    console.log('Found preferences:', result);
    client.close();
    return result;
  } catch (error) {
    console.error('Error getting preferences:', error);
    return { error: error };
  }

};

exports.updatePreference = async (pref) => {
  const {db, client} = await dbServices.connectToDatabase();
  console.log('Updating preference:', pref);
  const collection = db.collection('preferences');
   try {
    const result = await collection.findOneAndUpdate(
       { 
           _id: new mongodb.ObjectId(pref._id)
       },
       { 
           $set: {
               user_id: pref.user_id,
               service_id: pref.service_id,
               employe_id: pref.employe_id
           }
       }
   )
   client.close();
   return result;
   } catch (error) {
        return { error: error };
   }
}

exports.deletePreference = async (pref) => {
  const {db, client} = await dbServices.connectToDatabase();
  const collection = db.collection('preferences');
  const result = await collection.deleteOne({ _id: new mongodb.ObjectId(pref._id) });
  console.log('Deleted preference:', result);
  client.close();
  return result;
}