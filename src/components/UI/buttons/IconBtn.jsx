import React from 'react'


const IconBtn = ({ props, toogleClass }) => {

    return (
        <div className={props.className} popup={props.name} onClick={e => toogleClass(e)}>
            <img src={props.icon} alt={props.name} />
        </div>
    )
}

export default IconBtn
