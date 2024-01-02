import React, { useEffect, useState } from "react"
import Arrows from "./Arrows"
import Dots from "./Dots"
import SlidesList from "./SlideList";
import { SliderContext } from "../../../context/createContext";

const Slider = ({ /*width, height,*/ autoPlay, autoPlayTime, images }) => {
    const [items, setItems] = useState([])
    const [slide, setSlide] = useState(0)
    const [touchPosition, setTouchPosition] = useState(null)

    useEffect(() => {
        setItems(() => {
            return images
        })
        console.log(items)
    }, [])


    const changeSlide = (direction = 1) => {
        let slideNumber = 0;

        if (slide + direction < 0) {
            slideNumber = items.length - 1
        } else {
            slideNumber = (slide + direction) % items.length
        }

        setSlide(slideNumber)
    }

    const goToSlide = (number) => {
        setSlide(number % items.length)
    }

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX

        setTouchPosition(touchDown)
    }

    const handleTouchMove = (e) => {
        if (touchPosition === null) {
            return;
        }

        const currentPosition = e.touches[0].clientX
        const direction = touchPosition - currentPosition

        if (direction > 10) {
            changeSlide(1)
        }

        if (direction < -10) {
            changeSlide(-1)
        }

        setTouchPosition(null)
    }

    useEffect(() => {
        if (!autoPlay) return;

        const interval = setInterval(() => {
            changeSlide(1)
        }, autoPlayTime)

        return () => {
            clearInterval(interval)
        }
    }, [items.length, slide])// when images uploaded or slide changed manually we start timer

    return (
        <div
            className="card__slider"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        >
            <SliderContext.Provider
                value={{
                    goToSlide,
                    changeSlide,
                    slidesCount: items.length,
                    slideNumber: slide,
                    items,
                }}
            >
                <Arrows />
                <SlidesList />
                <Dots />
            </SliderContext.Provider>
        </div>
    )
}

export default Slider


/*Slider.propTypes = {
    autoPlay: PropTypes.bool,
    autoPlayTime: PropTypes.number,
    width: PropTypes.string,
    height: PropTypes.string
};

Slider.defaultProps = {
    autoPlay: false,
    autoPlayTime: 5000,
    width: "100%",
    height: "100%"
}; */