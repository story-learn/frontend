import Image from "next/image";
import Link from "next/link";
import { FC, MouseEventHandler, useEffect, useRef } from "react";
import { Button } from "..";
import { useAuth } from "./../../Hooks/useAuth";
import { StyledNavAvatar } from "./StyledNavAvatar";
import { useRouter } from "next/router";

const NavAvatar: FC = () => {
    const { user: authUser } = useAuth();
    const user = authUser!;
    const { asPath } = useRouter();

    const navAuthOptions = useRef<HTMLDivElement | null>(null);

    const options = ["Stories", "Following", "Followers", "Settings"];

    const closeNavAuthOptions = () =>
        navAuthOptions.current!.classList.remove("open");

    const openAvatarOptions: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        navAuthOptions.current!.classList.toggle("open");
    };

    useEffect(() => {
        closeNavAuthOptions();
    }, [asPath]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                navAuthOptions.current &&
                !navAuthOptions.current.contains(e.target as Node)
            ) {
                closeNavAuthOptions();
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <StyledNavAvatar className="">
            <button className="avatar__btn flex" onClick={openAvatarOptions}>
                {user.profile_picture ? (
                    <figure className="avatar__img">
                        <Image
                            src={user.profile_picture}
                            alt=""
                            width={100}
                            height={100}
                            layout="responsive"
                        />
                    </figure>
                ) : (
                    <span className="avatar__icon flex">
                        {user.username[0].toUpperCase()}
                    </span>
                )}
            </button>
            <div ref={navAuthOptions} className="avatar__options--cont">
                <ul className="avatar__options">
                    {options.map((option) => (
                        <li key={option} className="avatar__option flex">
                            <Link
                                href={`${
                                    option === "Settings"
                                        ? "/settings"
                                        : `/profiles/me?tab=${option}`
                                }`}
                            >
                                <a
                                    className={`btn avatar__option--link ${
                                        asPath
                                            .toLowerCase()
                                            .includes(option.toLowerCase())
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    {option}
                                </a>
                            </Link>
                        </li>
                    ))}
                    <li className="avatar__option flex">
                        <Button text="Log out" className="avatar__logout" />
                    </li>
                </ul>
            </div>
        </StyledNavAvatar>
    );
};

export default NavAvatar;
