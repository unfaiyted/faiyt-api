const { ObjectId }  = require('mongodb');
const {tryFn} = require("../utils/utils");

module.exports = {
  // Gets the user
  getPost: (_, { _id }, _context) => {
    if (_args._id) _args._id = ObjectId(_args._id)
    return  _context.db
      .collection('userBlogEntry')
      .find(_args).toArray();
  },
  // Gets all the users
  getPosts: async (_, __, _context) => await _context.db
    .collection('userBlogEntry')
    .find().toArray(),
  //Gets the user by the Blog Post
  getPostsByUser: async (_parent, {creator}, _context) => {

    // Sets creator Id, or grabs creator argument.
    creator = tryFn(() => _parent._id, creator)

    const data =  await _context.db
      .collection('userBlogEntry')
      .find({creator: ObjectId(creator)}).toArray();

    return data;

  }, // for relationship
  createUser: (_, args) => {
    return {}
  }
};
