export interface IUserForLogin {
    name?: string;
    email?: string;
    password: string;
}

export interface IUser {
    id: number;
    accessToken: string;

    name: string;
    email: string;
    role: string;
    photo: string;
    phoneNumber: string;
}
