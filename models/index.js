const User = require('./User'); // import the User model
const Post = require('./Post'); // import the User model

// associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
})



// export models as an object
module.exports = { User, Post }; 