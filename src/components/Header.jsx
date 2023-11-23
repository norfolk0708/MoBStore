import React, { useContext } from 'react'
import ButtonMain from './UI/buttons/ButtonMain'
import { Link, useNavigate } from 'react-router-dom'
import { GlobalContext } from '../context/createContext'
import Filter from './Filter'
import cartBlack from '../icons/cartHeader.png'
import heartDefault from '../icons/heart-default.png'
import shop from '../icons/shop.png'


const Header = () => {
    const { setIsAuth, setVisibleLoginForm, filterProducts, setFilterProducts, myProducts } = useContext(GlobalContext)
    const isAuth = localStorage.getItem('auth')
    const navigate = useNavigate()
    function loqout() {
        setIsAuth(false)
        localStorage.clear()
        setVisibleLoginForm(false)
        navigate('/about')
    }

    function login() {
        setVisibleLoginForm(true)
    }

    const cartCount = myProducts.cart.length
        ? <div>{myProducts.cart.length}</div>
        : <></>

    const favoriteCount = myProducts.favorites.length
        ? <div>{myProducts.favorites.length}</div>
        : <></>

    return (
        <header>
            <Link to="/about">
                <h2 className='logo'>Mob<span>Store</span></h2>
            </Link>
            {isAuth && <Filter filter={filterProducts} setFilter={setFilterProducts} />}
            {isAuth
                ? <>
                    <nav>
                        <Link to={`/products`}>
                            <img src={shop} alt={`shop`} />
                        </Link>
                        <Link to={`/favorites`}>
                            {favoriteCount}
                            <img src={heartDefault} alt={`favorites`} />
                        </Link>
                        <Link to={`/cart`}>
                            {cartCount}
                            <img src={cartBlack} alt={`cart`} />
                        </Link>
                    </nav>
                    <ButtonMain onClick={loqout}>LOGOUT</ButtonMain>
                </>
                : <ButtonMain onClick={login}>LOGIN</ButtonMain>
            }
        </header>
    )
}

export default Header
