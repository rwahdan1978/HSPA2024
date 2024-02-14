export interface UserForRegister {
    //testa
    userName: string;
    email?: string;
    password: string;
    mobile?: number;
    countrycode: string;
}

export interface UserForLogin {
    //testa
    userName: string;
    password: string;
    token: string;
}
