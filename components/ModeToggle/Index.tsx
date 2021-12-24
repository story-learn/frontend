import { FC } from "react";
import { useDarkMode } from "../../Hooks/useDarkMode";
import { DarkIcon, LightIcon } from "../SVGs";
import { StyledModeToggle } from "./StyledModeToggle";

const Index: FC = () => {
    let { darkTheme, handleToggle } = useDarkMode();

    // avoid this error 'A component is changing an uncontrolled input to be controlled' since the initial value of darktheme is undefined
    if (darkTheme === undefined) return null;

    return (
        <StyledModeToggle className="toggle" htmlFor="toggle">
            <input
                type="checkbox"
                name="toggle"
                id="toggle"
                className="toggle__input"
                value={String(darkTheme)}
                onChange={handleToggle}
                checked={darkTheme}
            />
            <span className="toggle__display" hidden>
                <LightIcon />
                <DarkIcon />
            </span>
        </StyledModeToggle>
    );
};

export default Index;
