import { useRouter } from "next/router";
import { FC } from "react";
import { AsideNav, Navbar } from "../../components";
import { PageContainer } from "../Styles/PageContainer";

const Index: FC = ({ children }) => {
    let { pathname } = useRouter();
    let excludedGeneralNav = [
        "/signin",
        "/signup",
        "/forgotpassword",
        "/reset",
        "/verify",
        "/activate/[uid]/[token]",
        "/resetpassword/[uid]/[token]",
    ];

    let excludeAsideNav = [...excludedGeneralNav, "/upload"];

    return (
        <>
            {!excludedGeneralNav.includes(pathname) && <Navbar />}
            {excludeAsideNav.includes(pathname) ? (
                <>{children}</>
            ) : (
                <PageContainer>
                    <AsideNav />
                    {children}
                </PageContainer>
            )}
        </>
    );
};

export default Index;
