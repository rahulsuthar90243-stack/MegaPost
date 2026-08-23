import React, {useEffect, useState} from 'react'
import { useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'


function Protected({children, authentication = true}) {  //authentication -> true meanse user must be logged in to access the page, false means user must be logged out to access the page

    const navigate = useNavigate();
    const [loader, setLoader] = useState();
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
    if(authentication && authStatus != authentication){
       navigate("/login")
    }else if(!authentication && authStatus != authentication){
        navigate("/")
    }
    setLoader(false)
    }, [authStatus, navigate, authentication])
  return (
    loader ? <h1>Loadign...</h1> : <>{children}</>
  )
}

export default Protected


