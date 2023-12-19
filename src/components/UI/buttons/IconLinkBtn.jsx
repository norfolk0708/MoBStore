import React from 'react'
import { Link } from 'react-router-dom'
import { toCapitalLetter } from '../../../utils/toCapitalLetter'

const IconLinkBtn = ({ props, toogleNavs }) => {
    const count = props.count ? <div>{props.count}</div> : <></>
    const popupMessage = props.name || toCapitalLetter(props.navigate.slice(1))

    return (
        <>
            <Link to={props.navigate} popup={popupMessage} onClick={e => toogleNavs(e)}>
                <img src={props.icon} alt={props.navigate} key={props.navigate} />
                {count}
            </Link>
        </>
    )
}

export default IconLinkBtn
