import React, {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "../Css/Login.css"

const Login=()=>{

  const [loginForm, setLoginForm] = useState({
          employeecode: "",
          password: "",
          
      })
  const [error ,setError]=useState({
    empCodeValid:"",
    passwordValid: "",
  })
  // const [jwt, setJwt] = useState({
  //   token: "",
  // })
  const navigate = useNavigate()
      const handleInput=(event) => {
            const target = event.target;
            const value = target.value;
            const name = target.name;
            setLoginForm({...loginForm, [name]: value})
            }
    const handleSubmit=(event) =>{ 
      if(loginForm.employeecode.length ===0){
        setError({
          empCodeValid:"* enter employee code",
        })
      }
      else if(loginForm.password.length === 0){
        setError({
          passwordValid:"* enter password",
        })
      }
      else{
          var loginData = new FormData()
          loginData.append('employee_code',loginForm.employeecode)
          loginData.append('password',loginForm.password)
            // const  = {
            //   "employee_code": loginForm.employeecode,
            //   // "password": loginForm.password
            // }
            console.log(loginData)
            event.preventDefault();
            setLoginForm({
              employeecode :"",
              password:""
            });
        
        axios.post('http://127.0.0.1:5000/employee/login',loginData)
        .then(response => {
          localStorage.setItem('token',response.data.token)
          localStorage.setItem('employee_role',response.data.employee_role)
          localStorage.setItem('employee_id',response.data.employee_id)
          localStorage.setItem('isAuthenticated',"true")
          navigate('/')
        })
        .catch(error => {
          console.log(error);
          alert("wrong password or employee code")
        });
      }
    }
  return(
  <div className="border">
    <h2>Login Here</h2>
  <div className="mb-3">
    <label  className="form-label">Employee Code</label>
    <input autoComplete="off" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="employeecode" value={loginForm.employeecode} onChange={handleInput} style={{width:"350px"}}/>
    <small style={{color:"red"}}>{error.empCodeValid}</small>
  </div>
  <div className="mb-3">
    <label  className="form-label">Password</label>
    <input autoComplete="off" type="password" className="form-control" id="exampleInputPassword1" name="password" value={loginForm.password} onChange={handleInput} style={{width:"350px"}}/>
    <small style={{color:"red"}}>{error.passwordValid}</small>
  </div>
  <Link to="/forgetpass">Forget Password</Link>
  <br/><br/>
  <input type="submit" value="Login" className="btn btn-primary login" onClick={handleSubmit}/>
</div>
  )
}

export default Login

