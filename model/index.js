const { Sequelize } = require("sequelize")
const { DATABASE, HOST, DB_USER, DB_PASSWORD } = process.env;


const sequelize = new Sequelize(DATABASE, DB_USER, DB_PASSWORD, {
    host: HOST,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }, 
    retry: {
        max: 4
    },
    logging: false
});

const dbConnect = () => {
    sequelize.authenticate()
        .then((result) => {
            console.log("Database Connected Succesfully");
        }).catch((err) => {
            console.log('Error in DB Connection', err);
        });
};

module.exports = { dbConnect, sequelize}