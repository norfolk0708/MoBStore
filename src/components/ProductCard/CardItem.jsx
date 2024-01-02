import React from 'react'

const CardItem = ({ info }) => {
    return (
        <div className='card__item'>
            <div>{info.name}</div>
            <div></div>
            <div>{info.value}</div>
        </div>

    )
}

export default CardItem
