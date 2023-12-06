import React from "react";
import SlideTitle from "./SlideTitle";
import SliderImage from "./SlideImage";

export default function Slide({ data }) {
    return (
        <div className="slide">
            <SliderImage src={data} alt={'image'} />
        </div>
    )
}