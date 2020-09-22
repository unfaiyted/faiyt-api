const { gql } = require('apollo-server');
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
module.exports = gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
    scalar Date

    type User {
        _id: ID!
        username: String!
        firstName: String!
        lastName: String!
        gitHub: String
        bio: String
        dateCreated: Date!
        dateLastLogin: Date!
        blogPosts: [UserBlogEntry]
    }

    type UserBlogEntry {
        _id: ID!
        creator: User!
        dateCreated: String!
        content: String!
        isPrivate: Boolean!
    }


    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "user" query returns an array of zero or more Users (defined above).
    type Query {
        me: User,
        getUser(_id: ID): User
        getUsers(_id: ID, username: String): [User]!
        getBlogPost(_id: ID!): UserBlogEntry
        getBlogPosts: [UserBlogEntry]!
        getBlogPostsByUser(creator: ID!): [UserBlogEntry]
        ping: String @deprecated(reason: "Because Reason")
    }

    type Mutation {
        login(username: String): String
        deleteBlogEntry(_id: ID!): BlogUpdateResponse!
        createBlogentry(_id: ID!): BlogUpdateResponse!
    }


    type BlogUpdateResponse {
        success: Boolean!
        message: String
        entries: [UserBlogEntry]
    }

`;
