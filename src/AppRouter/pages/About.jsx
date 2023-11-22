import Login from "./Login"
import Modal from "../../components/UI/modals/Modal"
import { useContext } from "react"
import { GlobalContext } from "../../context/createContext"
import Loader from "../../components/UI/loaders/Loader"

const About = () => {
    const { isAuth, isVisibleLoginForm } = useContext(GlobalContext)
    return (
        <>
            <h1>ABOUT</h1>
            {isVisibleLoginForm && !isAuth && <Modal> <Login /> </Modal>}
        </>

    )
}

export default About
