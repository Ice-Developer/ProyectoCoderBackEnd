import { Router } from 'express';

const router = Router();

router.get('/error', (req, res) => {
    res.render('error', {error: "No se pudo autenticar el usuario usando GitHub"})
});



export default router;