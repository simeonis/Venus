import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const { login, error } = useContext(AuthContext);

    const handleSubmit = (e) =>{
        e.preventDefault();
       
        if(email === ""){
            setEmailError("Email cannot be empty")
        }
        if(password === ""){
            setPasswordError("Password cannot be empty")
        }
        else{

            const loginDto = { 
                email : email, 
                password: password,
            };

            login(loginDto)
        }
    }

    return (
      <div className="container d-flex flex-column align-items-center">
            <h1>Login</h1>
            <form className="w-400 mw-full">
                {
                    error ? <p className="text-danger">{error.data}</p> : null
                }
                {/* <!-- Input --> */}
                <div className="form-group">
                    <p className="text-danger">{emailError}</p>
                    <label htmlFor="email" className="required">Email</label>
                    <input type="text" className="form-control" id="email" placeholder="Email" required="required" onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <p className="text-danger">{passwordError}</p>
                    <label htmlFor="password" className="required">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" required="required" onChange={(e) => setPassword(e.target.value)} />
                </div>
                
                {/* <!-- Submit button --> */}
                <div className="d-flex align-items-center justify-content-center flex-column">
                    <input className="btn btn-primary w-half" type="submit" value="Login" onClick={(e) =>handleSubmit(e)} />
                    <h2 className="line-wrap pt-5 "><span>Or</span></h2>

                </div>
                <p>Don't have an account: <Link to="signup">Sign Up</Link></p>

            </form>
      </div>
    );
}