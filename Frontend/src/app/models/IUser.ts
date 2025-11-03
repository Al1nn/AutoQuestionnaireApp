export interface IUserForLogin {
    name?: string;
    email?: string;
    password: string;
}


export interface IToken {
    accessToken: string;
}

export interface IUser { //decoded token
    id: string;
    name: string;
    photo?: string;
    role: string;
}

export class Profile {
    id: number = 0;
    name: string = '';
    email: string = '';
    photo: string = '';
    role: string = '';
    phoneNumber: string = '';
    //more fields to come for average score and questionnaires solved
}

