const { MongoClient } = require('mongodb');
const mongodb = require('mongodb')
const { mongo } = require('mongoose');
var dbServices = require('./database.service');

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

async function createAppointmentView() {
    const client = await MongoClient.connect("mongodb+srv://tandriatoavina:mongopass1623@tiancluster.1h72rz3.mongodb.net/salon?retryWrites=true&w=majority&appName=TianCluster", {
            useUnifiedTopology: true
        });
        const database = client.db();
  
    try {
        
      const viewName = 'appointment_view';
  
      // Vérifier si la vue existe déjà
      const collections = await database.listCollections().toArray();
      const viewExists = collections.some(collection => collection.name === viewName);
  
      if (!viewExists) {
       /*  const viewPipeline = [
            {
              $lookup: {
                from: 'detail_appointments',
                localField: '_id',
                foreignField: 'id_appointment',
                as: 'details',
              },
            },
            {
              $group: {
                _id: '$_id',
                is_finished: { $first: '$is_finished' },
                id_user: { $first: '$id_user' },
                date_appointment: { $first: '$date_appointment' },
                date_insertion: { $first: '$date_insertion' },
                prix_total: { $sum: '$details.prix_final' },
              },
            },
          ]; */
          const viewPipeline = [
            {
              $lookup: {
                from: 'detail_appointments',
                localField: '_id',
                foreignField: 'id_appointment',
                as: 'details',
              },
            },
            {
              $group: {
                _id: '$_id',
                prix_total: {
                  $sum: {
                    $cond: {
                      if: { $isArray: '$details' },
                      then: { $sum: '$details.prix_final' },
                      else: 0,
                    },
                  },
                },
                // Autres champs que vous souhaitez conserver dans le résultat
                is_finished: { $first: '$is_finished' },
                id_user: { $first: '$id_user' },
                date_appointment: { $first: '$date_appointment' },
                date_insertion: { $first: '$date_insertion' },
                __v: { $first: '$__v' },
              },
            },
          ];
          
          
          console.log('Aggregation Pipeline:');
          console.log(viewPipeline);
  
        const result = await database.createCollection(viewName, {
          viewOn: 'appointments',
          pipeline: viewPipeline,
        });
        
        /* const resultLookup = await database.collection('appointments').aggregate(viewPipeline[0].$lookup).toArray();
        console.log('Résultat du $lookup :', resultLookup);
        
        const resultGroup = await database.collection('appointments').aggregate(viewPipeline[1].$group).toArray();
        console.log('Résultat du $group :', resultGroup);

        const detailAppointments = await database.collection('detail_appointments').find({ id_appointment: new mongodb.ObjectId("65df2d7bbc7afd6cef856053") }).toArray();
console.log('Détails de la collection detail_appointments :', detailAppointments);
  
console.log('Details après $lookup :', resultLookup[0].details); */

        console.log('View created successfully');
      } else {
        console.log('View already exists, skipping creation');
      }
    }
    catch (error) {
      console.error('Error creating view:', error);
      throw error;
    }
     finally {
      await client.close();
      console.log('Connection closed');
    }
};

async function createempAvgView() {
    const client = await MongoClient.connect("mongodb+srv://tandriatoavina:mongopass1623@tiancluster.1h72rz3.mongodb.net/salon?retryWrites=true&w=majority&appName=TianCluster", {
            useUnifiedTopology: true
        });
        const database = client.db();
  
    try {
        
      const viewName = 'emp_avg_view';
  
      // Vérifier si la vue existe déjà
      const collections = await database.listCollections().toArray();
      const viewExists = collections.some(collection => collection.name === viewName);
  
      if (!viewExists) {
        const pipeline = [
            {
              $lookup: {
                from: 'customers',
                localField: 'id_employe',
                foreignField: '_id',
                as: 'employee',
              },
            },
            {
              $unwind: '$employee',
            },
            {
              $group: {
                _id: {
                  employeeId: '$id_employe',
                  month: { $month: '$date' },
                  year: { $year: '$date' },
                },
                totalDuration: { $sum: '$duree' },
                totalAppointments: { $sum: 1 },
              },
            },
            {
              $group: {
                _id: '$_id.employeeId',
                monthlyAverages: {
                  $push: {
                    month: '$_id.month',
                    year: '$_id.year',
                    averageDurationPerDay: {
                      $divide: ['$totalDuration', 22],
                    },
                    totalAppointments: '$totalAppointments',
                  },
                },
              },
            },
            {
              $lookup: {
                from: 'customers',
                localField: '_id',
                foreignField: '_id',
                as: 'employeeInfo',
              },
            },
            {
              $unwind: '$employeeInfo',
            },
            {
              $project: {
                _id: 0,
                employeeId: '$_id',
                employeeName: '$employeeInfo.name',
                monthlyAverages: 1,
              },
            },
            {
              $sort: {
                employeeId: 1,
              },
            },
          ];
          
          
          
          console.log('Aggregation Pipeline:');
          console.log(pipeline);
  
        const result = await database.createCollection(viewName, {
          viewOn: 'detail_appointments',
          pipeline: pipeline,
        });
        
        /* const resultLookup = await database.collection('appointments').aggregate(viewPipeline[0].$lookup).toArray();
        console.log('Résultat du $lookup :', resultLookup);
        
        const resultGroup = await database.collection('appointments').aggregate(viewPipeline[1].$group).toArray();
        console.log('Résultat du $group :', resultGroup);

        const detailAppointments = await database.collection('detail_appointments').find({ id_appointment: new mongodb.ObjectId("65df2d7bbc7afd6cef856053") }).toArray();
console.log('Détails de la collection detail_appointments :', detailAppointments);
  
console.log('Details après $lookup :', resultLookup[0].details); */

        console.log('View created successfully');
      } else {
        console.log('View already exists, skipping creation');
      }
    }
    catch (error) {
      console.error('Error creating view:', error);
      throw error;
    }
     finally {
      await client.close();
      console.log('Connection closed');
    }
};
  
  // Appel de la fonction pour créer la vue
exports.createAppointmentView/* .catch(console.error) */ = createAppointmentView;
exports.createempAvgView= createempAvgView;

exports.connectToDatabase = connectToDatabase;

// statistics

exports.getCA = async () => {
    const client = await MongoClient.connect("mongodb+srv://tandriatoavina:mongopass1623@tiancluster.1h72rz3.mongodb.net/salon?retryWrites=true&w=majority&appName=TianCluster", {
            useUnifiedTopology: true
        });
        const database = client.db();
    const monthlyTotalPipeline = [
        {
          $group: {
            _id: {
                month: { $month: '$date_appointment' },
                year: { $year: '$date_appointment' },
            },
            CaTotal: { $sum: '$prix_total' },
          },
        },
      ];
    
      const monthlyTotals = await database.collection('appointment_view').aggregate(monthlyTotalPipeline).toArray();
      console.log('Totals par mois :', monthlyTotals);
      return monthlyTotals;
};

exports.getCAJour = async (month) => {
    const mois = month.month;
    const client = await MongoClient.connect("mongodb+srv://tandriatoavina:mongopass1623@tiancluster.1h72rz3.mongodb.net/salon?retryWrites=true&w=majority&appName=TianCluster", {
            useUnifiedTopology: true
        });
        const database = client.db();
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 2;
        console.log('Current Year:', currentYear);
/* console.log('Current Month:', currentMonth);
console.log('Filter Dates:', {
  $gte: new Date(Date.UTC(currentYear, mois-1, 1)),
  $lt: new Date(Date.UTC(currentYear, mois, 1)),
});
const startDate = new Date(Date.UTC(2024, 2, 1));
const endDate = new Date(Date.UTC(2024, 3, 1)); */

/* const sampleAppointments = await database.collection('appointments')
  .find({
    date_appointment: {
      $gte: startDate,
      $lt: endDate,
    },
  })
  .toArray();

console.log('Sample Appointments:', sampleAppointments); */


        const dailyTotalPipeline = [
            {
              $match: {
                date_appointment: {
                  $gte: new Date(Date.UTC(currentYear, mois-1, 1)),
                  $lt: new Date(Date.UTC(currentYear, mois, 1)),
                },
              },
            },
            {
              $group: {
                _id: {
                  day: { $dayOfMonth: '$date_appointment' },
                  month: { $month: '$date_appointment' },
                  year: { $year: '$date_appointment' },
                },
                CaTotal: { $sum: '$prix_total' },
              },
            },
          ];
    
      const monthlyTotals = await database.collection('appointment_view').aggregate(dailyTotalPipeline).toArray();
      console.log('Totals par mois :', monthlyTotals);
      return monthlyTotals;
};

exports.getEmpAvg = async () => {
    const {db, client} = await dbServices.connectToDatabase();
    const collection = db.collection('emp_avg_view');
    try {
        const resultPromise = await collection.find().toArray();
        const result = await resultPromise;
        // console.log('Found customers:', result);
        client.close();
        return result;
    } catch (error) {
        console.error('Error getting avg:', error);
        return { error: error };
    }
};

exports.getdepenseMois = async () => {
  const client = await MongoClient.connect("mongodb+srv://tandriatoavina:mongopass1623@tiancluster.1h72rz3.mongodb.net/salon?retryWrites=true&w=majority&appName=TianCluster", {
          useUnifiedTopology: true
      });
      const database = client.db();
  const monthlyTotalPipeline = [
      {
        $group: {
          _id: {
            month: { $month: '$date' },
            year: { $year: '$date' },
          },
          totalMontant: { $sum: '$montant' },
        },
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1,
        },
      },
    ];
  
    const monthlyTotals = await database.collection('depenses').aggregate(monthlyTotalPipeline).toArray();
    console.log('Totals par mois :', monthlyTotals);
    return monthlyTotals;
};

// statistics