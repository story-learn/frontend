import { useRouter } from "next/router";
import { FC } from "react";
import { AsideNav, Navbar } from "../../components";
import { PageContainer } from "../Styles/PageContainer";

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
            {excludedGeneralNav.includes(pathname) ? (
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
