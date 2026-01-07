import Sequelize from 'sequelize';
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(process.env.CONEXION,{

    define: {
        timestamps: false,
    },
    pool:{
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 30000,
    },
    operatorsAliases: false,
});
export default db;