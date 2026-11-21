import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../../config";

const loginUserIntoDB = async (payload: {
    email: string,
    password: string
}) => {

    // Check if the user exist -> Done
    // Check if the password match -> Done
    //check the user status -> Done
    // If pass all then generate jsw token


    const { email, password } = payload
    const user = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `, [email])



    if (user.rowCount === 0) {
        throw new Error("Invalid credentials, user not found!")
    }
    const matchPassword = await bcrypt.compare(password, user.rows[0].password)
    if (!matchPassword) {
        throw new Error("Invalid credentials, password not match!")
    }

    if (!user.rows[0].is_active) {
        throw new Error("Invalid credentials, Your account blocked!")
    }


    //! Implement JWT

    const jwtPayload = {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        is_active: user.rows[0].is_active,
        role: user.rows[0].role
    }

    const accessToken = jwt.sign(jwtPayload, config.jwt_secret, { expiresIn: "1h" })
    const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret, { expiresIn: "10d" })

    delete user.rows[0].password;
    return { accessToken, refreshToken, user: user.rows[0] }
}

const generatorAccessToken = async (token: string) => {
    if (!token) {
        throw new Error("Unauthorized access!")
    }


    //*2-> Check token ar valid?
    const decoded = jwt.verify(token as string, config.jwt_refresh_secret) as JwtPayload

    const user = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `, [decoded.email])

    //*3-> Check if the User exists?
    if (user.rowCount === 0) {
        throw new Error("Unauthorized access! User not found!")
    }
    //*4-> Check if the User status exists?
    if (!user.rows[0].is_active) {
        throw new Error("Forbidden!!")
    }

     const jwtPayload = {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        is_active: user.rows[0].is_active,
        role: user.rows[0].role
    }

    const accessToken = jwt.sign(jwtPayload, config.jwt_secret, { expiresIn: "1h" })
    return {accessToken};

}

export const authService = {
    loginUserIntoDB,
    generatorAccessToken,
}