export async function getDealers() {
    const response = await fetch(`/api/dealers`);
    if (!response.ok) {
        throw new Error('Failed to fetch dealers');
    }
    return await response.json();
}