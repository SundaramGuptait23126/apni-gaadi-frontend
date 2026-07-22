const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_URI, {
    dialect: 'mysql',
    logging: false,
    pool: {
        max: 500,
        min: 50,
        acquire: 60000,
        idle: 10000,
        evict: 10000
    },
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL Database Connected Successfully!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
