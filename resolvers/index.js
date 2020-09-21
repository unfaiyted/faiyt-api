const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');


const UserResolvers = require("./user-resolvers");
const UserBlogEntryResolvers = require("./user-blog-entry-resolvers");


module.exports = {
  User: {
    blogPosts: UserBlogEntryResolvers.getPostsByUser,
  },
  UserBlogEntry: {
    creator: UserResolvers.getUser
  },
  Query: {
    getUser: UserResolvers.getUser,
    getUsers: UserResolvers.getUsers,
    getBlogPost: UserBlogEntryResolvers.getPost,
    getBlogPosts: UserBlogEntryResolvers.getPosts,
    getBlogPostsByUser: UserBlogEntryResolvers.getPostsByUser,
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
}


