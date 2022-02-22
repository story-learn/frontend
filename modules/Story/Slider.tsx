import { FC, useState } from "react";
import Image from "next/image";
import { StoryIndicator } from "./../Story";
import { CloseIcon, LeftArrow, RightArrow } from "../../components/SVGs";
import { useRouter } from "next/router";
import { IStory } from "../../pages/stories/[id]";

const Slider: FC<IStory> = ({ created, frames, id, likes, user }) => {
    const { back } = useRouter();

    const [activeItem, setActiveItem] = useState(0);

    let translateX = activeItem * -100;

    const updateActiveIndex = (index: number) => {
        let itemsLength = frames.length;

        if (index < 0) {
            index = 0;
        } else if (index >= itemsLength) {
            index = itemsLength - 1;
        }

        setActiveItem(index);
    };

    return (
        <div className="story__container">
            <button
                className="story__close"
                onClick={back}
                aria-label="Go back"
            >
                <CloseIcon />
            </button>
            <StoryIndicator active={activeItem} stories={frames} />

            <section className="carousel">
                <button
                    className="carousel__controls carousel__controls--prev"
                    onClick={() => updateActiveIndex(activeItem - 1)}
                >
                    <LeftArrow />
                </button>
                <ul
                    className="carousel__inner"
                    style={{ transform: `translateX(${translateX}%)` }}
                >
                    {frames.map((frame, i) => (
                        <li
                            key={`${frame.created}${i}`}
                            className={`carousel__items ${
                                activeItem === i ? "active" : ""
                            }`}
                        >
                            {frame.text && (
                                <p className="story__type story__type-text">
                                    {frame.text}
                                </p>
                            )}
                            {frame.image && (
                                <figure className="story__type story__type-image">
                                    <Image
                                        src={frame.image}
                                        alt=""
                                        width={200}
                                        height={200}
                                        layout="responsive"
                                        objectFit="cover"
                                        priority={true}
                                    />
                                </figure>
                            )}
                        </li>
                    ))}
                </ul>
                <button
                    className="carousel__controls carousel__controls--next"
                    onClick={() => updateActiveIndex(activeItem + 1)}
                >
                    <RightArrow />
                </button>
            </section>
        </div>
    );
};

export default Slider;
