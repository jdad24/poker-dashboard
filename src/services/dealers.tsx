export async function getDealers() {
    try {
        const response = await fetch(`/api/dealers`);
        if (!response.ok) {
            throw new Error('Failed to fetch dealers');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching dealers:', error);
        return [];
    }
}

export async function getDealerSessions() {
    try {
        const response = await fetch(`/api/dealers/sessions`);
        if (!response.ok) {
            throw new Error('Failed to fetch dealer sessions');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching dealer sessions:', error);
        return [];
    }
}