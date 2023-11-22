import { Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from './routes'

const AppRouter = () => {
    const isAuth = localStorage.getItem('auth')
    return (
        isAuth
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route path={route.path} element={route.element} key={route.path} />
                )}
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route path={route.path} element={route.element} key={route.path} />
                )}
            </Routes>
    )
}

export default AppRouter
