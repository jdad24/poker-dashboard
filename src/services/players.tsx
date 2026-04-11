export async function getPlayers() {
    try {
        const response = await fetch(`/api/data/players`);
        if (!response.ok) {
            throw new Error('Failed to fetch players');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching players:', error);
        return [];
    }
}

export async function getPlayerTransactions() {
    try {
        const response = await fetch(`/api/data/players/transactions`);
        if (!response.ok) {
            throw new Error('Failed to fetch transactions');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching player transactions:', error);
        return [];
    }
}