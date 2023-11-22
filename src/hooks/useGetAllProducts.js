import {useContext, useEffect} from 'react'
import FetchService from "../API/FetchService"
import { useFetching } from "./useFetching"
import { GlobalContext } from "../context/createContext"

export const useGetAllProducts = () => {
    const { allProductsList, setAllProductsList } = useContext(GlobalContext)
    const [fetchProducts, isLoading, error] = useFetching(async () => {
        if (!allProductsList)  {
            const response = await FetchService.getAllProduct()
            const allProductsList = response.data.products
            allProductsList.forEach(product => {
                product.inGlocery = false
                product.inFavorites = '0%'
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
