import React, { useEffect, useState } from 'react'
import defaultCart from '../icons/cartDefault.png'
import activeCart from '../icons/cartActive.png'
import { Link } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching'
import ProductLoader from './UI/loaders/ProductLoader'

const Product = ({ product, products, changeCart, changeFavorite }) => {
    const ratingPercentage = `${product.rating * 20}%`
    const lastPrice = ((product.discountPercentage * product.price) / 10).toFixed(0) + ' $'
    const image = product.thumbnail
    const [addFavorites, setAddFavorites] = useState('0%')
    const [cart, setCart] = useState(defaultCart)

    const [fetching, isLoading, error] = useFetching(() => {
        product.cart ? setCart(activeCart) : setCart(defaultCart)
        product.favorites === '100%' ? setAddFavorites('100%') : setAddFavorites('0%')
        console.log('useFetching in Product ccolo')
    })

    useEffect(() => {
        fetching()
    }, [changeFavorite, changeCart])

    return (
        <>
            {error
                ? <h1>Some error: {error}</h1>
                : isLoading
                    ? <ProductLoader />
                    : <div className='product'>
                        <div className='product__head'>
                            <Link className='product__title' to={`/products/${product.id}`}>{product.title}</Link>
                            <div className='product__favorites' onClick={() => changeFavorite(product, products)}>
                                <div className='product__favorites__body'>
                                    <div className='product__favorites__active' style={{ width: addFavorites }}></div>
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
                                <img className='product__cart' onClick={() => changeCart(product, products)} src={cart} alt={'cart'} />
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default Product
