import { FC } from "react";
import Link from "next/link";
import { useDarkMode } from "../../Hooks/useDarkMode";
import Image from "next/image";
import Logo from "./../../public/logo.svg";

const Index: FC = () => {
    let { darkTheme, handleToggle } = useDarkMode();
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
