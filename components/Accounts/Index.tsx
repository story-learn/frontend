import React, { FC } from "react";
import { IAccount } from "./Account";
import { Account } from "./../index";

interface IAccounts {
    users: IAccount[];
    className?: string;
    dispatch?: IAccount["dispatchFollowAction"];
}
const Accounts: FC<IAccounts> = ({ users, className = "", dispatch }) => {
    // console.log({ users });

    return (
        <ul className={`profiles ${className}`}>
            {users.map((user, i) => (
                <Account key={i} {...user} dispatchFollowAction={dispatch} />
            ))}
        </ul>
    );
};

export default Accounts;
