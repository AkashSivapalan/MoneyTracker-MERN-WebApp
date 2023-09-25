import { useContext, useState, useEffect, createContext } from "react";
import jwt from 'jwt-decode'
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        try {
            const jwt = localStorage.getItem("token");
            const acc = jwtDecode(jwt);
            setUser(acc)
        } catch(error) { }
        
        setLoading(false)
    }, [])
    
    const loginUser = async(userInfo) => {
        setLoading(true)

        try {
            const url = import.meta.env.VITE_REACT_APP_API_URL + '/login';

            const email = userInfo.email
            const password = userInfo.password

            const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
            })
            });

            const data = await response.json()
            console.log(data.user)

            if (data.user) {
                const acc = jwt(data.user);
                localStorage.setItem('token',data.user)
                alert('Login successful')
                setUser(acc)
            } else {
                alert('Please check your username and password')
            }

        } catch (error) {
            console.log(error)
        }

        setLoading(false)
     }
    const logoutUser = () => {
        localStorage.removeItem("token");
        setUser(null);

    }
    const registerUser = async(userInfo) => { 
        setLoading(true)

        try {
            const url = import.meta.env.VITE_REACT_APP_API_URL + '/register';
            const name = userInfo.name
            const email = userInfo.email
            const password = userInfo.password1
            
            
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                    name,
                })
            });

            const data = await response.json()

            console.log(data)



        } catch(error) {
            console.log(error)
        }

        setLoading(false)
    }


    const checkUserStatus = () => {
        
    }

    const contextData = {
        user,
        loginUser,
        logoutUser,
        registerUser,

    }
     
    return (
        <AuthContext.Provider value={ contextData}>
        {loading ? <p>Loading...</p>: children}
    </AuthContext.Provider>)

}

export const useAuth = () => { return useContext(AuthContext) }

export default AuthContext