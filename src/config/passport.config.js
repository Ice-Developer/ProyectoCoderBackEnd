import passport from "passport";
import envCongif from "./env.config.js";
import GitHubStrategy from "passport-github2";
import jwtStrategy from "passport-jwt";
import userModel from "../services/dao/mongo/models/userModel.js";
import {PRIVATE_KEY } from "../utils.js";
import { cartService } from "../services/factory.js";


//Declaramos la estrategia a utilizar
const JwtStrategy = jwtStrategy.Strategy;
const ExtractJwt = jwtStrategy.ExtractJwt;

const initializePassport = () => {   
    // JWT Strategy
    passport.use('jwt', new JwtStrategy(
        //objeto de configuracion
        {  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey: PRIVATE_KEY,
        },
        async (jwt_payload, done) => {
            try {
                return done(null, jwt_payload.user);
            } catch (error) {
                console.error(error);
                return done(error);
            }
        }));


    //Github Strategy
    passport.use('github',new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID || envCongif.gitHubClientId,
        clientSecret: process.env.GITHUB_CLIENT_SECRET || envCongif.gitHubClientSecret,
        callbackURL: process.env.GITHUB_CALLBACK_URL || envCongif.gitHubCallbackUrl,
    
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await userModel.findOne({ email: profile._json.email});
            if (!user) {
                const newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    email: profile._json.email,
                    age: "",
                    password: "",
                    logedBy: "GitHub"
                    }
                let result = await userModel.create(newUser);
                
                const userId = result._id.toString()
                const body = {
                    userId,
                    products: [],
                    }
                let cart = await cartService.createCart(body)
                
                result.carts.push({ "cart": cart._id});
                await result.save();
                return done(null, result);
                
                
                
            }else{
                return done(null, user);
            }

        } catch (error) {
            return done("Error registrando al usuario" + error);
        }
    }));

    //funciones de serializacion y deserializacion
    passport.serializeUser((user, done) => {
        const serializedUser = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            };
        done(null, serializedUser);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id);
            done(null, user);
        } catch (error) {
            console.error("Error deserializando al usuario" + error);
        }});

};

const cookieExtractor=(req)=> {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["jwtCookieToken"];
    }
    return token;
};

export default initializePassport;