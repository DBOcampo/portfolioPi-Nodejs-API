import { response } from "express";
import { pool } from "../db.js";
import bcrypt from "bcrypt"

export const signUp = async (req, res) => {
    try {
        const {username, email, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 10)

        const [results] = await pool.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hashedPassword, email])

        id = results.insertId;

        const [results2] = await pool.query('INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)', [id, 1])

    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
}