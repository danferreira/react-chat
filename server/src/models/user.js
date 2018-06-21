import bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Invalid e-mail address',
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [6, 255],
                    msg: 'The password must be greater than 6 characters',
                },
            },
        },
    }, {
        tableName: 'users',
        hooks: {
            beforeCreate: async (user) => {
                // eslint-disable-next-line no-param-reassign
                user.password = await bcrypt.hash(user.password, 12);
            },
        },
    });

    User.prototype.comparePassword = function compare(password) {
        return bcrypt.compare(password, this.dataValues.password);
    };

    User.associate = (models) => {
        User.belongsToMany(User, {
            as: 'Contacts',
            through: 'userContacts',
            foreignKey: {
                name: 'userId',
                field: 'user_id',
            },
        });

        User.hasMany(models.Message, {
            foreignKey: 'senderId',
            field: 'sender_id',
        });

        User.hasMany(models.Message, {
            foreignKey: 'receiverId',
            field: 'receiver_id',
        });
    };

    return User;
};
