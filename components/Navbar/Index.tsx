import { FC } from "react";
import Link from "next/link";
import { useDarkMode } from "../../Hooks/useDarkMode";

const Index: FC = () => {
    let { darkTheme, handleToggle } = useDarkMode();
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
                <div>NAVBAR</div>

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
