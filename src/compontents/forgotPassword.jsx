import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () =>{
    const navigate = useNavigate();
    const [value,setValue] = useState('');
    const [confirm,setConfirm] = useState(null);

    const getPassword = () =>{
       fetch('https://backendmern-gag1.vercel.app/resetPassword',{
        method:'post',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({email:value})
       }).then((res) =>{
        if(res.ok){
          return  setConfirm(true);
        }
        return setConfirm(false);
       })
    }
    const [resetPasswordData,setResetPasswordData] = useState({
      code:'',
      password:''
    });





    const [isUppercaseNumber, setWarningForPassword] = useState(null);
    const handleInputData = (e) =>{

      const newValues = resetPasswordData;
      newValues[e.target.id] = e.target.value;
      const inputValue = e.target.value;

      const passRe = /(?=.*[A-Z])(?=.*[0-9])/;
      if(e.target.id == "password"){
       setTimeout(() => {
        if(passRe.test(inputValue) && inputValue.length >=7){
          setWarningForPassword(true);
           
       }else{
        setWarningForPassword(false);
         
       }
   }, 500);
      }

   
       setResetPasswordData(newValues);
    }

    const postEmailCodeAndPassword = () =>{
      if(isUppercaseNumber == false){
         return
      }
      fetch('https://backendmern-gag1.vercel.app/postEmailCodeAndPassword',{
        method:'post',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(resetPasswordData)
       }).then((res) =>{
        if(res.ok){
          navigate('/login');
         return res.json();
        }
       }).then((res) => {
        console.log(res);
       })
    }


    return (
    <div className="forgotPassword register">
      <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor=""> {!confirm ? 'what is your email address ?' : 'Please check your emaill , we have sent a code that you should write it here !'} </label>
         
         { !confirm ?  <input  placeholder="email" onChange={(e) => setValue(e.target.value)} name="name" type="text" /> : '' }
          <span style={{display:"block"}}>{confirm == false ? 'wrong email' : ''}</span>
           {!confirm ?  <button onClick={() => getPassword()}>submit</button> : <input id="code" onChange={(e) => handleInputData(e)} type='text' placeholder="code" />}
           <br />
           {confirm && <input id="password" onChange={(e) => handleInputData(e) } placeholder="new password" type="text" /> }
           {confirm && <span style={{color:"red"}}>{isUppercaseNumber == false ? "use at least one uppercase, one number and the minimum length must be 7!" : ""}</span> }
           <br />
           {confirm && <button onClick={(e) => postEmailCodeAndPassword(e)}>submit</button>}
          
          { !confirm && <button onClick={() => navigate('/register')}>Sign Up</button> }
          { !confirm && <button id="login" onClick={() => navigate('/login')}>Sign In</button> }
          

        </form>
    </div>
    )
}

export default ForgotPassword;