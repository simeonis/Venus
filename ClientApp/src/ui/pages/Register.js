import React, {useState, useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import { useHistory } from 'react-router-dom';


export const Register  = () => {
    const [userName, setuserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [nameError, setNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [devChecked, setDevChecked] = useState(false)
    const [specialization, setSpecialization] = useState("")
    const [platform, setPlatform] = useState("")
    
    const history = useHistory()

    const { register } = useContext(AuthContext);

    const handleSubmit = (e) =>{
        e.preventDefault();
        
        console.log("Password confirm " + passwordConfirm)

        if(userName === ""){
            setNameError("Name cannot be empty")
        }
        if(email === ""){
            setEmailError("Email cannot be empty")

        }
        if(password === ""){
            setPasswordError("Password cannot be empty")
        }
        if(passwordConfirm === ""){
            setPasswordError("Password Confirm cannot be empty")
        }
        if(passwordConfirm !== password)
        {
            setPasswordError("Passwords must match")
        }
        else{

            const userDto = { 
                userName: userName, 
                email : email, 
                password: password,
                passwordConfirm: passwordConfirm,
                dev: devChecked,
                specialization: specialization,
                platform: platform
            };
            
            console.log("User Dto " + JSON.stringify(userDto))

            register(userDto);
            
            history.push("/login")
        }
    }

    return (
      <div className="container d-flex flex-column align-items-center ">
            <h1>Sign Up</h1>
            {/* <!-- w-400 = width: 40rem (400px), mw-full = max-width: 100% --> */}
            <form  className="w-400 mw-full">
                {/* <!-- Name --> */}
                <div className="form-group">
                    <p className="text-danger">{nameError}</p>
                    <label htmlFor="user-name" className="required">User Name</label>
                    <input type="text" className="form-control" id="user-name" placeholder="user name" required="required" onChange={(e) => setuserName(e.target.value)} />
                </div>

                {/* <!-- Email --> */}
                <div className="form-group">
                    <p className="text-danger">{emailError}</p>
                    <label htmlFor="email" className="required">Email</label>
                    <input type="text" className="form-control" id="email" placeholder="Email" required="required" onChange={(e) => setEmail(e.target.value)}  />
                </div>

                {/* <!-- Password --> */}
                <div className="form-group">
                    <p className="text-danger">{passwordError}</p>
                    <label htmlFor="password" className="required">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" required="required" onChange={(e) => setPassword(e.target.value)}  />
                </div>

                {/* <!-- Password --> */}
                <div className="form-group">
                    <label htmlFor="password-confirm" className="required">Password Confirm</label>
                    <input type="password" className="form-control" id="password-confirm" placeholder="Password Confirm" required="required" onChange={(e) => setPasswordConfirm(e.target.value)}  />
                </div>

              {/* <!-- Switch --> */}
              <div className="form-group">
                    <div className="custom-switch">
                    <input type="checkbox" id="am-developer" onChange={(e)=>setDevChecked(e.target.checked)} />
                    <label htmlFor="am-developer">Developer</label>
                    </div>
                </div>

                {/* <!-- Select --> */}
                <div className="form-group">
                    <label htmlFor="area-of-specialization" className="required">Area of specialization</label>
                    <select className="form-control" defaultValue="" id="area-of-specialization" required="required"
                            onChange={(e) => setSpecialization(e.target.value)}>
                        <option value="" disabled="disabled">Select your area of specialization</option>
                        <option value="front-end">Front-end</option>
                        <option value="back-end">Back-end</option>
                        <option value="full-stack">Full-stack</option>
                    </select>
                </div>

                {/* <!-- Multi-select --> */}
                <div className="form-group">
                    <label htmlFor="languages" className="required">Platform</label>
                    <select className="form-control" id="languages"  required="required"
                            onChange={(e) => setPlatform(e.target.value)}>
                        <option value="windows">Windows</option>
                        <option value="mac">Mac</option>
                        <option value="linux">Linux</option>
                    </select>
                </div>
                
                {/* <!-- Submit button --> */}
                <button className="btn btn-primary" onClick={(e) => handleSubmit(e)} >Submit</button>
            </form>
      </div>
    );
  }