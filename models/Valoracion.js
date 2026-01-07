import Sequelize from "sequelize";
import db from "../config/db.js";

const Valoracion = db.define("valoracion", {
    nombre_usuario:{
        type: Sequelize.STRING
    },
    correo:{
        type: Sequelize.STRING
    },
    juego:{
        type: Sequelize.STRING
    },
    calificacion:{
        type: Sequelize.INTEGER
    },
    comentario:{
        type: Sequelize.STRING
    },
}, {
    tableName: 'valoracion',
    freezeTableName: true,
    timestamps: false
});


export default Valoracion;