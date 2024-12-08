import React, { useState } from 'react';
import ArrowRight from "../assets/arrowLeft.svg";
import ArrowLeft from "../assets/arrowRight.svg";
import uiImage from "../assets/uielementLink.svg";
import uiImage2 from "../assets/safeImage.svg";

const ImageSlider = () => {
    const images = [
        {
            src: uiImage,
            alt: "Get a link that you can share",
            heading: "Get a link you can share",
            paragraph: "click New Meeting to get a link you can send to people that" +
                "you want to meet"
        },
        {
            src: uiImage2,
            alt: "No one can enter a room without the owner permission",
            heading: "your meeting is safe",
            paragraph: "no one can join unless invited or admitted by the host",
        }
    ]

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="flex flex-row space-x-8 mt-12 ml-44  items-center">
            <button onClick={handlePrev} aria-label="Previous Image">
                <img src={ArrowLeft} alt="arrow left" className="h-8 w-8" />
            </button>
            <div className="flex flex-col">
                        <div>
                            <img
                                src={images[currentIndex].src}
                                alt={images[currentIndex].alt}
                                className="h-60 w-60"
                            />
                            <p className="mt-4 text-center">{images[currentIndex].paragraph}</p>
                        </div>
            </div>
            <button onClick={handleNext} aria-label="Next Image">
                <img src={ArrowRight} alt="arrow right" className="h-8 w-8" />
            </button>
        </div>
    );
};

export default ImageSlider;
