import Login from "./Login"
import Modal from "../../components/UI/modals/Modal"
import { useContext } from "react"
import { GlobalContext } from "../../context/createContext"

const About = () => {
    const { isAuth, isVisibleLoginForm } = useContext(GlobalContext)
    return (
        <div className="container">
            <p className='message'>ABOUT</p>
            {isVisibleLoginForm && !isAuth && <Modal> <Login /> </Modal>}
        </div >

    )
}

export default About
