import { pool } from "../../db";
import type { payloadForCreateUser, payloadForUpdateUser } from "./user.interface";
import bcrypt from "bcryptjs"


const createUserIntoApplication = async (payload: payloadForCreateUser) => {
    const { name, email, password, age } = payload;

    const hashPassword = await bcrypt.hash(password, 10)

    const result = await pool.query(`
            INSERT INTO users(name, email, password, age)
            VALUES ($1, $2,$3,$4) RETURNING *
            `, [name, email, hashPassword, age])

    return result
}

const getAllUserFromApplication = async () => {
    const result = await pool.query(`
            SELECT * FROM users
        `)
    return result
}

const getUserFromApplication = async (id: string) => {

    const result = await pool.query(`
        SELECT * FROM users WHERE id=$1
        `, [id])

    return result
}

const updateUserFromApplication = async (id: string, payload: payloadForUpdateUser) => {
    const { name, password, age, is_active } = payload
    const result = await pool.query(`
        UPDATE users
        SET
        name = COALESCE($1, name),
        password = COALESCE($2, password),
        age = COALESCE($3, age),
        is_active = COALESCE($4, is_active),
        updated_at = NOW()

        WHERE id=$5 RETURNING *
        `, [name, password, age, is_active, id])


    return result
}

const deleteUserFromApplication = async (id: string) => {
    const user = await pool.query(`
        SELECT * FROM users WHERE id=$1
        `, [id])
    if (user.rowCount === 0) {
        throw new Error("User not Found!")
    }


    const result = await pool.query(`
        DELETE FROM users WHERE id=$1 RETURNING *
        `, [id])

    return result
}


export const userService = {
    createUserIntoApplication,
    getAllUserFromApplication,
    getUserFromApplication,
    updateUserFromApplication,
    deleteUserFromApplication
}



