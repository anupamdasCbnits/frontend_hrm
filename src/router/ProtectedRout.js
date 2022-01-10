import React ,{Suspense}from "react";
import { Navigate , Outlet } from "react-router-dom";

function ProtectedRoute() {
    let auth = localStorage.getItem("isAuthenticated");
  
    if (!auth) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login"/>;
    }
    return(

    <Suspense fallback={<div>Loading</div>}>
     <Outlet />;
    </Suspense>
    )
    
  }


export default ProtectedRoute;