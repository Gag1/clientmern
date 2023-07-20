import jwtDecode from 'jwt-decode';
import {Outlet,Navigate} from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function ProtectedRoute() {

  const dispatch = useDispatch();
 
     const token = localStorage.getItem('jwtToken');
     let isAuthenticated = false;
     

     if(token){
       const decodedToken = jwtDecode(token);
       const currentTime = Date.now() / 1000;
       if (decodedToken.exp > currentTime) {
          isAuthenticated = true;
          dispatch({
            payload:{
              name: decodedToken.userName,
              id: decodedToken.userId
            },
            type:'authenticatedUserData'
          })
       }else{
          isAuthenticated = false;
       }
     }
     
   

  return (
    isAuthenticated ? <Outlet /> : <Navigate to="/login" />
  )
}

export default ProtectedRoute;


