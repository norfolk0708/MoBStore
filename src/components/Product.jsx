import React, { useContext, useEffect, useState } from 'react'
import gloceryGrey from '../icons/grocery-store-grey.png'
import gloceryOrange from '../icons/grocery-store-orange.png'
import { Link } from 'react-router-dom'
import ProductLoader from '../components/UI/loaders/ProductLoader'
import { useFetching } from '../hooks/useFetching'
//import { GlobalContext } from '../context/createContext'

const Product = ({ product }) => {
    //const { myProducts, setMyProducts } = useContext(GlobalContext)
    const ratingPercentage = `${product.rating * 20}%`
    const lastPrice = ((product.discountPercentage * product.price) / 10).toFixed(0) + ' $'
    const image = product.thumbnail
    const [addFavorites, setAddFavorites] = useState('0%')
    const [glocery, setGlocery] = useState(gloceryGrey)

    const [fetching, isLoading, error] = useFetching(() => {
        product.inGlocery ? setGlocery(gloceryOrange) : setGlocery(gloceryGrey)
        product.inFavorites === '100%' ? setAddFavorites('100%') : setAddFavorites('0%')
    })

    useEffect(() => {
        fetching()
        console.log('useFetching in Product')
    }, [product])

    const changeGlocery = () => {
        if (product.inGlocery) {
            product.inGlocery = false
            setGlocery(gloceryGrey)
            //const productsInGlocery = (myProducts.glocery.filter(p => p.id !== product.id))
            //setMyProducts(() => {
            // return { ...myProducts, glocery: productsInGlocery }
            //})

        } else {
            product.inGlocery = true
            setGlocery(gloceryOrange)
            //setMyProducts(() => {
            //   return { ...myProducts, glocery: [...myProducts.glocery, product] }
            //})
        }
        // console.log(myProducts.glocery, 'myProducts.glocery')
    }

    const changeFavorite = () => {
        if (product.inFavorites == '100%') {
            product.inFavorites = '0%'
            setAddFavorites('0%')
            //const productsInFavorites = (myProducts.favorites.filter(p => p.id !== product.id))
            /*setMyProducts({ ...myProducts, favorites: productsInFavorites })*/
        } else {
            product.inFavorites = '100%'
            setAddFavorites('100%')
            /* setMyProducts({ ...myProducts, favorites: [...myProducts.favorites, product] })*/
        }
        //console.log(myProducts.favorites, 'myProducts.favorites')
    }

    return (
        <>
            {error
                ? <h1>Some error: {error}</h1>
                : isLoading
                    ? <ProductLoader />
                    : <div className='product'>
                        <div className='product__head'>
                            <Link className='product__title' to={`/products/${product.id}`}>{product.title}</Link>
                            <div className='product__favorites' onClick={changeFavorite}>
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
                                {product.discountPercentage > 5 && <div className='product__discount'>{lastPrice}</div>}
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
                                <img className='product__glocery' onClick={changeGlocery} src={glocery} alt={'grocery'} />
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default Product
