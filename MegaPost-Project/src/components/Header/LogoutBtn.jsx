import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite.config'
import { logout } from '../../store/authSlice'
 
function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        }).catch((error) => {
            console.log("LogoutBtn :: logoutHandler error: ", error);
        })
    }
  return (
    <button className='inline-block bg-blue-500 hover:bg-blue-700
     text-white font-bold py-2 px-4 rounded'>
      Logout</button>
  )
}
