import React, {useState} from 'react';
import axios from 'axios'


export const Register  = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const [response, setResponse] = useState("")
    const [error, setError] = useState("")
    const [nameError, setNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(name === ""){
            setNameError("Name cannot be empty")
        }
        if(email === ""){
            setEmailError("Email cannot be empty")

        }
        if(password === ""){
            setPasswordError("Password cannot be empty")
        }
        else{

            const userDto = { 
                name: name, 
                email : email, 
                password: password
            };

            //axios.post('https://localhost:5001/api/account/register', userDto)
            //    .then(response => setResponse(response))
            //    .catch(error => {
            //        setError(error);
            //        console.error('There was an error!', error);
            //    });
        }
    }

    return (
      <div className="container d-flex flex-column align-items-center ">
            <h1>Sign Up</h1>
            {/* <!-- w-400 = width: 40rem (400px), mw-full = max-width: 100% --> */}
            <form  className="w-400 mw-full">
                {/* <!-- name --> */}
                <div className="form-group">
                    <p className="text-danger">{nameError}</p>
                    <label for="full-name" className="required">Full name</label>
                    <input type="text" className="form-control" id="full-name" placeholder="Full name" required="required" onChange={(e) => setName(e.target.value)} />
                </div>

                {/* <!-- Email --> */}
                <div className="form-group">
                    <p className="text-danger">{emailError}</p>
                    <label for="email" className="required">Email</label>
                    <input type="text" className="form-control" id="email" placeholder="Email" required="required" onChange={(e) => setEmail(e.target.value)}  />
                </div>

                {/* <!-- Password --> */}
                <div className="form-group">
                    <p className="text-danger">{passwordError}</p>
                    <label for="password" className="required">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" required="required" onChange={(e) => setPassword(e.target.value)}  />
                </div>

                {/* <!-- Radio --> */}
                <div className="form-group">
                    <label for="gender-male" className="required">Gender</label>
                    <div className="custom-radio">
                    <input type="radio" name="gender" id="gender-male" value="male" required="required" />
                    <label for="gender-male">Male</label>
                    </div>
                    <div className="custom-radio">
                    <input type="radio" name="gender" id="gender-female" value="female" required="required" />
                    <label for="gender-female">Female</label>
                    </div>
                    <div className="custom-radio">
                    <input type="radio" name="gender" id="gender-other" value="other" required="required" />
                    <label for="gender-other">Other</label>
                    </div>
                </div>

              {/* <!-- Switch --> */}
              <div className="form-group">
                    <div className="custom-switch">
                    <input type="checkbox" id="am-developer" />
                    <label for="am-developer">Developer</label>
                    </div>
                </div>

                {/* <!-- Select --> */}
                <div className="form-group">
                    <label for="area-of-specialization" className="required">Area of specialization</label>
                    <select className="form-control" defaultValue="" id="area-of-specialization" required="required">
                    <option value="" disabled="disabled">Select your area of specialization</option>
                    <option value="front-end">Front-end</option>
                    <option value="back-end">Back-end</option>
                    <option value="full-stack">Full-stack</option>
                    </select>
                </div>

                {/* <!-- Multi-select --> */}
                <div className="form-group">
                    <label for="languages" className="required">Platform</label>
                    <select className="form-control" id="languages" multiple="multiple" required="required" size="5">
                    <option value="javascript">Windows</option>
                    <option value="python">Mac</option>
                    <option value="php">Linux</option>
                    </select>
                </div>

                {/* <!-- Textarea --> */}
                {/* <div className="form-group">
                    <label for="description">Description</label>
                    <textarea className="form-control" id="description" placeholder="Write a short description about yourself."></textarea>
                </div> */}


                {/* <!-- Switch --> */}
                <div className="form-group">
                    <div className="custom-switch">
                    <input type="checkbox" id="remember-my-information" onChange={(e) => setRememberMe(e.target.checked)}  />
                    <label for="remember-my-information">Remember my information</label>
                    </div>
                </div>

                {/* <!-- Checkbox --> */}
                <div className="form-group">
                    <div className="custom-checkbox">
                    <input type="checkbox" id="agree-to-terms" />
                    <label for="agree-to-terms">I agree to all the <a href="#" className="hyperlink">terms and conditions</a></label>
                    </div>
                </div>

                {/* <!-- Submit button --> */}
                <button className="btn btn-primary" onClick={(e) => handleSubmit(e)} >Submit</button>
            </form>
      </div>
    );
  }