import React, { useContext, useEffect, useRef } from 'react'
import Product from '../../components/Product'
import { GlobalContext } from '../../context/createContext'
import { useFilterProduct } from '../../hooks/useFilterProduct'
import { toCapitalLetter } from '../../utils/toCapitalLetter'
import cryingCat from '../../icons/cat-crying.gif'
import Loader from '../../components/UI/loaders/Loader'

const Products = ({ hook }) => {
    const { myProducts, setMyProducts, filterProducts } = useContext(GlobalContext)
    const [productsList, isLoading, error] = hook()
    const sortedProductList = useFilterProduct(productsList, filterProducts)
    const currentPage = toCapitalLetter(window.location.pathname.slice(1))
    const list = useRef('')
    const renderCount = useRef(1)

    useEffect(() => {
        list.current = ''
        renderCount.current++
        console.log(renderCount.current, 'products')
    })

    const changeCart = (product, products) => {
        if (product.cart) {
            product.cart = false
            const productsInCart = (myProducts.cart.filter(p => p.id !== product.id))
            setMyProducts({ ...myProducts, cart: productsInCart })

        } else {
            list.current = products
            product.cart = true
            setMyProducts({ ...myProducts, cart: [...myProducts.cart, product] })
        }
    }

    const changeFavorite = (product, products) => {
        if (product.favorites === '100%') {
            product.favorites = '0%'
            const favoritesProduct = (myProducts.favorites.filter(p => p.id !== product.id))
            setMyProducts({ ...myProducts, favorites: favoritesProduct })
        } else {
            list.current = products
            product.favorites = '100%'
            setMyProducts({ ...myProducts, favorites: [...myProducts.favorites, product] })
        }
    }

    const currentProductList = list.current || sortedProductList

    return (
        <div className="container">
            {error
                ? <h1>Some error: {error}</h1>
                : isLoading
                    ? <Loader />
                    : currentProductList.length
                        ? <div className='productList'>
                            {currentProductList.map((product, _, products) =>
                                <Product
                                    product={product}
                                    products={products}
                                    key={product.id}
                                    changeCart={changeCart}
                                    changeFavorite={changeFavorite} />
                            )}
                        </div>
                        : <>
                            <p className='message'>{`${currentPage} list is empty`}</p>
                            <img className='product__cat' src={cryingCat} alt={`cryingCat`} />
                        </>
            }
        </div>
    )
}

export default Products
