import { FC, useRef } from "react";
import { HomeLogo, ModeToggle } from "./../../components";
import { StyledNavAuth } from "./StyledNavAuth";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRouter } from "next/router";
import { NavOthersContent } from "./navOthersContent";
import { NavAuthPageOthersContentRoutes } from "../../interfaces/types";

const NavAuth: FC = () => {
    let { route } = useRouter();

    const navOthersRef = useRef<HTMLDivElement | null>(null);

    const toggleNav = () => {
        const navOthersContainer = navOthersRef.current;
        let className = "nav__others-open";
        let opened = navOthersContainer!.classList.contains(className);

        if (opened) {
            navOthersContainer!.classList.remove(className);
        } else {
            navOthersContainer!.classList.add(className);
        }
    };

    const determineNavAuthOthers = () => {
        let element = (
            <div className="nav__others" ref={navOthersRef}>
                {NavOthersContent(route as NavAuthPageOthersContentRoutes)}
            </div>
        );
        return element;
    };

    return (
        <StyledNavAuth>
            <div className="container">
                <HomeLogo />
                <ModeToggle />
                <button className="nav__toggle" onClick={toggleNav}>
                    <GiHamburgerMenu />
                </button>
                {determineNavAuthOthers()}
            </div>
        </StyledNavAuth>
    );
};

export default NavAuth;
