import Link from "next/link";
import { FC, MouseEvent, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useStoryRequest from "../../Hooks/useStoryRequest";
import { followProfile, unFollowProfile } from "../../utilities/Profile";
import { IProfile } from "../Profile";
import { Profile } from "./../index";
import { StyledAccount } from "./Styles";

export interface IAccount extends IProfile {
    dispatchFollowAction?: (status?: "failed") => void;
}

const Account: FC<IAccount> = (props) => {
    // console.log(props);
    const { user } = useAuth();
    const { storyInstance } = useStoryRequest();
    const userIsLoggedIn = Boolean(user);
    const showFollowButton = userIsLoggedIn && props.id !== user.user_id;

    const [followBtnText, setFollowBtnText] = useState<"Follow" | "Unfollow">(
        props.followers!.findIndex(
            ({ user_id }) => user_id === user?.user_id
        ) === -1
            ? "Follow"
            : "Unfollow"
    );

    const handleFollow = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        let currentFollowText = followBtnText;
        console.log(`trying to ${currentFollowText}`);

        setFollowBtnText((prev) => (prev === "Follow" ? "Unfollow" : "Follow")); // update UI immediately
        props.dispatchFollowAction?.();
        try {
            if (!storyInstance) return;

            followBtnText === "Unfollow"
                ? await unFollowProfile(storyInstance, props.id)
                : await followProfile(storyInstance, props.id);
            // props.dispatchFollowSuccess?.();
        } catch (error) {
            console.log("there was error");
            // console.log(error);
            setFollowBtnText(currentFollowText); // revert UI if there was an error
            // revert context
            // props.dispatchFollowFailed?.();
            props.dispatchFollowAction?.("failed");
        }
    };

    return (
        <StyledAccount>
            <Link href={`/profiles/${props.id}`}>
                <a className="profile__link">
                    <Profile
                        {...props}
                        first_name={props.first_name || "First"}
                        last_name={props.last_name || "Last"}
                        username={props.username || "username"}
                        bio="Random Bio For everyone. Just Kidding, You'll soon get a better bio, just chill till our backend is okay"
                        // followers={"20K"}
                        followers_count={"20k"}
                        // onFollow={(e) => {
                        //     e.preventDefault();
                        //     console.log("follow");
                        // }}
                        onFollow={handleFollow}
                        showFollowBtn={showFollowButton}
                        followBtnText={followBtnText}
                    />
                </a>
            </Link>
        </StyledAccount>
    );

    // return (
    //     <Profile
    //         {...props}
    //         firstName="First"
    //         imgSrc=""
    //         lastName="Last"
    //         userName="username"
    //         bio="Random Bio For everyone. Just Kidding, You'll soon get a better bio, just chill till our backend is okay"
    //         followers={"20K"}
    //         onFollow={() => {
    //             console.log("follow");
    //         }}
    //         as="li"
    //         // className="profile"
    //         profileClassName="profile"
    //     />
    // );
};

export default Account;
