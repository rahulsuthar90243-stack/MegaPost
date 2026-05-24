import { useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {authService} from './appwrite/auth';
import {login, logout} from './store/authSlice';

function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}));
      }else{
        dispatch(logout());
      }
    })
    .catch((error)=>{
      console.log("App.jsx :: useEffect error: ", error);
    })
    .finally(()=>{
      setloading(false);
    });
  }, [])

  return 
}

export default App
