import React from 'react'
import CardItem from './CardItem'

const CardInfo = ({ productInfo }) => {
    console.log(productInfo, 'productInfo')
    const name = Object.keys(productInfo)
    const value = Object.values(productInfo)

    //const sortedProductInfo = Object.values(productInfo).
    const sortedProductInfo = [
        { name: 'Category', value: productInfo.category },
        { name: 'Price', value: productInfo.price + ' $' },
        { name: 'Rating', value: productInfo.rating },
        { name: 'Stock', value: productInfo.stock + ' pieces' },
        { name: 'Discount percentage', value: productInfo.discountPercentage + ' %' },
        { name: 'Description', value: productInfo.description },
    ]
    return (
        <div className='card__info'>
            {sortedProductInfo.map(info => <CardItem info={info} key={info.name} />)}
        </div>
    )
}

export default CardInfo
