import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import Product from '../../components/Product'
import Loader from '../../components/UI/loaders/Loader'
import { GlobalContext } from '../../context/createContext'
import { useFilterProduct } from '../../hooks/useFilterProduct'

const Products = ({ hook }) => {
    const { filterProducts, setFilterProducts } = useContext(GlobalContext)
    const [productsList, isLoading, error] = hook()

    const sortedProductList = useFilterProduct(productsList, filterProducts)
    const myPage = window.location.pathname
    const renderCount = useRef(1)
    useEffect(() => {
        renderCount.current++
        console.log(renderCount.current, 'products')
    })

    return (
        <div className="container">
            {error
                ? <h1>Some error: {error}</h1>
                : isLoading
                    ? <Loader />
                    : sortedProductList.length
                        ? <div className='productList'>
                            {sortedProductList.map((product) =>
                                <Product product={product} key={product.id} />
                            )}
                        </div>
                        : <h1>{`${myPage} list is empty`}</h1>
            }
        </div>
    )
}

export default Products
