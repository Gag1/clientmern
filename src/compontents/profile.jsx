import { useSelector } from 'react-redux';
import {useNavigate, useLocation } from 'react-router-dom';
import { userInfoData } from '../redux/reducers/userInfoReducer';


function Profile(){
   
  const state = useSelector(userInfoData);


   const navigate = useNavigate();

    return (
      <div className='profile'>
        <div className="cont">
            <div className="col">
          
       
        <p>This is your dashboard, welcome {state.userInfo.name}</p>

        <div className="onlinePeople"></div>
        <span>Online Users ( Soon ! )</span>

        <br /><br />
        <button className='logoutButton' onClick={() =>{
          localStorage.removeItem("loggedIn")
          localStorage.removeItem("jwtToken")
          navigate('/login');
          

        }}>logOut</button>

      </div>     
      </div>
     </div>
    );
  
};
export default Profile;