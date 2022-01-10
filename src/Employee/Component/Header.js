import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
const Header = () =>{
  const navigate = useNavigate()

  const employee_role = localStorage.getItem("employee_role")


  const logoutHabdle =()=>{
    
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("token")
    localStorage.removeItem("employee_id")
    localStorage.removeItem("employee_role")
    navigate('/login')
  }

  if (employee_role === "hr"){
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
      <p className="navbar-brand">CBNITS</p>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      </button>
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/" >Home</NavLink>
      </li>
      
      <li className="nav-item">
        <NavLink className="nav-link" to="/list_employee">List Employee</NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link" to="/create_employee">Create Employee</NavLink>
      </li>
      
    </ul>
      <button className="btn btn-danger" type="submit" onClick={logoutHabdle}>Logout</button>
  </div>
</div>
</nav>
  );
}else{
  return(
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
      <p className="navbar-brand">CBNITS</p>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      </button>
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/" >Home</NavLink>
      </li>
    </ul>
      <button className="btn btn-danger" type="submit" onClick={logoutHabdle}>Logout</button>
  </div>
</div>
</nav>
    </>
  )
}
    
    
};

export default Header