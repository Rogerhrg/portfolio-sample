import { Router } from "express";

const router = Router();

router.get('/auth/register', (req, res) => {
    console.log('Ruta de registro');
})

export default router;