import { FC } from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import Image from "next/image";
import Logo from "./../../public/logo.svg";

const Index: FC = () => {
    let { logout } = useAuth();
    return (
        <nav
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1.5em calc(0.07 * 100vw)",
            }}
        >
            <div>
                <Link href="/">
                    <a>Home</a>
                </Link>

                <Link href="/private">
                    <a>Private</a>
                </Link>

                <button onClick={logout}>Logout</button>

                <Image src={Logo} alt="Logo" height={24} />
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1rem",
                    gap: "2rem",
                }}
            >
                <Link href="/signin">
                    <a>signin</a>
                </Link>
                <Link href="/signup">
                    <a>signup</a>
                </Link>
            </div>
        </nav>
    );
};

export default Index;
