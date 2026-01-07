import express from 'express';
import {paginaInicio, paginaJuegos, paginaNosotros, paginaNoticias,paginaJuegosIndividuales,paginaNoticiasIndividuales,paginaValoracion,guardarValoracion} from "../controllers/paginaController.js";

const router  = express.Router();

router.get('/', paginaInicio);

router.get('/nuestrogrupo', paginaNosotros);

router.get('/juegos', paginaJuegos);

router.get('/juegos/:slug', paginaJuegosIndividuales);

router.get('/noticias', paginaNoticias);

router.get('/noticias/:slug', paginaNoticiasIndividuales);

router.get('/valoracion/:slug', paginaValoracion);

router.post('/valoracion', guardarValoracion);

export default router;