import { useState } from "react"

export const useMyContext = () => {
    const [isAuth, setIsAuth] = useState(false)
    const [isVisibleLoginForm, setVisibleLoginForm] = useState(false)
    const [allProductsList, setAllProductsList] = useState('')
    const [filterProducts, setFilterProducts] = useState({ category: '', sort: '', query: '' })
    const [myProducts, setMyProducts] = useState({ favorites: [], cart: [] })

    return { 
        isAuth, setIsAuth, 
        isVisibleLoginForm, setVisibleLoginForm, 
        allProductsList, setAllProductsList, 
        filterProducts, setFilterProducts, 
        myProducts, setMyProducts
    }
}