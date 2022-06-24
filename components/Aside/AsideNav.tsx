import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { FiLogOut } from "react-icons/fi";
import { StyledAsideNav } from "./StyledAsideNav";
import {
    HomeIcon,
    SearchIcon,
    BookmarkIcon,
    UploadIcon,
    ProfileIcon,
} from "./../SVGs";
import { useAuth } from "../../Hooks/useAuth";
// import { useAuth } from "../../context/AuthContext";
import useStoryRequest from "./../../Hooks/useStoryRequest";

const AsideNav: FC = () => {
    const { user, logout } = useAuth();
    const { storyInstance } = useStoryRequest();
    let router = useRouter();
    let asideLinks = [
        {
            Icon: HomeIcon,
            href: "/",
            label: "home",
        },
        {
            Icon: SearchIcon,
            href: "/search",
            label: "search",
        },
        {
            Icon: UploadIcon,
            href: "/upload",
            label: "upload",
        },
        {
            Icon: BookmarkIcon,
            href: "/bookmarks",
            label: "bookmarks",
        },
    ];

    if (user) {
        asideLinks.push({
            Icon: ProfileIcon,
            href: `/profiles/me`,
            label: "profile",
        });
    }

    return (
        <StyledAsideNav>
            <div>
                <ul>
                    {asideLinks.map(({ href, Icon, label }, i) => {
                        let className = "";

                        className += href === router.asPath ? "active" : "";
                        className += href === "/upload" ? " upload" : "";
                        className = className.trim();

                        // console.log({ href, pathname: router.pathname });

                        return (
                            <li key={`${href} - ${i}`}>
                                <Link href={href}>
                                    <a
                                        aria-label={label}
                                        className={`${className} btn__icon`}
                                    >
                                        {<Icon />}
                                    </a>
                                </Link>
                            </li>
                        );
                    })}
                    {user && (
                        <li>
                            <button
                                className="btn__icon logout"
                                onClick={() => logout(storyInstance)}
                            >
                                <FiLogOut />
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </StyledAsideNav>
    );
};

export default AsideNav;
