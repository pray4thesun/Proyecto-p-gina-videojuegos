import Sequelize from "sequelize";
import db from "../config/db.js";

const Juego = db.define("juegos", {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: Sequelize.STRING
    },
    fecha_salida: {
        type: Sequelize.DATE
    },
    consola: {
        type: Sequelize.STRING
    },
    tipo_juego: {
        type: Sequelize.STRING
    },
    precio: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
    },
    imagen: {
        type: Sequelize.STRING
    },
    slug: {
        type: Sequelize.STRING
    }
}, {
    tableName: "juegos",
    freezeTableName: true,
    timestamps: false
});

export default Juego;
