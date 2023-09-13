import { response } from "express";
import { pool } from "../db.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signIn = async (req, res) => {
    try {
        const {username, password } = req.body

        const [results] = await pool.query('SELECT * FROM users WHERE username = ?', [username])

        console.log(results[0].password, password)

        const userPassword = results[0].password
        const userId = results[0].id

        const [results2] = await pool.query('SELECT role_id FROM `user_roles`WHERE user_id = ?', [userId])

       

        const validPassword = await bcrypt.compare(password, userPassword)

        const roles = []

        if(results2[0].role_id == 3){
            roles.push("ROLE_ADMIN")
        } else {
            roles.push("ROLE_USER")
        }

        console.log(roles)

        console.log(validPassword)

        if(validPassword) {
            const accessToken = jwt.sign( {id: results[0].id, username: results[0].username }, 'nintendo', {
                expiresIn: "1h",
            })
            res.status(200).json({ message: 'Login successful', accessToken, roles});
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}