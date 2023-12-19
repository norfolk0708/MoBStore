import React, { useContext, useEffect, useState } from 'react'
import Select from './UI/selects/Select'
import Input from './UI/Inputs/Input'
import { GlobalContext } from '../context/createContext'
import IconBtn from './UI/buttons/IconBtn'
import sort from '../icons/header/sort.png'
import toogleClass from '../utils/toogleClass'

const Filter = ({ status }) => {
    const { allProductsList, myProducts, filterProducts, setFilterProducts } = useContext(GlobalContext)
    const [clickOnHeader, setClickOnHeader] = useState(false)
    const [productsList, setProductsList] = useState(allProductsList)
    const [sortStatus, setSortStatus] = useState()

    function clickOnHeaderFunc() {
        setClickOnHeader(prevState => !prevState)
    }

    useEffect(() => {
        const myPage = window.location.pathname

        switch (myPage) {
            case '/products':
                setProductsList(allProductsList)
                break;
            case '/glocery':
                setProductsList(myProducts.glocery)
                break;
            case '/favorites':
                setProductsList(myProducts.favorites)
                break;

            default:
                setProductsList(allProductsList)
            //navigate('/products')
        }

    }, [clickOnHeader])

    const categories = [...new Set(Array.from(productsList, ({ category }) => category))]
    const sortOptions = ['discountPercentage', 'price', 'rating']

    return (
        <div className={status} onClick={clickOnHeaderFunc}>
            <Input
                value={filterProducts.query}
                onChange={e => setFilterProducts({ ...filterProducts, query: e.target.value })}
                placeholder='Search...'
                type='text'
            />
            {status.includes('active') && <IconBtn props={{ name: `Sort`, icon: sort, className: 'header__sort' }} toogleClass={toogleClass} />}
            <Select
                onChange={selectedSort => setFilterProducts({ ...filterProducts, category: selectedSort })}
                value={filterProducts.category}
                options={categories}
                defaultValue='Category'
            />
            <Select
                onChange={selectedSort => setFilterProducts({ ...filterProducts, sort: selectedSort })}
                value={filterProducts.sort}
                options={sortOptions}
                defaultValue='Sortе'
            />
        </div>
    )
}

export default Filter
