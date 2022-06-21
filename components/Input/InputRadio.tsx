import { FC } from "react";
import { IInput } from "./Index";
import { StyledRadio } from "./InputStyle";

interface IRadio extends IInput {
    label: string;
    disabled?: boolean;
    cheked?: boolean;
}

const InputRadio: FC<IRadio> = (props) => {
    delete props.type;
    const { others } = props;

    return (
        <div className="form__control  form__control--inline">
            <StyledRadio
                {...props}
                {...others}
                type="radio"
                onChange={props.handleChange}
                disabled={props.disabled}
                checked={props.cheked}
            />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    );
};

export default InputRadio;
