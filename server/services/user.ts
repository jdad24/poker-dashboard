import { User } from "../models/index.ts";
import type { User as UserType } from "../../types/index.ts";

export const registerUserService = async (email: string, password: string): Promise<any> => {
    try {
        const existingUser = await User.findUserByEmail(email)
        if(existingUser) return {success: false, message: 'user account already exists'}

        const response = await User.createUser(email, password)
        if (response.success) return { success: true, message: 'user added successfully' }
        return { success: false, message: 'error adding user' }
    } catch (e) {
        console.error(e)
        return { success: false, message: e }
    }
}

export const deleteUserService = async (email: string): Promise<any> => {
    try {
        const response = await User.deleteUser(email)
        if (response.sucess) return { success: true, message: 'user account deleted successfully' }
        return { success: false, message: 'error deleting user account' }
    } catch (e) {
        console.error(e)
        return { success: false, message: 'error deleting user' }
    }
}

export const findUserByEmailService = async (email: string): Promise<UserType | null> => {
    try {
        const user = await User.findUserByEmail(email) as UserType
        if (user) return user
        return null
    } catch (e) {
        console.error(e)
        return null
    }
}

export const checkPasswordService = async (email: string, password: string): Promise<any> => {
    try {
        const isValid = await User.checkPassword(email, password)
        if (isValid) return true
    } catch (e) {
        console.error(e)
    }
}