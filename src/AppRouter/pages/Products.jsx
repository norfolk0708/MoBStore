import React, { useContext, useEffect, useRef } from 'react'
import Product from '../../components/Product'
import { GlobalContext } from '../../context/createContext'
import { useFilterProduct } from '../../hooks/useFilterProduct'
import { toCapitalLetter } from '../../utils/toCapitalLetter'
import cryingCat from '../../icons/cat-crying.gif'
import Loader from '../../components/UI/loaders/Loader'


const Products = ({ hook }) => {
    const { filterProducts } = useContext(GlobalContext)
    const [productsList, isLoading, error] = hook()
    const sortedProductList = useFilterProduct(productsList, filterProducts)
    const currentPage = toCapitalLetter(window.location.pathname.slice(1))
    const list = useRef('')

    useEffect(() => {
        list.current = ''
    })

    const returnProdustsList = products => list.current = products
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
                                    returnProdustsList={returnProdustsList} />
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
