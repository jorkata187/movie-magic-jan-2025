import { Router } from 'express';
import movieService from '../services/movie-service.js';

const router = Router();

router.get('/', async (req, res) => {
    const movies = await movieService.getAll();
    
    res.render('home', { movies });
});

router.get('/about', (req, res) => {
    res.render('about');
});

export default router;