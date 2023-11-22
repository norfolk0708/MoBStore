import { useContext, useMemo } from 'react'

export const useFilterProduct = (productsList ,filter) => {
    let sortedProductList = productsList
    useMemo(() => {
        if (filter.category) {
            console.log('filter.category')
            sortedProductList = sortedProductList.filter(product => product.category == filter.category)
        }

        if (filter.query) {
            console.log('filter.query')
            sortedProductList = sortedProductList.filter(product => product.title.toLowerCase().includes(filter.query.toLowerCase()))
        }

        if (filter.sort) {
            console.log('filter.sort')
            function byField(fieldName) {
                return (a, b) => a[fieldName] > b[fieldName] ? 1 : -1;
            }
            sortedProductList = sortedProductList.sort(byField(filter.sort))
        }
        console.log('useFilterProduct')
    }, [filter])
    

    return sortedProductList
}