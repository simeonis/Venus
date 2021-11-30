import React, {useContext, useEffect} from 'react'
import {AuthContext} from "../../context/AuthContext";

const Auth = () => {
    const { user, getUser } = useContext(AuthContext);
    
    useEffect(()=>{
        getUser();
    }, [])

    return(
        <div>
            <h1>Auth!</h1>
            {
                user ? <div>{user.name}</div> : null
            }
        </div>
    )
}

export default Auth