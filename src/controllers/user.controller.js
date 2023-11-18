import {userService} from '../services/factory.js';

/* const services = new userService(); */

// controller registro por formulario
export  const  registerController = async (req, res) => {
    const { first_name, last_name, email, age, password} = req.body;
    const user = {
        first_name,
        last_name,
        email,
        age,
        password 
    };
    const result = await userService.save(user, res);
    if (result) {
        req.logger.info("Usuario logueado con exito")
        return res.send({ status: "200", message: "Usuario creado con exito con ID: " + result.id});
    }else{
        req.logger.error("Se intenta crear un usuario con email ya registrado en DB")
        return res.status(401).send({ message: "Email ya registrado en la DB" });
    }
};

//controler login
export const loginController = async (req, res) => {
        const { email, password } = req.body;
        const user = await userService.login(email, password, res);
        if (user) {
            req.logger.info("Usuario logueado con exito")
            return res.status(200).send({ message: "Usuario valido" }); 
        }else{
            req.logger.error("Usuario no valido, Username o Password incorrecto")
            return res.status(401).send({ message: "Usuario no valido" });
        }
        
};

export const logAuthenticate = async (req, res) => {
    let page = parseInt(req.query.page);
    if(req.user.role === 'admin'){
        await userService.loginAdmin(req, res)
    }else{
        if (!page) page = 1;
        await userService.loginShowProducts(page, req, res)
    }
};

//controler login github
export const gitHubCallbackController = async (req, res) => {
    const user = req.user;
    await userService.gitHubLogin(user, res);
}

//controler logout
export const logoutController = async (req, res) => {
    await userService.logout('jwtCookieToken', res);   
}
