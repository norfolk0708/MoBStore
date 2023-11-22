import React, { useContext, useEffect, useState } from 'react'
import Select from './UI/selects/Select'
import Input from './UI/Inputs/Input'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../context/createContext'

const Filter = ({ filter, setFilter }) => {
    const { allProductsList, myProducts } = useContext(GlobalContext)
    const navigate = useNavigate()
    const [clickOnHeader, setClickOnHeader] = useState(false)
    const [productsList, setProductsList] = useState(allProductsList)

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
        <div onClick={clickOnHeaderFunc} style={{ display: "flex" }}>
            <Select
                onChange={selectedSort => setFilter({ ...filter, category: selectedSort })}
                value={filter.category}
                options={categories}
                defaultValue='Choose category'
            />
            <Select
                onChange={selectedSort => setFilter({ ...filter, sort: selectedSort })}
                value={filter.sort}
                options={sortOptions}
                defaultValue='Sortе'
            />
            <Input
                value={filter.query}
                onChange={e => setFilter({ ...filter, query: e.target.value })}
                placeholder='Enter name of product...'
                type='text'
            />
        </div>
    )
}

export default Filter
