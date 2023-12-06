import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../../hooks/useFetching'
import FetchService from '../../API/FetchService'
import { toCapitalLetter } from '../../utils/toCapitalLetter'
import Slider from '../../components/slider/Slider'
import Loader from '../../components/UI/loaders/Loader'

const ProductsCard = () => {
    const id = useParams().id
    const [productInfo, setProductInfo] = useState([])
    const [getInfo, isLoading, error] = useFetching(async () => {
        const response = await FetchService.getByID(id)
        let productInfo = await response.data
        for (let key in productInfo) {
            productInfo[key] = toCapitalLetter(productInfo[key])
        }
        setProductInfo(() => {
            return productInfo
        })
    })

    useEffect(() => {
        getInfo()
    }, [])

    const card = () => {
        console.log([getInfo, isLoading, error])
        console.log(productInfo, 'productInfo')

        return (
            <>
                <div className='card__title'>{productInfo.title}</div>
                <Slider
                    width={'100%'}
                    height={'100%'}
                    autoPlay={false}
                    autoPlayTime={5000}
                    images={productInfo.images}
                />
                <div className='card__info'>
                    <div className='card__price'>{productInfo.price} $</div>
                    <div className='card__discountPercentage'>{productInfo.discountPercentage} %</div>
                    <div className='card__rating'>Raiting: {productInfo.rating}</div>
                    <div className='card__stock'>Available: {productInfo.stock} pieces.</div>
                    <div className='card__brand'>Brand: {productInfo.brand}</div>
                    <div className='card__category'>Category: {productInfo.category}</div>
                    <div className='card__category'>Description: {productInfo.description}</div>
                </div>
            </>
        )
    }

    return (
        <div className='card'>
            {error
                ? <p className='message'>{error}</p>
                : isLoading
                    ? <Loader />
                    : card()
            }
        </div>
    )
}

export default ProductsCard



/*
    <div className='card__images'>
        {productInfo.images && productInfo.images.map((url, ind) => {
            return (
                <img className='card__image' src={url} alt={`Image-${ind + 1}`} key={url} />
            )
        })}
    /div>
*/
