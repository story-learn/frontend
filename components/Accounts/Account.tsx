import { FC } from "react";
import { IProfile } from "../Profile";
import { Profile } from "./../index";

export interface IAccount extends IProfile {}

const Account: FC = (props) => {
    return (
        <Profile
            {...props}
            firstName="First"
            imgSrc=""
            lastName="Last"
            userName="username"
            bio="Random Bio For everyone. Just Kidding, You'll soon get a better bio, just chill till our backend is okay"
            followers={"20K"}
            onFollow={() => {
                console.log("follow");
            }}
            as="li"
            // className="profile"
            profileClassName="profile"
        />
    );
};

export default Account;
