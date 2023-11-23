import React, { useEffect, useState, useContext } from 'react'
import defaultCart from '../icons/cartDefault.png'
import activeCart from '../icons/cartActive.png'
import { Link } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching'
import ProductLoader from './UI/loaders/ProductLoader'

import addSound from '../audio/add.mp3'
import removeSound from '../audio/remove.mp3'
import { GlobalContext } from '../context/createContext'

const Product = ({ product, products, returnProdustsList }) => {
    const ratingPercentage = `${product.rating * 20}%`
    const lastPrice = ((product.discountPercentage * product.price) / 10).toFixed(0) + ' $'
    const image = product.thumbnail
    const { myProducts, setMyProducts } = useContext(GlobalContext)

    const [fetching, isLoading, error] = useFetching(() => {
        console.log('useFetching in Product')
    })

    const changeProduct = (products, product, key) => {
        if (product[key]) {
            product[key] = false
            const sortedProducts = (myProducts[key].filter(p => p.id !== product.id))
            setMyProducts({ ...myProducts, [key]: sortedProducts })
            new Audio(removeSound).play()
        } else {
            product[key] = true
            setMyProducts({ ...myProducts, [key]: [...myProducts[key], product] })
            new Audio(addSound).play()
        }

        window.location.pathname === '/products' && returnProdustsList(products)
    }
    const cartStatus = product.cart ? activeCart : defaultCart
    const favoritesStatus = product.favorites ? '100%' : '0%'

    useEffect(() => {
        fetching()
    }, [])

    return (
        <>
            {error
                ? <h1>Some error: {error}</h1>
                : isLoading
                    ? <ProductLoader />
                    : <div className='product'>
                        <div className='product__head'>
                            <Link className='product__title' to={`/products/${product.id}`}>{product.title}</Link>
                            <div className='product__favorites' onClick={() => changeProduct(products, product, 'favorites')}>
                                <div className='product__favorites__body'>
                                    <div className='product__favorites__active' style={{ width: favoritesStatus }}></div>
                                    <input type='radio' className='product__favorites__item' value={1} name='rating'></input>
                                </div>
                            </div>
                        </div>
                        <Link className='product__image' to={`/products/${product.id}`}>
                            <img className='product__image' src={image} alt={`${product.id}`} />
                        </Link>
                        <div className='product__info'>
                            <div className='product__price'>{product.price} $
                                {product.discountPercentage > 12 && <div className='product__discount'>{lastPrice}</div>}
                            </div>
                            <div className='product__rating'>
                                <div className='product__rating__body'>
                                    <div className='product__rating__active' style={{ width: ratingPercentage }}></div>
                                    <div className='product__rating__items'>
                                        <input type='radio' className='product__rating__item' value={1} name='rating'></input>
                                        <input type='radio' className='product__rating__item' value={2} name='rating'></input>
                                        <input type='radio' className='product__rating__item' value={3} name='rating'></input>
                                        <input type='radio' className='product__rating__item' value={4} name='rating'></input>
                                        <input type='radio' className='product__rating__item' value={5} name='rating'></input>
                                    </div>
                                </div>
                                <img className='product__cart' onClick={() => changeProduct(products, product, 'cart')} src={cartStatus} alt={'cart'} />
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default Product
