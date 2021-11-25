import React, { useContext } from 'react'
import { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'

const AuthorizeRoute = () => {

    const [authenticated] = useContext(AuthContext)

    const { component: Component, ...rest } = this.props;

    return <Route {...rest}
        render={(props) => {
            if (authenticated) {
                return <Component {...props} />
            }
            else {
                return <Redirect to={redirectUrl} />
            }
        }}
    />
}

export default AuthorizeRoute;