import { FC, useRef } from "react";
import {
    HomeLogo,
    ModeToggle,
    NavSearch,
    CustomLink,
} from "./../../components";
import { StyledNav } from "./StyledNav";
import { useAuth } from "../../context/AuthContext";
import { ThreeDotsVerticalIcon } from "../SVGs";
import { GiHamburgerMenu } from "react-icons/gi";

const Index: FC = () => {
    const { user } = useAuth();
    const navAuthButton = useRef<HTMLButtonElement | null>(null);
    const navAuthOptions = useRef<HTMLUListElement | null>(null);

    const toggleNavAuthOptions = () => {
        let navAuthOptionsCont = navAuthOptions.current;
        navAuthOptionsCont?.classList.toggle("nav__auth-options-open");
    };

    const userIsLoggedIn = Boolean(user);

    return (
        <StyledNav>
            <div className="container">
                <HomeLogo />
                <NavSearch />
                <ModeToggle />
                <button className="nav__large nav__upload">upload</button>
                {!userIsLoggedIn && (
                    <CustomLink
                        href="/signin"
                        text="Log In"
                        className="nav__login nav__large"
                    />
                )}
                <div className="nav__auth-cont">
                    <button
                        ref={navAuthButton}
                        className="nav__auth-btn"
                        onClick={toggleNavAuthOptions}
                    >
                        <figure aria-hidden="true">
                            <ThreeDotsVerticalIcon />
                            <GiHamburgerMenu />
                        </figure>
                    </button>
                    <ul ref={navAuthOptions} className="nav__auth-options">
                        <li>stories</li>
                        <li>Following</li>
                        <li>About</li>
                    </ul>
                </div>
            </div>
        </StyledNav>
    );
};

export default Index;
