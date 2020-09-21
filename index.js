require('dotenv').config() // Need to get database info from environment
const { ApolloServer} = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');
const  context = require("./utils/db");

global.db = null;

const typeDefs = require("./schema");
const resolvers = require("./resolvers/index")

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  schema,
  context
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
