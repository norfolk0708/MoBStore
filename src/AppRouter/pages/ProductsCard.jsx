import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../../hooks/useFetching'
import FetchService from '../../API/FetchService'
import { toCapitalLetter } from '../../utils/toCapitalLetter'
import Slider from '../../components/ProductCard/slider/Slider'
import Loader from '../../components/UI/loaders/Loader'
import CardInfo from '../../components/ProductCard/CardInfo'

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
        return (
            <>
                <div className='card__title'>{productInfo.title}</div>
                <Slider
                    autoPlay={true}
                    autoPlayTime={3000}
                    images={productInfo.images}
                />
                <CardInfo productInfo={productInfo} />
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
