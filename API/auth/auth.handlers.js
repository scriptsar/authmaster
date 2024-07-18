import { registerUser } from "./auth.js";
import jwt from 'jsonwebtoken'
import { authenticateUser } from '../users/user.js'
export const signup = async (req, res) => {
    console.log('did i comehere')
    try {
        const newUser = await registerUser(req.body)
        res.status(201).json(newUser);
    } catch (error) {

    }
}

export const signin = async (req, res) => {
    try {

        const foundUser = await authenticateUser(req.body);
        console.log('found user:', foundUser)
        if (!foundUser) {
            return res.status(401).json({ 'message': 'Unauthorized user' })

        }
        const accessToken = jwt.sign({ id: foundUser.id, email: foundUser.email, name: foundUser.fullname }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
        const refreshToken = jwt.sign({ id: foundUser.id, email: foundUser.email, name: foundUser.fullname }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
        // foundUser.refreshToken = refreshToken;
        // const result = await foundUser.save();
        const response = { ...foundUser, accessToken, refreshToken }
  
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json(response)
    } catch (error) {
        console.log(error);

    }

}

export const signout = async () => { }