const User = require('./User'); // import the User model
const Post = require('./Post'); // import the Post model
const Comment = require('./Comment'); // import the Comment model

// associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});



// export models as an object
module.exports = { User, Post, Comment }; 