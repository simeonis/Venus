import React from 'react';
import { Link } from 'react-router-dom';

export const Login = () => {

    return (
      <div className="container d-flex flex-column align-items-center ">
            <h1>Login</h1>
            {/* <!-- w-400 = width: 40rem (400px), mw-full = max-width: 100% --> */}
            <form action="..." method="..." className="w-400 mw-full">
                {/* <!-- Input --> */}
                <div className="form-group">
                    <label for="full-name" className="required">Email</label>
                    <input type="text" className="form-control" id="full-name" placeholder="Full name" required="required" />
                </div>

                <div className="form-group">
                    <label for="password" className="required">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" required="required" />
                </div>

                {/* <!-- Switch --> */}
                <div className="form-group">
                    <div className="custom-switch">
                    <input type="checkbox" id="remember-me" />
                    <label for="remember-me">Remember me</label>
                    </div>
                </div>

                {/* <!-- Submit button --> */}
                <input className="btn btn-primary" type="submit" value="Login" />
                <p>Don't have an account: <Link to="/signup">Sign Up</Link></p>

            </form>
      </div>
    );
}