import React, { useContext } from 'react'
import ButtonMain from './UI/buttons/ButtonMain'
import { Link, useNavigate } from 'react-router-dom'
import { GlobalContext } from '../context/createContext'
import Filter from './Filter'
import cartBlack from '../icons/cartHeader.png'
import heartDefault from '../icons/heart-default.png'

const Header = () => {
    const { setIsAuth, setVisibleLoginForm, filterProducts, setFilterProducts } = useContext(GlobalContext)
    const isAuth = localStorage.getItem('auth')
    const navigate = useNavigate()
    function loqout() {
        setIsAuth(false)
        localStorage.clear()
        setVisibleLoginForm(false)
        navigate('/about')
        console.log('loqout')
    }

    function login() {
        setVisibleLoginForm(true)
        console.log('login')
    }

    return (
        <header>
            <Link to="/about">
                <h2 className='logo'>Mob<span>Store</span></h2>
            </Link>
            {isAuth && <Filter filter={filterProducts} setFilter={setFilterProducts} />}
            {isAuth
                ? <div className='myProducts'>
                    <Link to={`/favorites`}>
                        <img className='myProducts__favorites' src={heartDefault} alt={`favorites`} />
                    </Link>
                    <Link to={`/cart`}>
                        <img className='myProducts__cart' src={cartBlack} alt={`cart`} />
                    </Link>
                    <ButtonMain>
                        <Link to="/products">Products</Link>
                    </ButtonMain>
                    <ButtonMain onClick={loqout}>
                        <Link to="/about">LOGOUT</Link>
                    </ButtonMain>
                </div>
                : <ButtonMain onClick={login}>
                    LOGIN
                </ButtonMain>
            }
        </header>
    )
}

export default Header
