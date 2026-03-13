import pool from "../db/index.ts";
import bcrypt from 'bcrypt'

export const addUser = async (email: string, password: string): Promise<any> => {
    const hashedPassword = await bcrypt.hash(password, 10)

    const query = `
    INSERT INTO users (email, password_hash) 
    VALUES ($1, $2)
    RETURNING *
    `
    try {
        await pool.query(query, [email, hashedPassword])
        return { success: true, message: 'user added successfully' }
    } catch (e) {
        console.error(e)
        return { success: false, message: 'error adding user' }
    }
}

export const deleteUser = async (email: string, password: string): Promise<any> => {
    const query = `
    DELETE FROM users
    WHERE email = $1
    RETURNING *
    `
    try {
        await pool.query(query, [email])
        return { success: true, message: 'user deleted successfully' }
    } catch (e) {
        console.error(e)
        return { success: false, message: 'error deleting user' }
    }
}

export const checkIfUserExists = async (email: string): Promise<boolean> => {
    const query = `
    SELECT *
    FROM users
    WHERE email = $1
    RETURNING *
    `
    try {
        const result = await pool.query(query, [email])
        return result.rows.length == 0 ? false : true
    } catch (e) {
        console.error(e)
        return false
    }
}

export const checkPassword = async (email: string, password: string): Promise<any> => {
    const query = `
    SELECT password_hash
    FROM users
    WHERE email = $1
    LIMIT 1
    `

    try {
        const result = await pool.query(query, [email])
        const dbPasswordHash = result.rows[0].password_hash

        const isMatch = await bcrypt.compare(password, dbPasswordHash)

        if (isMatch) {
            return true
        }

        return false
    } catch (e) {
        console.error(e)
    }

    return false
}