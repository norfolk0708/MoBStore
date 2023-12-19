import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context/createContext'
import { useNavigate } from 'react-router-dom'

import Logo from './Logo'
import Filter from './Filter'
import NavBar from './NavBar'
import IconBtn from './UI/buttons/IconBtn'
import ButtonMain from './UI/buttons/ButtonMain'

import shop from '../icons/header/shop.png'
import favorites from '../icons/header/favorites.png'
import cart from '../icons/header/cart.png'
import magnifier from '../icons/header/magnifier.png'
import burgerMenu from '../icons/header/burger-menu.png'
import toogleClass from '../utils/toogleClass'

const Header = () => {
    const { setIsAuth, myProducts, setVisibleLoginForm } = useContext(GlobalContext)
    const cartCount = myProducts.cart.length ? myProducts.cart.length : 0
    const favoriteCount = myProducts.favorites.length ? myProducts.favorites.length : 0
    const navigate = useNavigate()
    const isAuth = localStorage.getItem('auth')
    const [menuStatus, setMenuStatus] = useState('header__menu')
    const [filterStatus, setFilterStatus] = useState('header__filter')


    const pageLinks = [
        { navigate: `/products`, icon: shop },
        { navigate: `/favorites`, count: favoriteCount, icon: favorites },
        { navigate: `/cart`, count: cartCount, icon: cart },
    ]

    function changeStatus(e) {
        const icon = e.currentTarget

        if (icon.classList.value.includes('search')) {
            icon.classList.value.includes('active') ? setFilterStatus('header__filter') : setFilterStatus('header__filter active')
            //setMenuStatus('header__menu')
            //toogleClass(e)
        }

        if (icon.classList.value.includes('burger')) {
            icon.classList.value.includes('active') ? setMenuStatus('header__menu') : setMenuStatus('header__menu active')
            //icon.classList.value.includes('active') && setFilterStatus('header__filter')
            // toogleClass(e)
        }


        toogleClass(e)
    }

    function loqout() {
        setIsAuth(false)
        localStorage.clear()
        setVisibleLoginForm(false)
        navigate('/about')
    }

    function login() {
        console.log('object')
        setVisibleLoginForm(true)
    }

    return (
        <header className='header'>
            <div className='header__container'>
                <Logo />
                {isAuth && <Filter status={filterStatus} />}
                <div className={menuStatus}>
                    {isAuth
                        ? <>
                            <IconBtn props={{ name: `Search`, icon: magnifier, className: 'header__search' }} toogleClass={changeStatus} />
                            <NavBar links={pageLinks} />
                            <ButtonMain onClick={loqout}>LOGOUT</ButtonMain>
                        </>
                        : <ButtonMain onClick={login}>LOGIN</ButtonMain>
                    }
                </div>
                <IconBtn className={'header__burger'} props={{ name: `Menu`, icon: burgerMenu, className: 'header__burger' }} toogleClass={changeStatus} />
            </div>
        </header>
    )
}

export default Header
