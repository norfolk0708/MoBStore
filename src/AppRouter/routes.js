import { Navigate } from "react-router-dom"
import Error from "./pages/Error"
import Products from "./pages/Products"
import Login from "./pages/Login"
import ProductsCard from "./pages/ProductsCard"
import About from "./pages/About"
import { useGetProducts } from "../hooks/useGetProducts"
import { useGetСartProducts } from "../hooks/useGetСartProducts"
import { useGetFavoritesProducts } from "../hooks/useGetFavoritesProducts"

export const privateRoutes = [
    {path: '', element: <About />}, 
    {path: 'about', element: <About />}, 
    {path: 'products', element: <Products hook={useGetProducts} />}, 
    {path: 'products/:id', element: <ProductsCard />},
    {path: 'cart', element: <Products hook={useGetСartProducts} />}, 
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