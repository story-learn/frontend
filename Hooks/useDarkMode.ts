import { ChangeEventHandler, useEffect, useState } from "react";

export const useDarkMode = () => {
    const [inputValue, setInputValue] = useState("");
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
            } else {
                root.removeAttribute("data-theme");
                storeUserSetPreference("light");
            }
        }
    }, [darkTheme]);

    return { darkTheme, handleToggle };
};
