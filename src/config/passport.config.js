import passport from "passport";
import passportLocal from "passport-local";
import GitHubStrategy from "passport-github2";
import userModel from "../models/userModel.js";
import { createHash, isValidPassword } from "../utils.js";

//Declaramos la estrategia a utilizar
const localStrategy = passportLocal.Strategy;

const initializePassport = () => {   
    //Register
    passport.use('register', new localStrategy(
        { passReqToCallback: true, usernameField: 'email'},
        async (req, username, password, done) => {
            const { first_name, last_name, email, age} = req.body;
            try {
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
                }
                const result = await userModel.create(user);
                return done(null, result);
            } catch (error) {
                return done("Error registrando al usuario" + error);
            }
        }
        )
    )

    //Login
    passport.use('login', new localStrategy(
    { passReqToCallback: true, usernameField: 'email'},
        async (req, username, password, done) => {
            try {
                const user = await userModel.findOne({ email:username });
                if (!user) {
                    return done(null, false, { message: 'Usuario no encontrado' });
                };
                if (!isValidPassword(user, password)) {
                    return done(null, false, { message: 'Contraseña incorrecta' });
                };
                return done(null, user);
                                
            } catch (error) {
                return done("Error logueando al usuario" + error);
            }
        }
    )
    )

    //Github Strategy
    passport.use('github',new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
            const user = await userModel.findOne({ email: profile._json.email});
            console.log("Usuario encontrado " + user);
            if (!user) {
                const newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    email: profile._json.email,
                    age: "",
                    password: "",
                    logedBy: "GitHub"
                    }
                const result = await userModel.create(newUser);
                return done(null, result);
            }else{
                return done(null, user);
            }

        } catch (error) {
            return done("Error registrando al usuario" + error);
        }
    
    }
    )
    )

    //funciones de serializacion y deserializacion
    passport.serializeUser((user, done) => {
        done(null, user._id);
    })

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id);
            done(null, user);
        } catch (error) {
            console.error("Error deserializando al usuario" + error);
        }
    })

}



export default initializePassport;