import Link from "next/link";
import { FC } from "react";
import { IProfile } from "../Profile";
import { Profile } from "./../index";
import { StyledAccount } from "./Styles";

export interface IAccount extends IProfile {}

const Account: FC<IAccount> = (props) => {
    return (
        <StyledAccount>
            <Link href={`/profiles/${props.id}`}>
                <a className="profile__link">
                    <Profile
                        {...props}
                        firstName={props.firstName || "First"}
                        lastName={props.lastName || "Last"}
                        userName={props.userName || "username"}
                        bio="Random Bio For everyone. Just Kidding, You'll soon get a better bio, just chill till our backend is okay"
                        followers={"20K"}
                        onFollow={(e) => {
                            e.preventDefault();
                            console.log("follow");
                        }}
                    />
                </a>
            </Link>
        </StyledAccount>
    );

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
