import Sequelize from "sequelize";
import db from "../config/db.js";

const Noticia = db.define("noticias", {
    titulo:{
        type: Sequelize.STRING
    },
    contenido:{
        type: Sequelize.TEXT
    },
    fecha_publicacion:{
        type: Sequelize.DATE
    },
    imagen:{
        type: Sequelize.STRING
    },
    slug:{
        type: Sequelize.STRING
    },
});

export default Noticia;