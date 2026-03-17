//Change interfaces to classes in future for models
export interface User {
    id: number;
    email: string;
    passwordHash: string;
    createdAt: Date;
    checkPassword?: () => boolean;
    hashPassword?: () => string;
}

export interface Player {
    id: number;
    name: string;
    email: string;
    phone: string;
    notes: string;
}

export interface PlayerTransaction {
    id: number;
    player: string;
    buyInAmount: number;
    buyInMethod: string;
    rebuyAmount: number;
    rebuyMethod: string;
    cashoutAmount: number;
    cashoutMethod: string;
    time: Date;
}

export interface Dealer {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: string;
    notes: string;
}

export interface DealerSession {
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
}