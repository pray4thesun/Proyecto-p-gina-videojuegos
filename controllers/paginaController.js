import Juego from '../models/Juego.js';
import Noticia from '../models/Noticia.js';
import Valoracion from '../models/Valoracion.js';

const paginaInicio = async (req, res) => {
    //Para ordenar por noticias recientes (3)
    const noticias = await Noticia.findAll({
        limit: 3,
        order: [
            ['fecha_publicacion', 'DESC']
        ]
    });

    res.render('inicio', {
        pagina: 'Pixelzone',
        noticias: noticias,
    });
};


const paginaJuegos = async (req, res) => {
    const juegos = await Juego.findAll();

    res.render('juegos', {
        pagina: 'Juegos',
        juegos
    });
};

const paginaJuegosIndividuales = async (req, res) => {
    const { slug } = req.params;

    try {
        // 1. Buscar el juego por slug
        const resultado = await Juego.findOne({ where: { slug } });

        if (!resultado) {
            return res.redirect('/juegos');
        }

        // 2. Buscar valoraciones por juego_id
        const valoraciones = await Valoracion.findAll({
            where: { juego_id: resultado.id },
            order: [['id', 'DESC']],
            limit: 3
        });

        // 3. Calcular media
        let media = 0;
        if (valoraciones.length > 0) {
            const suma = valoraciones.reduce((acc, v) => acc + v.calificacion, 0);
            media = (suma / valoraciones.length).toFixed(1);
        }

        // 4. Renderizar vista
        res.render('juego', {
            pagina: 'Informacion Juegos',
            resultado,
            valoraciones,
            media
        });

    } catch (error) {
        console.log(error);
    }
};


const paginaNoticias = async (req, res) => {
    const noticias = await Noticia.findAll();

    res.render('noticias', {
        pagina: 'Noticias',
        noticias: noticias,
    });
}

const paginaNoticiasIndividuales = async (req, res) => {
    const {slug} = req.params;

    try{
        const resultadoNoticia = await Noticia.findOne({where: {slug:slug}});
        res.render('noticia', {
            pagina: 'Información Noticia',
            resultadoNoticia: resultadoNoticia,
        })
    } catch(error) {
        console.log(error)
    }
}

const paginaNosotros = (req, res) => {
    res.render('nuestrogrupo', {
        pagina: 'Nosotros',
    });
}

const paginaValoracion = async (req, res) => {
    const { slug } = req.params;

    try {
        const resultadoSlug = await Juego.findOne({ where: { slug } });

        res.render('valoracion', {
            pagina: 'Valoraciones',
            juego: resultadoSlug.titulo,
            slug: slug,
            resultadoSlug: resultadoSlug,
            juego_id: resultadoSlug.id
        });

    } catch (error) {
        console.log(error);
    }
};

const guardarValoracion = async (req, res) => {
    console.log("BODY:", req.body);

    const { nombre_usuario, correo, calificacion, comentario, juego_id, slug } = req.body;
    const errores = [];

    if(nombre_usuario.trim() === ''){
        errores.push('El nombre de usuario está vacío');
    }
    if(correo.trim() === ''){
        errores.push('El correo está vacío');
    }
    if(comentario.trim() === ''){
        errores.push('El comentario está vacío');
    }

    if(errores.length > 0){
        return res.render('valoracion', {
            pagina: 'Valoraciones',
            errores,
            nombre_usuario,
            correo,
            calificacion,
            comentario,
            slug,
            juego_id
        });
    }

    try {
        await Valoracion.create({
            nombre_usuario,
            correo,
            calificacion,
            comentario,
            juego_id
        });

        res.redirect(`/juegos/${slug}`);

    } catch (error) {
        console.log(error);
    }
};




export {
    paginaInicio,
    paginaNosotros,
    paginaJuegos,
    paginaJuegosIndividuales,
    paginaNoticias,
    paginaNoticiasIndividuales,
    paginaValoracion,
    guardarValoracion
}