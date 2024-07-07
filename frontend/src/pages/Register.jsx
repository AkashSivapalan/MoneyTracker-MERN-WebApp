import React,{useRef} from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {

  const registrationForm = useRef(null)

  const { registerUser } = useAuth();
  const notify = () => toast.error("Passwords do not match!");

  const handleSubmit = (e) => {
    e.preventDefault()
    const name = registrationForm.current.name.value;
    const email = registrationForm.current.email.value;
    const password1 = registrationForm.current.password1.value;
    const password2=registrationForm.current.password2.value;
  
    if (password1 !== password2) {
      notify()
      return
    }
    const userInfo = { name, email, password1, password2 }
    registerUser(userInfo)

  
  }



  return (
    <div className="container">
      <div className="login-register-container">
        <form ref={registrationForm} onSubmit={handleSubmit}>

          <div className="form-field-wrapper">
                <label>Name:</label>
                <input 
                  required
                  type="text" 
                  name="name"
                  placeholder="Enter name..."
                  />
            </div>

            <div className="form-field-wrapper">
                <label>Email:</label>
                <input 
                  required
                  type="email" 
                  name="email"
                  placeholder="Enter email..."
                  />
            </div>

            <div className="form-field-wrapper">
                <label>Password:</label>
                <input 
                  type="password"
                  name="password1" 
                  placeholder="Enter password..."
                  />
            </div>

            <div className="form-field-wrapper">
                <label>Confirm Password:</label>
                <input 
                  type="password"
                  name="password2" 
                  placeholder="Confirm password..."
                  />
            </div>


            <div className="form-field-wrapper">

                <input 
                  type="submit" 
                  value="Register"
                  className="btn"
                  />

            </div>

        </form>

        <p>Already have an account? <Link to="/login">Login</Link></p>

      </div>
  </div>
  )
}

export default Register
