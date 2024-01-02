import React from "react";
import SliderImage from "./SlideImage";

const Slide = ({ data }) => {

    return (
        <div className="slide">
            <SliderImage src={data} alt={'image'} />
        </div>
    )
}

export default Slide