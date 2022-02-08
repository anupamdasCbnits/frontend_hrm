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
    localStorage.removeItem("leave_span_id")
    localStorage.removeItem("leave_type_id")
    navigate('/login')
  }

  if (employee_role === "hr"){
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
      <a className="navbar-brand">CBNITS</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      </button>
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/" >Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/viewprofile" >View Profile</NavLink>
      </li>
      {/* <li className="nav-item">
        <NavLink className="nav-link" to="/list_employee">List Employee</NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link" to="/create_employee">Create Employee</NavLink>
      </li> */}
      <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Emoployee Manage
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><NavLink className="dropdown-item" to="/list_employee">List Employee</NavLink></li>
            <li><NavLink className="dropdown-item" to="/create_employee">Create Employee</NavLink></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Leave Section
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><NavLink className="dropdown-item" to="/applyleave">Apply For Leave</NavLink></li>
            <li><NavLink className="dropdown-item" to="/showleave">Show Leave Status</NavLink></li>
          </ul>
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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
      <a className="navbar-brand">CBNITS</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      </button>
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/" >Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/viewprofile" >View Profile</NavLink>
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