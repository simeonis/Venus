import React, { useContext } from 'react'
import { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'

const AuthorizeRoute = ({ component: Component, redirectPath = "/", ...rest }) => {

    const { authenticated } = useContext(AuthContext)

    console.log("authenticated " + authenticated)

    return <Route {...rest}
        render={(props) => {
            if (authenticated) {
                return <Component {...props} />
            }
            else {
                console.log("Redirecting...")
                return <Redirect to={redirectPath} />
            }
        }}
    />
}

export default AuthorizeRoute;