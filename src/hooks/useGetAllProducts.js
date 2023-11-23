import {useContext, useEffect} from 'react'
import FetchService from "../API/FetchService"
import { useFetching } from "./useFetching"
import { GlobalContext } from "../context/createContext"
import { useFilterProduct } from './useFilterProduct'

export const useGetAllProducts = () => {
    const { allProductsList,  filterProducts, setAllProductsList } = useContext(GlobalContext)
    
    const [fetchProducts, isLoading, error] = useFetching(async () => {
        if (!allProductsList)  {
            const response = await FetchService.getAllProduct()
            const allProductsList = response.data.products
            allProductsList.forEach(product => {
                product.cart = false
                product.favorites = false
            })
            setAllProductsList(allProductsList)
            console.log('useGetAllProducts')
        }
    })

    useEffect(() => {
        fetchProducts()
        console.log('useGetAllProducts')
    }, [])

    return [allProductsList, isLoading, error]
}
