import React, { FC } from "react";
import { IAccount } from "./Account";
import { Account } from "./../index";

interface IAccounts {
    users: IAccount[];
    className?: string;
}
const Accounts: FC<IAccounts> = ({ users, className = "" }) => {
    return (
        <ul className={`profiles ${className}`}>
            {users.map((user, i) => (
                <Account key={i} {...user} />
            ))}
        </ul>
    );
};

export default Accounts;
