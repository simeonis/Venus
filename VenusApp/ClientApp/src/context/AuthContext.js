import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory  } from 'react-router-dom';
import { ApiUrls } from "../constants/ApiConstants";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [projectList, setProjectList] = useState([]);
    const [authenticated, setAuthenticated] = useState(false)
    const [error, setError] = useState();

    const history = useHistory();

    useEffect(() => {
        getUser()
        getProjects()
        
        if (authenticated) {
            history.push('/home')
        }

    }, [authenticated])

    const login = (loginDto) => {
        
        axios.post(ApiUrls.login, loginDto)
            .then(response => {
                if (response !== null) {
                    setAuthenticated(true)
                }
            })
            .catch(error => {
                setError(error.response);
                setAuthenticated(false)
            });
    }

    const register = (userDto) => {
        axios.post(ApiUrls.register, userDto)
            .then(() =>{
                history.push("/login")
            })
            .catch(error => {
                setError(error.response.data);
            });
    }

    const getUser = () => {
        axios.post(ApiUrls.getUser)
            .then(response => {
                if (response !== null) {
                    setUser(response.data)
                    setAuthenticated(true)
                }
            })
            .catch(error => {
                setAuthenticated(false)
            });
    }

    //API request to get list of projects
    const getProjects = () => {
        axios.get(ApiUrls.getAllProjects)
            .then(response => {
                if (response !== null) {
                    setProjectList(response.data)
                }
            })
            .catch(error => {
                //should handle
            })
    }
    
    const logout = () =>{
        axios.post(ApiUrls.logOut)
            .then(response => {
                if (response !== null) {
                    setUser(null)
                    setAuthenticated(false)
                }
            })
            .catch(error => {
                setError(error.response);
                setAuthenticated(false)
            });
    }

    return (
        <AuthContext.Provider
            value={{
                login,
                register,
                getUser,
                logout,
                getProjects,
                authenticated,
                user,
                projectList,
                error,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
