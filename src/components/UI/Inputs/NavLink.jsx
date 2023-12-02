import React from 'react'
import { Link } from 'react-router-dom'
import { toCapitalLetter } from '../../../utils/toCapitalLetter'

const Nav = ({ props }) => {
    const count = props.count ? <div>{props.count}</div> : <></>
    const popupMessage = toCapitalLetter(props.navigate.slice(1))

    return (
        <>
            <Link to={props.navigate} popup={popupMessage} >
                <img src={props.icon} alt={props.navigate} key={props.navigate} />
                {count}
            </Link>
        </>
    )
}

export default Nav
