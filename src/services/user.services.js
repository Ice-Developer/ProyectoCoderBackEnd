import userModel from "../models/userModel.js";

export default class UserService {
    constructor() {
        console.log("Calling constructor of UserService");
    };

    getAll = async () => {
        let users = await userModel.find();
        return users.map(user => user.toObject());
    };

    save = async (user) => {
        let result = await userModel.create(user);
        return result
    };

    findByUsername = async (userName) => {
        let result = await userModel.findOne({ email: userName });
        return result;
    };

    update = async (filter, value) => {
        let result = await userModel.updateOne(filter, value);
        return result;
    };
}