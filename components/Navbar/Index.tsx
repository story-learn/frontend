import { FC } from "react";
import Link from "next/link";
import { useDarkMode } from "../../Hooks/useDarkMode";
import { useAuth } from "../../context/AuthContext";

const Index: FC = () => {
    let { darkTheme, handleToggle } = useDarkMode();
    let { logout } = useAuth();
    return (
        <nav
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem",
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

                <div>
                    <label htmlFor="">
                        <input
                            type="checkbox"
                            name="toggle"
                            id="toggle"
                            value={String(darkTheme)}
                            onChange={handleToggle}
                        />
                    </label>
                </div>
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
