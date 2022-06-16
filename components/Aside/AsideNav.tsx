import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
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

const AsideNav: FC = () => {
    const { user } = useAuth();
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
            href: "/bookmark",
            label: "bookmark",
        },
    ];

    if (user) {
        asideLinks.push({
            Icon: ProfileIcon,
            href: `/profiles/me`,
            label: "profile",
        });
    }
    // console.log(router);

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
                </ul>
            </div>
        </StyledAsideNav>
    );
};

export default AsideNav;
