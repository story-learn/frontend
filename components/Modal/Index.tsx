import { FC, useEffect } from "react";
import { ClientOnlyPortal } from "./../../components";
import { AiOutlineClose } from "react-icons/ai";
import { StyledModal } from "./StyledModal";
import { CSSTransition } from "react-transition-group";

interface ModalProps {
    closeModal: () => void;
    showModal: boolean;
    extraClassName?: string;
}

const Index: FC<ModalProps> = ({
    showModal,
    extraClassName,
    closeModal,
    children,
}) => {
    const closeModalWhenEscapeKeyIsPressed = (e: KeyboardEvent) => {
        if (e.code === "Escape") {
            closeModal();
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
                    onClick={() => closeModal()}
                >
                    <div
                        // do not close modal when modal content is clicked
                        onClick={(e) => e.stopPropagation()}
                        className="modal__cont"
                    >
                        <header className="modal__header">Modal Header</header>
                        <section className="modal__content">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Reprehenderit perferendis recusandae ex ipsa
                            alias deserunt tempora repellat tenetur cupiditate
                            nemo? Lorem ipsum, dolor sit amet consectetur
                            adipisicing elit. Minima commodi fugiat similique
                            iusto soluta deleniti, consequatur cumque
                            repellendus? Earum quisquam dolor ipsa deleniti ut
                            eos? Quam eveniet maiores asperiores consequuntur
                            earum sint quos odit a cumque doloremque, veniam
                            soluta ipsa veritatis accusantium amet eos molestiae
                            ut ab nulla. Laudantium, accusantium. Lorem, ipsum
                            dolor sit amet consectetur adipisicing elit.
                            Deleniti iste ducimus aliquid earum recusandae non
                            laboriosam quasi perferendis consectetur qui maxime
                            blanditiis neque eum perspiciatis modi molestiae
                            dolor, eaque aperiam libero dolorem quo commodi.
                            Reiciendis aliquam odio nisi quisquam quod. Lorem
                            ipsum dolor sit amet consectetur adipisicing elit.
                            Explicabo ullam fugit autem id distinctio doloremque
                            ipsum, dolor ut molestiae soluta optio suscipit
                            repellat iste totam maxime praesentium. Aut ab
                            obcaecati laboriosam provident alias ratione totam
                            fugiat sequi. Autem recusandae alias, a nihil
                            ducimus veritatis nisi repellendus dicta neque
                            labore nostrum? Lorem ipsum dolor sit, amet
                            consectetur adipisicing elit. Porro hic quaerat enim
                            vero libero voluptatum veritatis sequi velit minima
                            consequatur, provident in. Repellat, accusamus! Esse
                            veniam fugiat nisi optio dolorem consequatur quas
                            ipsum, sequi velit iste quam enim facilis assumenda?
                            {children}
                        </section>
                        <button
                            className="modal__close"
                            aria-label="close modal"
                            onClick={() => closeModal()}
                        >
                            <AiOutlineClose />
                        </button>
                    </div>
                </StyledModal>
            </CSSTransition>
        </ClientOnlyPortal>
    );
};

export default Index;
