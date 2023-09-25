import { Router } from 'express';
import userModel from '../../models/userModel.js';
import { createHash } from '../../utils.js';
import UserService from '../../services/user.services.js';


const router = Router();

//Registramos al usuario en la base de datos MongoDB

router.post("/register",async (req, res) => {
    const { first_name, last_name, email, age, password} = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
        return res.status(400).send({ status: 'error', message: 'usuario ya existe' })
    };

    const user = {
        first_name,
        last_name,
        email,
        age,
        password: createHash(password)
    };

    const result = await userModel.create(user);

    res.send({ status: "200", message: "Usuario creado con exito con ID: " + result.id });
});

export default router;