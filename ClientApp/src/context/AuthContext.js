import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false)


    const login = (loginDto) => {

        console.log("login " + JSON.stringify(loginDto))

        axios.post('https://localhost:5001/api/account/login', loginDto)
            .then(response => setResponse(response))
            .catch(error => {
                setError(error);
                console.error('There was an error!', error);
            });

        if (OK) {
            getUser();
        }
    }

    const register = (userDto) => {

        console.log("Register " + JSON.stringify(userDto))

        axios.post('https://localhost:5001/api/account/register', userDto)
            .then(response => setResponse(response))
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
                authenticated
            }}>
            {children}
        </AuthContext.Provider>
    );
};
