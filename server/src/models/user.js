import bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
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
            through: 'user_contacts',
            foreignKey: {
                name: 'userId',
                field: 'user_id',
            },
        });

        User.hasMany(models.Message, {
            foreignKey: {
                name: 'senderId',
                field: 'sender_id',
            },
        });

        User.hasMany(models.Message, {
            foreignKey: {
                name: 'receiverId',
                field: 'receiver_id',
            },
        });
    };

    return User;
};
