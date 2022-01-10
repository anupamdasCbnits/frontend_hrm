import React,{useState} from "react";
import Header from "../Component/Header"
import "../Css/CreateEmp.css"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const CreateEmployee = () =>{

    const [createEmployee, setCreateEmployee] = useState({
        country_name : "",
        first_name : "",
        last_name : "",
        employee_role : "",
        employee_code : "",
        email : "",
        phno : "",
        password : "",
        password2 : "",
        gender : "male",
    })
    const [error, setError] = useState({
        Errcountry_name : "",
        Errfirst_name : "",
        Errlast_name : "",
        Erremployee_role : "",
        Erremployee_code : "",
        Erremail : "",
        Errphno : "",
        Errpassword : "",
        Errpassword2 : "",
        Errgender : "",
    })
    const navigate = useNavigate()
    const handleInput=(event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setCreateEmployee({...createEmployee, [name]: value})
        }
    const handleSubmit = (event)=>{
        if(createEmployee.employee_code.length ===0){
            setError({
                Erremployee_code:"* enter employee code",
            })
          }
          else if(createEmployee.first_name.length ===0){
            setError({
                Errfirst_name:"* enter first name",
            })
          }
          else if(createEmployee.last_name.length ===0){
            setError({
                Errlast_name:"* enter last name",
            })
          }
          else if(createEmployee.country_name.length ===0){
            setError({
                Errcountry_name:"* enter country name",
            })
          }
          else if(createEmployee.employee_role.length ===0){
            setError({
                Erremployee_role:"* enter employee role",
            })
          }
          else if(createEmployee.phno.length ===0){
            setError({
                Errphno:"* enter phone number",
            })
          }
          else if(createEmployee.email.length ===0){
            setError({
                Erremail:"* enter email id",
            })
          }
          else if(createEmployee.password.length ===0){
            setError({
                Errpassword:"* enter employee role",
            })
          }
          else if(createEmployee.password2.length ===0){
            setError({
                Errpassword2:"* enter employee role",
            })
          }
          else{
            var createEmpData = new FormData()
            createEmpData.append('employee_code',createEmployee.employee_code)
            createEmpData.append('first_name',createEmployee.first_name)
            createEmpData.append('last_name',createEmployee.last_name)
            createEmpData.append('employee_role',createEmployee.employee_role.toLowerCase())
            createEmpData.append('country_name',createEmployee.country_name.toLowerCase())
            createEmpData.append('email',createEmployee.email)
            createEmpData.append('phno',createEmployee.phno)
            createEmpData.append('password',createEmployee.password)
            createEmpData.append('password2',createEmployee.password2)
            createEmpData.append('gender',createEmployee.gender)
            console.log(createEmpData)
            console.log(createEmployee)
            axios.post('http://127.0.0.1:5000/employee/',createEmpData,{headers:{
                'x-access-token': localStorage.getItem('token')}})
            .then(response => {
                navigate('/')
            })
            .catch(error => {
            console.log(error);
            alert("wrong data entered")
            });
            setCreateEmployee({
                country_name : "",
                first_name : "",
                last_name : "",
                employee_role : "",
                employee_code : "",
                email : "",
                phno : "",
                password : "",
                password2 : "",
                gender : "male",
            })
        }
        event.preventDefault();
    }
        
        
    return (
        <>
        <Header/>
        <div className="CreateEmpForm">
        <h2>Create Employee Form</h2><b/>
        <div className="mb-3">
            <label className="form-label">Employee Code</label>
            <input name="employee_code" className="form-control" type="text" aria-label="default input example" value={createEmployee.employee_code} onChange={handleInput} />
            <small style={{color:"red"}}>{error.Erremployee_code}</small>
        </div>
        <div className="mb-3">
            <label className="form-label">Employee First Name</label>
            <input name="first_name" className="form-control" type="text" aria-label="default input example" value={createEmployee.first_name} onChange={handleInput} />
            <small style={{color:"red"}}>{error.Errfirst_name}</small>
        </div>
        <div className="mb-3">
            <label className="form-label">Employee Last Name</label>
            <input name="last_name" className="form-control" type="text" aria-label="default input example" value={createEmployee.last_name} onChange={handleInput} />
            <small style={{color:"red"}}>{error.Errlast_name}</small>
        </div>
        <div className="mb-3">
            <label className="form-label">Country</label>
            <input name="country_name" className="form-control" type="text" aria-label="default input example" value={createEmployee.country_name} onChange={handleInput} />
            <small style={{color:"red"}}>{error.Errcountry_name}</small>
        </div>
        <div className="mb-3">
            <label className="form-label">Employee Role</label>
            <input name="employee_role" className="form-control" type="text" aria-label="default input example" value={createEmployee.employee_role} onChange={handleInput}/>
            <small style={{color:"red"}}>{error.Erremployee_role}</small>
        </div>
        <div className="mb-3">
            <label className="form-label">Gender</label>
            <div className="form-check">
            <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault1" value="male" checked={createEmployee.gender === "male"} onChange={handleInput} />
            <label className="form-check-label">
                Male
            </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault2" value="female" checked={createEmployee.gender === "female"} onChange={handleInput}  />
            <label className="form-check-label">
                Female
            </label>
            </div>
        </div>
        <div className="mb-3">
            <label className="form-label">Ph number</label>
            <input name="phno" className="form-control" type="text" aria-label="default input example" value={createEmployee.phno} onChange={handleInput}/>
            <small style={{color:"red"}}>{error.Errphno}</small>
        </div>
        <div className="mb-3">
            <label className="form-label">Email Id</label>
            <input name="email" className="form-control" type="text" aria-label="default input example" value={createEmployee.email} onChange={handleInput} />
            <small style={{color:"red"}}>{error.Erremail}</small>
        </div>
        <div className="mb-3">
            <label className="form-label">Password</label>
            <input name="password" className="form-control" type="password" aria-label="default input example" value={createEmployee.password} onChange={handleInput} />
            <small style={{color:"red"}}>{error.Errpassword}</small>
        </div>
        <div className="mb-3">
            <label className="form-label">Re-enter Password</label>
            <input name="password2" className="form-control" type="password" aria-label="default input example" value={createEmployee.password2} onChange={handleInput}/>
            <small style={{color:"red"}}>{error.Errpassword2}</small>
        </div>
        <input type="submit" value="Create New Employee" style={{width:"200px"}}  className="btn btn-primary" onClick={handleSubmit}/>
        </div>
        </>)
};

export default CreateEmployee