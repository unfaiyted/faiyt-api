require('dotenv').config() // Need to get database info from environment
const { ApolloServer, gql } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');
const { MongoClient }  = require('mongodb');


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.

  type User {
      id: ID!
      firstName: String!
      lastName: String!
      blog: String
      stars: Int
  }
  

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "user" query returns an array of zero or more Users (defined above).
  type Query {
      users: [User]!
  }
  
`;





/**
 *
 * @type {{Query: {users(*, *, *, *): *}}}
 */
const resolvers = {
  Query: {
    users(_parent, _args, _context, _info) {
      return _context.db
        .collection('users')
        .findOne()
        .then((data) => {
          return data.users
        })
    },
  },
}



const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})


let db;

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({

  schema,
  context: async () => {
    if (!db) {
      try {

        const { MONGODB_PASS, MONGODB_USER,MONGODB_CONN_STRING} = process.env;

        console.log(process.env)

        const connStr = `mongodb+srv://${MONGODB_USER}:${encodeURIComponent(MONGODB_PASS)}@${MONGODB_CONN_STRING}`;

        const dbClient = new MongoClient(
          connStr,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }
        )

        if (!dbClient.isConnected()) await dbClient.connect()
        db = dbClient.db('next-graphql') // database name
      } catch (e) {
        console.log('--->error while connecting with graphql context (db)', e)
      }
    }

    return { db }
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
