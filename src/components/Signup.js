import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom';
// const BASE_URL = process.env.REACT_APP_BASE_URL
const BASE_URL = "https://ibook-backend.onrender.com"

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:"" })
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = credentials; // destructuring -> taking out name, email, pswd from credentials
    const response = await fetch(`${BASE_URL}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save the aut   h token and redirect
      localStorage.setItem('token',json.authtoken);
      navigate('/')
      props.showAlert("Account created successfully", "success");
    }
    else {
      props.showAlert("Invalid Credentials", "danger");
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className='container mt-2'>
      <h2 className='my-3'>Create an account to use iBook</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control"  onChange={onChange} id="name" name= "name" aria-describedby="emailHelp" />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control"  onChange={onChange} id="email" name= 'email' aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control"  onChange={onChange} id="password" name="password" minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" onChange={onChange} id="cpassword" name="cpassword" minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>


    </div>
  )
}

export default Signup