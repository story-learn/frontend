import { ChangeEventHandler, useEffect, useState } from "react";

export const useDarkMode = () => {
    const [darkTheme, setDarkTheme] = useState<boolean | undefined>(undefined);

    const handleToggle: ChangeEventHandler<HTMLInputElement> = (event) => {
        setDarkTheme(event.target.checked);
    };
    const storeUserSetPreference = (pref: any) => {
        localStorage.setItem("theme", pref);
    };

    useEffect(() => {
        const root = document.documentElement;
        const initialColorValue = root.style.getPropertyValue(
            "--initial-color-mode"
        );
        setDarkTheme(initialColorValue === "dark");
    }, []);

    useEffect(() => {
        const root = document.documentElement;

        if (darkTheme !== undefined) {
            if (darkTheme) {
                root.setAttribute("data-theme", "dark");
                storeUserSetPreference("dark");
                root.style.setProperty("--initial-color-mode", "dark");
            } else {
                root.setAttribute("data-theme", "light");
                storeUserSetPreference("light");
                root.style.setProperty("--initial-color-mode", "light");
            }
        }
    }, [darkTheme]);

    return { darkTheme, handleToggle };
};
