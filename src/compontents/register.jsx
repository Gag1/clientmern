import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Register (){

    const [values, setValues] = useState({
        name:'',
        email:'',
        password:''
    });


    const navigate = useNavigate(); 

    const postData =  () =>{
        fetch('https://backendmern-gag1.vercel.app/registeredData',{
            method:'post',
            headers:{'content-type':'application/json'},
            body:JSON.stringify(values)
        })
        .then((res) => {
            if(res.ok){
                navigate('/confirmation');
                return res.json()
            }
        })
        .then((res) =>{
            if(res){
                console.log(res);
            }else{
                console.log('something went wrong ');
            }
        })
      
    }
  
    const [isLetter,setWarningforName ] = useState(null); 
    const [isUppercaseNumber,setWarningforPassword ] = useState(null); 
    const [isValidEmail,setWarningforEmail ] = useState(true); 
    const [isPosted, shouldPostData] = useState(true);

    let refPassword = useRef();
    let refName = useRef();
    let refEmail = useRef();

    const handleInputData = (e) =>{
       // newValues i hascen nuyn values i hascena darnum hetevabar 
       // newValues i  arjeqy poxeluc values i mejel kpoxvi

       const newValues = values;
       const inputValue = e.target.value
       newValues[e.target.id] = inputValue;

       setTimeout(() => {
       const nameRe = /^[A-Za-z]+$/;
        if(e.target.id == "name"){
         if(nameRe.test(inputValue) && inputValue.length >= 3 && refName.current){
           
            refName.current.style.border = "1px solid green";
            setWarningforName(true);
            
        }else{
            if(refName.current){
                refName.current.style.border = "1px solid red";

            }
            setWarningforName(false);
        }
        
       }
    }, 500);

       const passRe = /(?=.*[A-Z])(?=.*[0-9])/;
       if(e.target.id == "password"){
        setTimeout(() => {
         if(passRe.test(inputValue) && inputValue.length >=7 && refPassword.current){
            setWarningforPassword(true);
            refPassword.current.style.border = "1px solid green";
            
        }else{
            setWarningforPassword(false);
            if(refPassword.current ){
                refPassword.current.style.border = "1px solid red";
            }
        }
    }, 500);
       }
       const emailRe =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
       setTimeout(() => {
        if(e.target.id == "email"){
            if(emailRe.test(inputValue) && refEmail.current){
             refEmail.current.style.border = "1px solid green";
             setWarningforEmail(true);
            }else{
             refEmail.current.style.border = "1px solid red";
             setWarningforEmail(false);
 
            }
        }
      }, 500);
      

       setValues(newValues);
    }
    

    return(
        <div className="register">
            <form onSubmit={(e) =>{
                e.preventDefault();
                if(isUppercaseNumber && isLetter && isValidEmail){
                    postData();

                }else{
                    shouldPostData(false);

                }
                
                
            }} action="">
                <label htmlFor="">name</label>
                <input ref={refName} onChange={(e) => handleInputData(e) } id="name" type="text" name="name" />
                <span style={{color:'red'}}> {isLetter == false ? "use only letters and the minimum length must be 3!" : ""} </span>
               
                <label style={{display:"block"}} htmlFor="">email</label>
                <input ref={refEmail} onChange={(e) => handleInputData(e) } id="email" type="text"  name="email" />
                <span style={{color:"red"}} > {isValidEmail ? "" : "Please provide valid e-mail!"}</span> 

                <label  style={{display:"block"}} htmlFor="">password</label>
                <input ref={refPassword} onChange={(e) => handleInputData(e) } id="password" type="password" name="password" />
                <span style={{color:'red'}}> {isUppercaseNumber == false ? "use at least one uppercase, one number and the minimum length must be 7!" : ""} </span>

                <br />
                <button>Sign Up</button>
                <button id="login" onClick={(e) => navigate('/login') }>Sign In</button>
                <br /><br />
                <span style={{color:'red'}}>{isPosted  ? "" : "fields are required!" }</span>
            </form>
        </div>
    )
}
export default Register;