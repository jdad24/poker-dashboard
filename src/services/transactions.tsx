export async function getTransactions() {
    const response = await fetch(`/api/transactions`);
    if (!response.ok) {
        throw new Error('Failed to fetch transactions');
    }
    return await response.json();
}