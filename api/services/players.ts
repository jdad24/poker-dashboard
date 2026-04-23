import { Player, PlayerTransaction } from "../models";

export async function getPlayers() : Promise<Player[]> {
    try {
        const players = await Player.findAll();
        return players;
    } catch (error) {
        console.error('Error fetching players:', error);
        return [];
    }
}

export async function getPlayerById(id: number) : Promise<Player | null> {
    try {
        const player = await Player.findById(id);
        return player;
    } catch (error) {
        console.error(`Error fetching player with id ${id}:`, error);
        return null;
    }
}

export async function createPlayer(name: string, email: string, phone: string, notes: string) : Promise<any> {
    try {
        const response = await Player.create(name, email, phone, notes);
        return response;
    } catch (error) {
        console.error('Error creating player:', error);
        return { success: false, message: 'Error creating player' };
    }
}   

export async function getPlayerTransactions() : Promise<PlayerTransaction[]> {
    try {
        const transactions = await PlayerTransaction.findAll();
        return transactions;
    } catch (error) {
        console.error('Error fetching player transactions:', error);
        return [];
    }
}