export interface Authentication {
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    password: string;
}

export interface AuthenticationError {
    firstName: { msg: string; status: boolean | null };
    lastName: { msg: string; status: boolean | null };
    email: { msg: string; status: boolean | null };
    password: { msg: string; status: boolean | null };
    userName: { msg: string; status: boolean | null };
}

export interface AuthTokens {
    access: string;
    refresh: string;
}

export interface AuthUserToken {
    exp: number;
    jti: string;
    token_type: "access";
    user_id: number;
}

export interface ActivateAccountDetail {
    uid: string;
    token: string;
}
