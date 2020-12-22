import {useCallback, useContext, useState} from 'react'
import loginService from '../services/login'
import logoutService from '../services/logout'

export default function useUser () {
  const [jwt, setJWT] = useState(
    () => window.sessionStorage.getItem('jwt')
  )
  const [state, setState] = useState({ loading: false, error: false });

  const login = useCallback((data) => {
    setState({loading: true, error: false })
    loginService(data)
      .then(jwt => {
        if(jwt===true){
          console.log(jwt);
          window.sessionStorage.setItem('jwt', jwt)
          setState({loading: false, error: false })
          setJWT(jwt)
        }else{
          setState({loading: false, error: true })

        }
        
      })
      .catch(err => {
        window.sessionStorage.removeItem('jwt')
        setState({loading: false, error: true })
        console.error(err)
      })
  }, [setJWT])

  const logout = useCallback(() => {
    window.sessionStorage.removeItem('jwt')
    logoutService()
    setJWT(null)
  }, [setJWT])

  return {
    isLogged: Boolean(jwt),
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    login,
    logout
  }
} 