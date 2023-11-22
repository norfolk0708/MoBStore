import { useContext, useEffect} from "react"
import { useFilterProduct } from "./useFilterProduct"
import { GlobalContext } from "../context/createContext"
import { useFetching } from "./useFetching"

export const useGetGloceryProducts = () => {
    const { myProducts, setMyProducts, setFilterProducts} = useContext(GlobalContext)
    const [fetchProducts, isLoading, error] = useFetching(async () => {
    })

    useEffect(() => {
        fetchProducts()
        console.log('useGetgloceryProducts in useEffect')
        //setFilterProducts({ category: '', sort: '', query: '' })
    }, [])

    return [myProducts.glocery, isLoading, error]

}