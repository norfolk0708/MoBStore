import React, { useContext } from "react";
import Dot from "./Dot";
import { SliderContext } from "../../../context/createContext";

const Dots = () => {
    const { slidesCount } = useContext(SliderContext)

    const renderDots = () => {
        const dots = []
        for (let i = 0; i < slidesCount; i++) {
            dots.push(<Dot key={`dot-${i}`} number={i} />)
        }

        return dots
    }

    return <div className="dots">{renderDots()}</div>
}

export default Dots