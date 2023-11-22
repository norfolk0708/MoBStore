import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../../hooks/useFetching'
import FetchService from '../../API/FetchService'
import { toCapitalLetter } from '../../utils/toCapitalLetter'

const ProductsCard = () => {
    const id = useParams().id
    const [productInfo, setProductInfo] = useState('')
    const [fetchProduct, IsLoading, Error] = useFetching(async () => {
        const response = await FetchService.getByID(id)
        let productInfo = response.data
        for (let key in productInfo) {
            productInfo[key] = toCapitalLetter(productInfo[key])
        }

        setProductInfo(productInfo)
    })

    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <div className='card'>
            <div className='card__title'>{productInfo.title}</div>
            <div className='card__images'>
                {productInfo.images && productInfo.images.map((url, ind) => {
                    return (
                        <img className='card__image' src={url} alt={`Image-${ind + 1}`} key={url} />
                    )
                })}
            </div>
            <div className='card__info'>
                <div className='card__price'>{productInfo.price} $</div>
                <div className='card__discountPercentage'>{productInfo.discountPercentage} %</div>
                <div className='card__rating'>Raiting: {productInfo.rating}</div>
                <div className='card__stock'>Available: {productInfo.stock} pieces.</div>
                <div className='card__brand'>Brand: {productInfo.brand}</div>
                <div className='card__category'>Category: {productInfo.category}</div>
            </div>
        </div>
    )
}

export default ProductsCard