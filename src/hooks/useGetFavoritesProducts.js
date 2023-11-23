import { useContext, useEffect} from "react"
import { GlobalContext } from "../context/createContext"
import { useFetching } from "./useFetching"

export const useGetFavoritesProducts = () => {
    const { myProducts } = useContext(GlobalContext)
    const [fetchProducts, isLoading, error] = useFetching(async () => {
    })

    useEffect(() => {
        console.log('useGetFavoritesProducts in useEffect')
        fetchProducts()
        
        //setFilterProducts({ category: '', sort: '', query: '' })
    }, [])

    return [myProducts.favorites, isLoading, error]

}