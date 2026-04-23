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

    static async deleteUser(email: string): Promise<any> {
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

    static async findAll(): Promise<Player[]> {
        const query = `
        SELECT *
        FROM players
        `

        try {
            const result = await pool.query(query)
            const players = result.rows.map((row: any) => new Player(row.id, row.name, row.email, row.phone, row.notes))
            return players
        } catch (e) {
            console.error(e)
            return []
        }
    }

    static async findById(id: number): Promise<Player | null> {
        const query = `
        SELECT *
        FROM players
        WHERE id = $1
        LIMIT 1
        `

        try {
            const result = await pool.query(query, [id])
            const player = result.rows[0]
            if(player) return new Player(player.id, player.name, player.email, player.phone, player.notes)
            return null
        } catch (e) {
            console.error(e)
            return null
        }
    }

    static async create(name: string, email: string, phone: string, notes: string): Promise<any> {
        const query = `
        INSERT INTO players (name, email, phone, notes)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `

        try {
            const result = await pool.query(query, [name, email, phone, notes])
            const player = result.rows[0]
            return new Player(player.id, player.name, player.email, player.phone, player.notes)
        } catch (e) {
            console.error(e)
            return null
        }
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

    static async findAll(): Promise<PlayerTransaction[]> {
        const query = `
        SELECT *
        FROM player_transactions
        `

        try {
            const result = await pool.query(query)
            const transactions = result.rows.map((row: any) => new PlayerTransaction(
                row.id, row.player, row.buy_in_amount, row.buy_in_method,
                row.rebuy_amount, row.rebuy_method, row.cashout_amount,
                row.cashout_method, row.time
            ))
            return transactions
        } catch (e) {
            console.error(e)
            return []
        }
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

    static async findAll(): Promise<Dealer[]> {
        const query = `
        SELECT *
        FROM dealers
        `

        try {
            const result = await pool.query(query)
            const dealers = result.rows.map((row: any) => new Dealer(row.id, row.name, row.email, row.phone, row.status, row.notes))
            return dealers
        } catch (e) {
            console.error(e)
            return []
        }
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

    static async findAll(): Promise<DealerSession[]> {
        const query = `
        SELECT *
        FROM dealer_sessions
        `

        try {
            const result = await pool.query(query)
            const sessions = result.rows.map((row: any) => new DealerSession(
                row.id, row.dealer, row.down_number, row.table_number,
                row.hands_dealt, row.total_tips, row.game_cost,
                row.start_time, row.end_time, row.notes
            ))
            return sessions
        } catch (e) {
            console.error(e)
            return []
        }
    }
}