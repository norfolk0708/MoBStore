import { useContext, useEffect} from "react"
import { GlobalContext } from "../context/createContext"
import { useFetching } from "./useFetching"

export const useGetСartProducts = () => {
    const { myProducts } = useContext(GlobalContext)
    const [fetchProducts, isLoading, error] = useFetching(async () => {
    })

    useEffect(() => {
        fetchProducts()
        console.log('useGetСartProducts in useEffect')
        //setFilterProducts({ category: '', sort: '', query: '' })
    }, [])


    return [myProducts.cart , isLoading, error]

}