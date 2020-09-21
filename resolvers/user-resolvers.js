const { ObjectId }  = require('mongodb');

module.exports = {
  // Gets the user
  getUser: async (_parent, { _id }, _context) => {

    // if (_id) _id = ObjectId(_id);
     if (_parent && _parent.creator) _id = _parent.creator

     console.log(_id);


    const user = await _context.db
      .collection('users')
      .find({"_id": ObjectId(_id)}).toArray()

    console.log(user);

    return user[0];
  },
  // Gets all the users
  getUsers: (_, __, _context) => _context.db
    .collection('users')
    .find({}).toArray(),
  //Gets the user by the Blog Post
  getUserByBlogPost: (post, args) => {
    //User.findById(car.seller)

  },
  // for relationship
  createUser: (_, args) => {
    return {}
  }
}
