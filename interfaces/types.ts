import { Authentication } from "./../interfaces";

export type Auth = Pick<Authentication, "password" | "userName">;

export type IconTypes = {
    color: string;
};

export type NavAuthPageOthersContentRoutes =
    | "/signup"
    | "/signin"
    | "/verify"
    | "/reset";

export type FrameType = "" | "Text" | "Image";
