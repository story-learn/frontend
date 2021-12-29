import { useRef, useEffect, useState, FC } from "react";
import { createPortal } from "react-dom";

interface ClientProps {
    selector: string;
}

// got this from https://github.com/vercel/next.js/tree/canary/examples/with-portals
const ClientOnlyPortal: FC<ClientProps> = ({ children, selector }) => {
    const ref = useRef<Element | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        ref.current = document.querySelector(selector);
        setMounted(true);
    }, [selector]);

    // this is to avoid typescript error
    if (!ref.current) return null;

    return mounted ? createPortal(children, ref.current) : null;
};

export default ClientOnlyPortal;
