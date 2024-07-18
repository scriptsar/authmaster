

import { findUserById } from "../API/users/user.js";
import jwt from 'jsonwebtoken'
import { config } from "dotenv";
config();
console.log(process.env.ACCESS_TOKEN_SECRET)
export const verifyToken = async (req, res, next) => {
    try {

        const authHeader = req.headers['authorization'];


        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header missing' });

        }


        console.log('auth header:', authHeader)
        if (!authHeader) {
            console.log('header is miss')

        }
        const token = authHeader.split(' ')[1];
        // add validattoion lateer
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await findUserById(decodedToken.id)
        console.log('the user in middleware', user)
        req.user = user
        next()

    } catch (error) {
        console.log('the error is', error)

    }
}