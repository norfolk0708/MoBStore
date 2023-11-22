import { Navigate } from "react-router-dom"
import Error from "./pages/Error"
import Products from "./pages/Products"
import Login from "./pages/Login"
import ProductsCard from "./pages/ProductsCard"
import About from "./pages/About"
import { useGetAllProducts } from "../hooks/useGetAllProducts"
import { useGetGloceryProducts } from "../hooks/useGetGloceryProducts"
import { useGetFavoritesProducts } from "../hooks/useGetFavoritesProducts"

export const privateRoutes = [
    {path: '', element: <About />}, 
    {path: 'about', element: <About />}, 
    {path: 'products', element: <Products hook={useGetAllProducts} />}, 
    {path: 'products/:id', element: <ProductsCard />}, 
    {path: 'glocery', element: <Products hook={useGetGloceryProducts} />}, 
    {path: 'favorites', element: <Products hook={useGetFavoritesProducts} />}, 
    {path: 'error', element: <Error />},
    {path: 'login', element: <Login />},
    {path: '*', element: <Navigate to='/error' />}, 
]

export const publicRoutes = [
    {path: '', element: <About />},
    {path: 'about', element: <About />}, 
    {path: 'login', element: <Login />},
    {path: '*', element: <Navigate to='/error' />}, 
]