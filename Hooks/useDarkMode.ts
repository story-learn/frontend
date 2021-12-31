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
        let theme = localStorage.getItem("theme");
        setDarkTheme(theme === "dark");
    }, []);

    useEffect(() => {
        const root = document.documentElement;

        if (darkTheme !== undefined) {
            if (darkTheme) {
                root.setAttribute("data-theme", "dark");
                storeUserSetPreference("dark");
            } else {
                root.setAttribute("data-theme", "light");
                storeUserSetPreference("light");
            }
        }
    }, [darkTheme]);

    return { darkTheme, handleToggle };
};
