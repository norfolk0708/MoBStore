import React, { useContext, useState } from 'react'
import ButtonMain from './UI/buttons/ButtonMain'
import { Link, useNavigate } from 'react-router-dom'
import { GlobalContext } from '../context/createContext'
import Filter from './Filter'
import cartBlack from '../icons/cartHeader.png'
import heartDefault from '../icons/heart-default.png'
import shop from '../icons/shop.png'
import NavLink from './UI/Inputs/NavLink'

const Header = () => {
    const { setIsAuth, setVisibleLoginForm, filterProducts, setFilterProducts, myProducts } = useContext(GlobalContext)
    const isAuth = localStorage.getItem('auth')
    const navigate = useNavigate()
    const cartCount = myProducts.cart.length ? myProducts.cart.length : 0
    const favoriteCount = myProducts.favorites.length ? myProducts.favorites.length : 0
    const myLinks = [
        { navigate: `/products`, count: 0, icon: shop },
        { navigate: `/favorites`, count: favoriteCount, icon: heartDefault },
        { navigate: `/cart`, count: cartCount, icon: cartBlack },
    ]

    function loqout() {
        setIsAuth(false)
        localStorage.clear()
        setVisibleLoginForm(false)
        navigate('/about')
    }

    function login() {
        setVisibleLoginForm(true)
    }

    function changeStatus(e) {
        const nav = e.target.parentNode
        const navs = nav.parentNode.childNodes
        navs.forEach(nav => {
            nav.classList.remove('active')
        })
        nav.classList.add('active')
    }

    return (
        <header>
            <Link to="/about">
                <h2 className='logo'>Mob<span>Store</span></h2>
            </Link>
            {isAuth && <Filter filter={filterProducts} setFilter={setFilterProducts} />}
            {isAuth
                ? <>
                    <nav onClick={e => changeStatus(e)}>
                        {myLinks.map((link) =>
                            <NavLink
                                props={link}
                                key={link.navigate}
                            />
                        )}
                    </nav>
                    <ButtonMain onClick={loqout}>LOGOUT</ButtonMain>
                </>
                : <ButtonMain onClick={login}>LOGIN</ButtonMain>
            }
        </header>
    )
}

export default Header
