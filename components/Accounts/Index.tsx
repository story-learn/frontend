import React, { FC } from "react";
import { IAccount } from "./Account";
import { Account } from "./../index";

interface IAccounts {
    users: IAccount[];
    className?: string;
    dispatch?: IAccount["dispatchFollowAction"];
    handleFollow?: IAccount["handleOnFollow"];
}
const Accounts: FC<IAccounts> = ({
    users,
    className = "",
    dispatch,
    handleFollow,
}) => {
    // console.log({ users });

    return (
        <ul className={`profiles ${className}`}>
            {users.map((user, i) => (
                <Account
                    key={i}
                    {...user}
                    dispatchFollowAction={dispatch}
                    handleOnFollow={handleFollow}
                />
            ))}
        </ul>
    );
};

export default Accounts;
