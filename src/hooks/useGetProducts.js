import {useContext, useEffect} from 'react'
import FetchService from "../API/FetchService"
import { useFetching } from "./useFetching"
import { GlobalContext } from "../context/createContext"

export const useGetProducts = () => {
    const { allProductsList, setAllProductsList } = useContext(GlobalContext)
    
    const [fetchProducts, isLoading, error] = useFetching(async () => {
        if (!allProductsList)  {
            const response = await FetchService.getAllProducts()
            const allProductsList = response.data.products

            allProductsList.forEach(product => {
                product.cart = false
                product.favorites = false
            })

            setAllProductsList(allProductsList)
            console.log('useGetProducts')
        }
    })

    useEffect(() => {
        fetchProducts()
    }, [])

    return [allProductsList, isLoading, error]
}
