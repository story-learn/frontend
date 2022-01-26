import { FC, useEffect } from "react";
import { ClientOnlyPortal } from "./../../components";
import { AiOutlineClose } from "react-icons/ai";
import { StyledModal } from "./StyledModal";
import { CSSTransition } from "react-transition-group";

interface ModalProps {
    closeModal?: () => void;
    showModal: boolean;
    extraClassName?: string;
    title?: string;
    showCloseBtn?: boolean;
}

const Index: FC<ModalProps> = ({
    showModal,
    extraClassName,
    closeModal,
    title,
    showCloseBtn = true,
    children,
}) => {
    const closeModalWhenEscapeKeyIsPressed = (e: KeyboardEvent) => {
        if (e.code === "Escape") {
            closeModal?.();
        }
    };

    useEffect(() => {
        document.body.addEventListener(
            "keydown",
            closeModalWhenEscapeKeyIsPressed
        );

        return () =>
            document.body.removeEventListener(
                "keydown",
                closeModalWhenEscapeKeyIsPressed
            );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ClientOnlyPortal selector="#portal">
            <CSSTransition in={showModal} unmountOnExit timeout={100}>
                <StyledModal
                    className={`modal ${extraClassName}`}
                    role="dialog"
                    // close modal when modal container is clicked
                    onClick={() => closeModal?.()}
                >
                    <div
                        // do not close modal when modal content is clicked
                        onClick={(e) => e.stopPropagation()}
                        className="modal__cont"
                    >
                        {title && (
                            <header className="modal__header">
                                <h4>{title}</h4>
                            </header>
                        )}
                        <section className="modal__content">{children}</section>
                        {closeModal && showCloseBtn && (
                            <button
                                className="modal__close"
                                aria-label="close modal"
                                onClick={() => closeModal()}
                            >
                                <AiOutlineClose />
                            </button>
                        )}
                    </div>
                </StyledModal>
            </CSSTransition>
        </ClientOnlyPortal>
    );
};

export default Index;
