import { FrameType, SearchCategroy } from "./types";

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

export interface ResetPassword {
    uid: string;
    token: string;
    new_password: string;
}

export interface FrameUpload {
    type: FrameType;
    value: string | File; // text || image
    key: string;
    // frame?: number | null;
    index?: number | null;
    imageVal?: string;
}

export interface HomeStory {
    created: string;
    id: number;
    frames: {
        created: string;
        id: number;
        image: null | string;
        text: null | string;
        story: number;
    };
    user: {
        first_name: string;
        last_name: string;
        username: string;
        email: string;
        id: number;
    };
    likes: number;
}

export interface Search {
    value: string;
    category: SearchCategroy;
}

export interface Profile {
    bio: null | string;
    date_joined: string;
    first_name: string;
    followers: string[];
    followers_count: number;
    following: string[];
    following_count: number;
    id: number;
    last_name: string;
    profile_picture: string | null;
    username: string;
}
