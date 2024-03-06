export interface UserForRegister {
    userName: string;
    email?: string;
    password: string;
    mobile?: number;
    countrycode: string;
    isAdmin: boolean;
}

export interface UserForLogin {
    userId: number;
    userName: string;
    password: string;
    token: string;
}
