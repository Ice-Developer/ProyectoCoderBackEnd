import { Router } from 'express';
import userModel from '../../models/user.Model.js';

const router = Router();

//Registramos al usuario en la base de datos MongoDB
router.post("/register", async (req, res) => {
    const { first_name, last_name, email, age, password} = req.body;
    console.log("Registrando user");
    console.log(req.body);

    const exists = await userModel.findOne({ email })
    if (exists) {
        return res.status(400).send({ status: 'error', message: 'usuario ya existe' })
    }
    const user = {
        first_name,
        last_name,
        email,
        age,
        password// se ecripta despues
    }
    const result = await userModel.create(user);
    res.send({ status: "200", message: "Usuario creado con exito con ID: " + result.id })
});


//Nos logueamos verificando el usuario en MongoDB
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password })//Ya que el password no está hasheado, podemos buscarlo directamente

    if (!user) return res.status(401).send({ status: "error", error: "Incorrect credentials" })
    email ==='adminCoder@coder.com.ar'?  
    // damos de alta la session
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        password: user.password,
        age: user.age,
        userType: "admin"
    }
    : req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        userType: "user"
    };
    console.log(req.session.user);
    res.send({ status: "success",  payload: req.session.user,  message: "¡Primer logueo realizado! :)" });
});


//Cerramos la sesion
router.get("/logout", (req, res) => {
    req.session.destroy(error => {
        if (error){
            res.json({error: "error logout", mensaje: "Error al cerrar la sesión"});
        } else {
            res.sendStatus(200); // Envía un código de estado 200 (OK) si se cierra la sesión correctamente.
        }
    });
});

export default router;