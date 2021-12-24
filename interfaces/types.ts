import { Authentication } from "./../interfaces";

export type Auth = Pick<Authentication, "password" | "userName">;

export type IconTypes = {
    color: string;
};
