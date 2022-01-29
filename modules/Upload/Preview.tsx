import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { FC } from "react";
import "@splidejs/splide/dist/css/splide.min.css";
import { DeleteIcon } from "../../components/SVGs";
import { StoryUpload as Story } from "../../interfaces";

export interface IPreview {
    stories: Story[];
    deleteStory: (id: Story["key"]) => void;
    editStory: (id: Story["key"]) => void;
}

const UploadPreview: FC<IPreview> = ({ stories, deleteStory, editStory }) => {
    return (
        <section className={`preview ${stories.length > 0 ? "show" : ""}`}>
            <div className="container">
                <h2 className="preview__head">Preview</h2>

                <Splide
                    className="slider"
                    options={{
                        drag: true,
                        gap: "3rem",
                        perPage: 4,
                        perMove: 2,
                        pagination: false,

                        breakpoints: {
                            500: {
                                perPage: 1,
                                perMove: 1,
                            },

                            850: {
                                perPage: 2,
                                perMove: 1,
                                gap: "2.5rem",
                            },

                            1100: {
                                perPage: 3,
                                perMove: 2,
                            },
                        },
                    }}
                >
                    {stories.map(({ type, key, value }, index) => {
                        let frameNumber = index + 1;
                        let frameHeading = `Frame ${frameNumber} ${
                            frameNumber === 1 ? "(Cover Frame)" : ""
                        }`.trim();

                        // retrieve image url from image file
                        let getImgSrc = (val: File) => URL.createObjectURL(val);

                        return (
                            <SplideSlide key={key} className="slider__item">
                                <div className="slider__item-frame">
                                    <h6 className="slider__item-number">
                                        {frameHeading}
                                    </h6>
                                    <button
                                        className="slider__item-delete"
                                        onClick={() => deleteStory(key)}
                                    >
                                        <DeleteIcon />
                                    </button>
                                </div>
                                <div
                                    className="slider__item-cont"
                                    onClick={() => editStory(key)}
                                >
                                    {type === "Text" ? (
                                        <p className="slider__item-content">
                                            {value}
                                        </p>
                                    ) : (
                                        <figure className="slider__item-img">
                                            <Image
                                                // src={value}
                                                src={getImgSrc(value as File)}
                                                alt=""
                                                width={300}
                                                height={300}
                                                layout="responsive"
                                                objectFit="cover"
                                            />
                                        </figure>
                                    )}
                                </div>
                            </SplideSlide>
                        );
                    })}
                </Splide>
            </div>
        </section>
    );
};

export default UploadPreview;
