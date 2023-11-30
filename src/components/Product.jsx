import React, { useEffect, useState, useContext, useRef } from 'react'
import defaultCart from '../icons/cartDefault.png'
import activeCart from '../icons/cartActive.png'
import { Link } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching'
import addSound from '../audio/add.mp3'
import removeSound from '../audio/remove.mp3'
import { GlobalContext } from '../context/createContext'
import { createArray } from '../utils/createArray'

const Product = ({ product, products, currentList }) => {
    const { myProducts, setMyProducts } = useContext(GlobalContext)
    const ratingPercentage = `${product.rating * 20}%`
    const lastPrice = ((product.price * (product.discountPercentage / 100)) + product.price).toFixed(0) + ' $'
    const cartStatus = product.cart ? activeCart : defaultCart
    const favoritesStatus = product.favorites ? '100%' : '0%'
    const [styles, setStyles] = useState({ opacity: 1, displayStatus: 'block', outlineColor: 'linear-gradient(322deg, #2a2930, #d1d7e0)' })

    //const [imageCount, setImageCount] = useState(0)
    const image = product.images[0]
    const imageOnload = useRef(false)
    //const imageOptimalSize = useRef({ count: imageCount, size: 0 })

    const [fetching, isLoading, error] = useFetching(async () => {
        imageOnload.current.onload = () => {
            /*let sizeDifference = imageOnload.current.naturalHeight - imageOnload.current.naturalWidth

            if (sizeDifference > imageOptimalSize.current.size) {
                imageOptimalSize.current = {
                    count: imageCount,
                    size: sizeDifference
                }
            }
            if (sizeDifference < 0) {
                if (product.images[imageCount + 1] && styles.opacity) {
                    console.log(imageCount, 'count')
                    setImageCount(imageCount + 1)
                }
            }
            if (sizeDifference >= 0 || product.images.length == imageCount + 1) {
                console.log(product.id, 'opacity 0')
                setImageCount(imageOptimalSize.current.count)
                setStyles({ ...styles, opacity: 0, outlineColor: '#CF7309' })
                setTimeout(setStyles, 2000, { ...styles, displayStatus: 'none' })
            }*/
            setStyles({ ...styles, opacity: 0, outlineColor: '#CF7309' })
            setTimeout(setStyles, 2000, { ...styles, displayStatus: 'none' })
        }
    })

    useEffect(() => {
        fetching()
    }, [image])

    const changeStatus = (products, product, key) => {
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

        window.location.pathname === '/products' && currentList(products)
    }

    return (
        <>
            {error
                ? <p className='message'>{error}</p>
                : !isLoading &&
                <div className='product' style={{ outline: `5px solid ${styles.outlineColor}` }}>
                    <div className='product__head'>
                        <Link className='product__title' to={`/products/${product.id}`}>{product.title}</Link>
                        <div className='product__favorites' onClick={() => changeStatus(products, product, 'favorites')}>
                            <div className='product__favorites__body'>
                                <div className='product__favorites__active' style={{ width: favoritesStatus }}></div>
                                <input type='radio' className='product__favorites__item' value={1} name='rating'></input>
                            </div>
                        </div>
                    </div>
                    <Link className='product__image' to={`/products/${product.id}`}>
                        <img ref={imageOnload} className='product__image' src={image} alt={`${product.id}`} />
                    </Link>
                    <div className='product__info'>
                        <div className='product__price'>
                            <div className='product__currentPrice'>{product.price} $</div>
                            {product.discountPercentage > 10 && <div className='product__discount'>{lastPrice}</div>}
                        </div>
                        <div className='product__rating'>
                            <div className='product__rating__body'>
                                <div className='product__rating__active' style={{ width: ratingPercentage }}></div>
                                <div className='product__rating__items'>
                                    {createArray(5).map((_, i) => <input type='radio' className='product__rating__item' value={i + 1} name='rating' key={i + 1}></input>)}
                                </div>
                            </div>
                            <img className='product__cart' onClick={() => changeStatus(products, product, 'cart')} src={cartStatus} alt={'cart'} />
                        </div>
                    </div>
                    <div className='product__loader' style={{ opacity: styles.opacity, display: styles.displayStatus }}></div>
                </div>
            }
        </>
    )
}

export default Product


/*let options = {
  root: document.querySelector("#scrollArea"),
  rootMargin: "0px",
  threshold: 1.0,
};

let observer = new IntersectionObserver(callback, options);*/