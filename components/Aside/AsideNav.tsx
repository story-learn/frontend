import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { StyledAsideNav } from "./StyledAsideNav";
import {
    HomeIcon,
    SearchIcon,
    BookmarkIcon,
    UploadIcon,
    ProfileIcon,
} from "./../SVGs";

const AsideNav: FC = () => {
    let router = useRouter();
    let asideLinks = [
        {
            Icon: HomeIcon,
            href: "/",
        },
        {
            Icon: SearchIcon,
            href: "/search",
        },
        {
            Icon: UploadIcon,
            href: "/upload",
        },
        {
            Icon: BookmarkIcon,
            href: "/bookmark",
        },
        {
            Icon: ProfileIcon,
            href: "/profile",
        },
    ];

    return (
        <StyledAsideNav>
            <div>
                <ul>
                    {asideLinks.map(({ href, Icon }, i) => {
                        let className = "";

                        className += href === router.pathname ? "active" : "";
                        className += href === "/upload" ? " upload" : "";
                        className = className.trim();

                        return (
                            <li key={`${href} - ${i}`}>
                                <Link href={href}>
                                    <a aria-label="" className={`${className}`}>
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
