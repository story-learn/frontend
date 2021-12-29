import { useRouter } from "next/router";
import { FC } from "react";
import { Navbar } from "../../components";

const Index: FC = ({ children }) => {
    let { pathname } = useRouter();
    let excludedGeneralNav = [
        "/signin",
        "/signup",
        "/reset",
        "/verify",
        "/activate/[uid]/[token]",
    ];

    return (
        <>
            {!excludedGeneralNav.includes(pathname) && <Navbar />}
            {children}
        </>
    );
};

export default Index;
