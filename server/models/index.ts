export interface IUser {
    id: number;
    email: string;
    passwordHash: string;
    createdAt: Date;
    checkPassword?: () => boolean;
    hashPassword?: () => string;
}