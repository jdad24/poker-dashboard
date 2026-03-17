import pool from "../db/index.ts";
import bcrypt from 'bcrypt';
import type { User as UserType } from "../../types/index.ts";

export class User {
    id: number;
    email: string;
    passwordHash: string;
    createdAt: Date;

    constructor(id: number, email: string, passwordHash: string, createdAt: Date) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
        this.createdAt = createdAt;
    }

    static async createUser(email: string, password: string): Promise<any> {
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

    static async deleteUser(email: string, password: string): Promise<any> {
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

    static async findUserByEmail(email: string): Promise<UserType | null> {
        const query = `
        SELECT *
        FROM users
        WHERE email = $1
        RETURNING *
        `
        try {
            const result = await pool.query(query, [email])
            const user = result.rows[0]
            if(user) return user
            return null
        } catch (e) {
            console.error(e)
            return null
        }
    }

    static async checkPassword(email: string, password: string): Promise<any> {
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

            if (isMatch) return true
            return false
        } catch (e) {
            console.error(e)
        }

        return false
    }
}

export class Player {
    id: number;
    name: string;
    email: string;
    phone: string;
    notes: string;

    constructor(id: number, name: string, email: string, phone: string, notes: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.notes = notes;
    }
}

export class PlayerTransaction {
    id: number;
    player: string;
    buyInAmount: number;
    buyInMethod: string;
    rebuyAmount: number;
    rebuyMethod: string;
    cashoutAmount: number;
    cashoutMethod: string;
    time: Date;

    constructor(id: number, player: string, buyInAmount: number,
        buyInMethod: string, rebuyAmount: number, rebuyMethod: string,
        cashoutAmount: number, cashoutMethod: string, time: Date) {
        this.id = id;
        this.player = player;
        this.buyInAmount = buyInAmount;
        this.buyInMethod = buyInMethod;
        this.rebuyAmount = rebuyAmount;
        this.rebuyMethod = rebuyMethod;
        this.cashoutAmount = cashoutAmount;
        this.cashoutMethod = cashoutMethod;
        this.time = time
    }
}

export class Dealer {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: string;
    notes: string;

    constructor(id: number, name: string, email: string, phone: string, status: string, notes: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.status = status;
        this.notes = notes;
    }
}

export class DealerSession {
    id: number;
    dealer: string;
    downNumber: number;
    tableNumber: number;
    handsDealt: number;
    totalTips: number;
    gameCost: number;
    startTime: Date;
    endTime: Date;
    notes: string;

    constructor(id: number, dealer: string, downNumber: number, tableNumber: number,
        handsDealt: number, totalTips: number, gameCost: number, startTime: Date,
        endTime: Date, notes: string) {
        this.id = id;
        this.dealer = dealer;
        this.downNumber = downNumber;
        this.tableNumber = tableNumber;
        this.handsDealt = handsDealt;
        this.totalTips = totalTips;
        this.gameCost = gameCost;
        this.startTime = startTime;
        this.endTime = endTime;
        this.notes = notes;
    }
}