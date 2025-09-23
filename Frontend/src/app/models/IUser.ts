export interface IUserForLogin {
    name?: string;
    email?: string;
    password: string;
}


export interface IToken {
    accessToken: string;
}

export interface IUser {
    id: string;
    name: string;
    photo?: string;
    role: string;
}
