import { FC, RefObject, useRef } from "react";
import styled from "styled-components";
import { LoadingIndicator } from "../components";

interface Props {
    ref: RefObject<HTMLDivElement>;
    loading: boolean;
    error: string;
}

const InfiniteComponent: FC<Props> = ({
    ref: loadRef,
    loading,
    error,
    children,
}) => {
    return (
        <>
            {children}
            {loading ? <LoadingIndicator /> : error ? <div>{error}</div> : null}
            <div ref={loadRef}></div>
        </>
    );
};

const StyledInfiniteComponent = styled.main``;

export default InfiniteComponent;
