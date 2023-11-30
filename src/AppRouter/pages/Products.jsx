import React, { useContext, useEffect, useRef, useState } from 'react'
import Product from '../../components/Product'
import { GlobalContext } from '../../context/createContext'
import { useFilterProduct } from '../../hooks/useFilterProduct'
import { toCapitalLetter } from '../../utils/toCapitalLetter'
import cryingCat from '../../icons/cat-crying.gif'
import Loader from '../../components/UI/loaders/Loader'
import { useFetching } from '../../hooks/useFetching'


const Products = ({ hook }) => {
    const { filterProducts } = useContext(GlobalContext)
    const [productsList, isLoading, error] = hook()
    const sortedProductList = useFilterProduct(productsList, filterProducts)
    const currentPage = toCapitalLetter(window.location.pathname.slice(1))
    const list = useRef(null)
    const observer = useRef(null)
    const MyIntersectionObserver = useRef('')

    const [countList, setCountList] = useState(15)


    useEffect(() => {
        list.current = ''
    })

    const currentList = products => list.current = products
    const actualList = list.current || sortedProductList

    function infinityScroll() {
        if (MyIntersectionObserver == '') return
        if (observer.current) observer.current.disconnect()

        const options = {
            root: document.querySelector('container'),
            rootMargin: '20%',
            threshold: 0
        }
        const callback = function (entries, observer) {
            if (entries[0].isIntersecting) {
                setCountList(countList + 10)
            }
        }

        observer.current = new IntersectionObserver(callback, options)
        observer.current.observe(MyIntersectionObserver.current)
    }
    useEffect(() => {
        //infinityScroll()
    }, [])


    return (
        <div className="container">
            {error
                ? <p className='message'>{error}</p>
                : isLoading
                    ? <Loader />
                    : actualList.length
                        ? <>
                            <div className='productList' onLoad={infinityScroll}>
                                {actualList.map((product, _, products) =>
                                    <Product
                                        product={product}
                                        products={products}
                                        key={product.id}
                                        currentList={currentList} />
                                ).slice(0, countList)}
                            </div>
                            <div ref={MyIntersectionObserver}></div>
                        </>
                        : <>
                            <p className='message'>{`${currentPage} list is empty`}</p>
                            <img className='product__cat' src={cryingCat} alt={`cryingCat`} />
                        </>
            }
        </div>
    )
}

export default Products
