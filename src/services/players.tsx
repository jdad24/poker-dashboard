export async function getPlayers() {
    const response = await fetch(`/api/players`);
    if (!response.ok) {
        throw new Error('Failed to fetch players');
    }
    return await response.json();
}