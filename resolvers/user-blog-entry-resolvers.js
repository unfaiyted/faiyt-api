const { ObjectId }  = require('mongodb');
const {tryFn} = require("../utils/utils");

module.exports = {
  // Gets the user
  getPost:  async (_, { _id }, _context) => {

    const data = await _context.db
      .collection('userBlogEntry')
      .find({"_id": ObjectId(_id)}).toArray();

    console.log(data);

    return data[0];
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
