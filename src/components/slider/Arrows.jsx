import React, { useContext } from "react";
import { SliderContext } from "./Slider";
import arrow from '../../icons/arrow.png'

export default function Arrows() {
    const { changeSlide } = useContext(SliderContext);

    return (
        <div className="arrows">
            <img src={arrow} alt={`arrow`} className="arrow left" onClick={() => changeSlide(-1)} />
            <img src={arrow} alt={`arrow`} className="arrow right" onClick={() => changeSlide(1)} />
        </div>
    )
}