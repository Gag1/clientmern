import jwt_decode from 'jwt-decode';
import { useState } from "react";
import {useNavigate} from 'react-router-dom';


function Login() {

  const navigate = useNavigate();
  const [logined,isLogined] = useState(true);
  const [values,setValues] = useState({
    email:'',
    password:''
  })
  
  const postData = () =>{
    fetch('https://backendmern-gag1.vercel.app/loginedData',{
      method:'post',
      headers:{'content-type':'application/json'},
      body:JSON.stringify(values)
    })
    .then((res) =>{
      if(res.ok){
        return res.json()
      }
    })
    .then((res) =>{
      if(res){
        localStorage.setItem('jwtToken', res.token);
        localStorage.setItem('loggedIn',true);
        navigate('/profile');
       

      }else{
        console.log('something went wrong !!');
        isLogined(false)
      }
    })
  }
  

  const handleInputData = (e) =>{
      const newValues = values;
      newValues[e.target.id] = e.target.value;
      setValues(newValues);
  }


  return (
    <div className='register login'>
      <form onSubmit={(e) =>{
        e.preventDefault();
        postData();
     }} action="">

        <label htmlFor="">email</label>
        <input onChange={(e) => handleInputData(e) } id="email" type="email"  name="email" />

        <label htmlFor="">password</label>
        <input onChange={(e) => handleInputData(e) } id="password" type="password" name="password" />
        
       <button>Sign In</button>
       <button id='login' onClick={(e) => navigate('/register')}>Sign Up</button>
      <br />
       <button className='forgotPassButton' onClick={() => navigate('/forgotpassword')}>Forgot Password?</button>
       <br /><br />
       <span style={{color:"red"}}> {logined ? "" : "Username or Password is incorrect ! "}</span>
      </form>
    </div>
  );
}

export default Login;
