import React from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children , pageRole}) => {
  const { isAuthenticated ,userRole} = useAuth();
  console.log(isAuthenticated)
  console.log("userRole",userRole)
  console.log("pageRole",pageRole)
  if(!isAuthenticated && userRole!=pageRole) {
    return <Navigate to="/login" />
  }else if(isAuthenticated && userRole!=pageRole){
    return <Navigate to={`/${userRole}/home`} />
  }
  else{
      return children;
  }
  
  // if(userRole!=pageRole){
  //   return (
  //     <div className="flex items-center justify-center mt-4">
  //       <div className="flex flex-col justify-center items-center">

  //         <div className=" text-4xl">You are not supposed to be here.</div>
  //         <button className="border-2 rounded-md bg-red-950 text-gray-300 p-4 mt-4">

  //           <Link to={`/${userRole}/home`} className="hover:text-gray-200">{`Go back to ${userRole} page.`}</Link>
  //         </button>
  //       </div>

  //     </div>
  //   )
  // }
  
  // return  children ;

  
};

export default ProtectedRoute;
