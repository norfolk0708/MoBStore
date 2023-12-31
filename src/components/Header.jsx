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
import logoutIcon from '../icons/header/logout.png'
import loginIcon from '../icons/header/logout.png'

const Header = () => {
    const { setIsAuth, myProducts, setVisibleLoginForm } = useContext(GlobalContext)
    const cartCount = myProducts.cart.length ? myProducts.cart.length : 0
    const favoriteCount = myProducts.favorites.length ? myProducts.favorites.length : 0
    const navigate = useNavigate()
    const isAuth = localStorage.getItem('auth')
    const [menuStatus, setMenuStatus] = useState('header__menu')
    const [filterStatus, setFilterStatus] = useState('header__filter')
    const [logoutBtn, setLogoutBtn] = useState(<ButtonMain onClick={logout}>LOGOUT</ButtonMain>)
    const [loginBtn, setLoginBtn] = useState(<ButtonMain onClick={login}>LOGIN</ButtonMain>)

    /*const loginBtn = menuStatus === 'header__menu active'
        ? <IconBtn props={{ name: `Login`, icon: loginIcon, className: 'header__login' }} toogleClass={login} />
        : <ButtonMain onClick={login}>LOGIN</ButtonMain>*/

    const pageLinks = [
        { navigate: `/products`, icon: shop },
        { navigate: `/favorites`, count: favoriteCount, icon: favorites },
        { navigate: `/cart`, count: cartCount, icon: cart },
    ]

    function changeStatus(e) {
        const icon = e.currentTarget

        if (icon.classList.value.includes('search')) {
            icon.classList.value.includes('active') ? setFilterStatus('header__filter') : setFilterStatus('header__filter active')
        }

        if (icon.classList.value.includes('burger')) {
            icon.classList.value.includes('active') ? setMenuStatus('header__menu') : setMenuStatus('header__menu active')
            icon.classList.value.includes('active')
                ? setTimeout(setLogoutBtn, 500, <ButtonMain onClick={logout}>LOGOUT</ButtonMain>)
                : setLogoutBtn(<IconBtn props={{ name: `Logout`, icon: logoutIcon, className: 'header__logout' }} toogleClass={logout} />)
            icon.classList.value.includes('active')
                ? setTimeout(setLogoutBtn, 500, <ButtonMain onClick={login}>LOGIN</ButtonMain>)
                : setLogoutBtn(<IconBtn props={{ name: `Login`, icon: loginIcon, className: 'header__login' }} toogleClass={login} />)
        }

        toogleClass(e)
    }

    function logout() {
        setIsAuth(false)
        localStorage.clear()
        setVisibleLoginForm(false)
        navigate('/about')
        console.log('logout')
    }

    function login() {
        console.log('login')
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
                            {logoutBtn}
                        </>
                        : loginBtn
                    }
                </div>
                <IconBtn className={'header__burger'} props={{ name: `Menu`, icon: burgerMenu, className: 'header__burger' }} toogleClass={changeStatus} />
            </div>
        </header>
    )
}

export default Header
