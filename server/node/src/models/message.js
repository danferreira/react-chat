export default (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        tableName: 'messages',
    });

    return Message;
};
