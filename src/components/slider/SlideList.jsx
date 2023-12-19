import React, { useContext } from "react";
import Slide from "./Slide";
import { SliderContext } from "../../context/createContext";

const SlidesList = () => {
    const { slideNumber, items } = useContext(SliderContext)
    return (
        <div
            className="slide-list"
            style={{ transform: `translateX(-${slideNumber * 100}%)` }}
        >
            {items.map((slide, index) => (
                <Slide key={index} data={slide} />
            ))}
        </div>
    )
}

export default SlidesList