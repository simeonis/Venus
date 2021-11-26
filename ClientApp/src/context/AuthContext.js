import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory  } from 'react-router-dom';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false)
    const [error, setError] = useState();

    const history = useHistory();

    useEffect(() => {
        console.log("In Use Effect " + authenticated)

        if (authenticated) {
            history.push('/auth/home')
        }

    }, [authenticated])

    const login = (loginDto) => {

        console.log("login " + JSON.stringify(loginDto))

        let service = axios.create({
            baseURL: "https://localhost:44301/api/",
            responseType: "json"
        });

        service.post('https://localhost:44301/api/account/login', loginDto)
            .then(response => {
                if (response !== null) {
                    console.log("RESP " + JSON.stringify(response))
                    setUser(response)
                    setAuthenticated(true)
                }

            })
            .catch(error => {
                setError(error.response);
                setAuthenticated(false)
                console.error('There was an error!', error.response);
            });
    }

    const register = (userDto) => {

        console.log("Register " + JSON.stringify(userDto))

        axios.post('https://localhost:44301/api/account/register', userDto)
            .then()
            .catch(error => {
                setError(error);
                console.error('There was an error!', error);
            });
    }

    const getUser = () => {
        //axios.get(User)
        if (user) {
            setUser(user)
            setAuthenticated(true)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                login,
                register,
                authenticated,
                error
            }}>
            {children}
        </AuthContext.Provider>
    );
};
