import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';

function ConfirmEmail(){   
    const navigate = useNavigate(); 

    const location = useLocation();
    const confirmToken = new URLSearchParams(location.search).get('token');
    
    useEffect(() =>{
        fetch(`https://backendmern-gag1.vercel.app/confirm-email?token=${confirmToken}`).then((res) => {
         console.log(res);

          if(res.ok) {
            setTimeout(() => {
                navigate('/login')
            }, 4000);
          } 
        })  
       
    
  },[])

    return(
        <div>
            please check your email , and press confirmation button .
            
        </div>
    )
}

export default ConfirmEmail;
