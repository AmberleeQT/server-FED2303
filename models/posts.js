const { DataTypes } = require("sequelize");
const db = require("../db");

// create relationship between posts and users
const User = require('./users')
// one-to-many relationship. One user may have many posts

const Post = db.sequelize.define(
    'Posts',
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
        },
        last_modified: {
            type: DataTypes.DATE,
        },
    },
    {
        timestamps: true,
        updatedAt: "last_modified",
        createdAt: "created_at",
    }
)

User.hasMany(Post, {
    foreignKey:'user_id',
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
})
// primaryKey - unique record in that table
// foreignKey - connects this record to another record in a different table

module.exports=Post;
// export so this can be loaded in our database