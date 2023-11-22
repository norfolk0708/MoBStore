import React, { useContext } from 'react'
import Input from '../../components/UI/Inputs/Input'
import ButtonMain from '../../components/UI/buttons/ButtonMain'
import { GlobalContext } from '../../context/createContext'

const Login = () => {
    const { setIsAuth } = useContext(GlobalContext)

    function login(event) {
        setIsAuth(true)
        localStorage.setItem('auth', true)
        event.preventDefault()
    }

    return (
        <form onSubmit={login} >
            <Input type='text' placeholder='Login...' />
            <Input type='password' autoComplete='on' placeholder='Password...' />
            <ButtonMain>Увійти</ButtonMain>
        </form>
    )
}

export default Login
