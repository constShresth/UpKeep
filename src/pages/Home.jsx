import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const {isAuthenticated, userRole} = useAuth();
  if(isAuthenticated){
    return <Navigate to={`/${userRole}/home`}/>
  }else{
    return <Navigate to={"/login"}/>
  }
}

export default Home