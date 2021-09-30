import User from "../models/User.js";

export const authUser = async (req, res) => {
    console.log(req.body);
    res.status(200).send("hello");
}