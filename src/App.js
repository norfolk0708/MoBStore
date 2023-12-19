import { BrowserRouter} from 'react-router-dom'
import './styles/App.scss'
import AppRouter from './AppRouter/AppRouter'
import Header from './components/Header'
import { GlobalContext } from './context/createContext'
import { useGlobalContext } from './hooks/context/useGlobalContext'

function App() {
    const globalContextInfo = useGlobalContext()

  	return (
        <GlobalContext.Provider value={globalContextInfo}>
            <BrowserRouter >
                <Header />
                <main>
                    <AppRouter />
                </main>
                <footer>
                    <h1>This is a footer!</h1>
                </footer>
		    </BrowserRouter>
        </GlobalContext.Provider>
	)
}

export default App
