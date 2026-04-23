import { Dealer, DealerSession } from "../models/index.ts";

export async function getDealers() : Promise<Dealer[]> {
    try {
        const dealers = await Dealer.findAll();
        return dealers;
    } catch (error) {
        console.error('Error fetching dealers:', error);
        return [];
    }
}

export async function getDealerSessions() : Promise<DealerSession[]> {
    try {
        const sessions = await DealerSession.findAll();
        return sessions;
    } catch (error) {
        console.error('Error fetching dealer sessions:', error);
        return [];
    }
}