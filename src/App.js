import { BrowserRouter} from 'react-router-dom'
import './styles/App.scss'
import AppRouter from './AppRouter/AppRouter'
import Header from './components/Header'
import { GlobalContext } from './context/createContext'
import { useMyContext } from './hooks/useMyContext'

function App() {
    const myContext = useMyContext()

  	return (
        <GlobalContext.Provider value={myContext}>
            <BrowserRouter>
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
