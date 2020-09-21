const { MongoClient }  = require('mongodb');

module.exports = async () => {
  if (!db) {
    try {

      const { MONGODB_PASS, MONGODB_USER,MONGODB_CONN_STRING} = process.env;

      const connStr = `mongodb+srv://${MONGODB_USER}:${encodeURIComponent(MONGODB_PASS)}@${MONGODB_CONN_STRING}`;

      const dbClient = new MongoClient(
        connStr,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )

      if (!dbClient.isConnected()) await dbClient.connect()
      db = dbClient.db('faiyt-db') // database name

      console.log(db)

    } catch (e) {
      console.log('--->error while connecting with graphql context (db)', e)
    }
  }

  return { db }
};
