import React, { useContext } from "react";
import arrow from '../../../icons/arrow.png'
import { SliderContext } from "../../../context/createContext";

const Arrows = () => {
    const { changeSlide } = useContext(SliderContext);

    return (
        <div className="arrows">
            <img src={arrow} alt={`arrow`} className="arrow left" onClick={() => changeSlide(-1)} />
            <img src={arrow} alt={`arrow`} className="arrow right" onClick={() => changeSlide(1)} />
        </div>
    )
}

export default Arrows