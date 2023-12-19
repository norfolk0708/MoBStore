import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
    return (
        <Link to="/about">
            <h2 className='header__logo'>Mob<span>Store</span></h2>
        </Link>
    )
}

export default Logo
