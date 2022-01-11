import React,{useEffect, useState} from "react";
import Header from "../Component/Header"
import "../Css/CreateEmp.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
const UpdateProfile =()=>{
    const navigate = useNavigate()
    const [updateEmployee, setUpdateEmployee] = useState({
        country_name : "",
        first_name : "",
        last_name : "",
        email : "",
        phno : "",
        gender : "",
    })
    
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/employee/${localStorage.getItem('employee_id')}`,{headers:{
        'x-access-token': localStorage.getItem('token')
    }}).then(data => {
        setUpdateEmployee({
            country_name:data.data.country_name,
            email:data.data.email,
            employee_code: data.data.employee_code,
            employee_role: data.data.employee_role,
            employee_id:data.data.employee_id,
            first_name:data.data.first_name,
            gender:data.data.gender,
            last_name:data.data.last_name,
            phno:data.data.phno
        })
        console.log(data.data)
      })
      .catch(error => {
        console.log(error);
      });
    }, [])
    const handleInput=(event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setUpdateEmployee({...updateEmployee, [name]: value})
        }
        const handleSubmit = (event)=>{
            var updateEmpData = new FormData()
            updateEmpData.append('first_name',updateEmployee.first_name)
            updateEmpData.append('last_name',updateEmployee.last_name)
            updateEmpData.append('country_name',updateEmployee.country_name.toLowerCase())
            updateEmpData.append('email',updateEmployee.email)
            updateEmpData.append('phno',updateEmployee.phno)
            updateEmpData.append('gender',updateEmployee.gender)
            axios.put(`http://127.0.0.1:5000/employee/`,updateEmpData,{headers:{
                'x-access-token': localStorage.getItem('token')}})
            .then(response => {
                navigate('/viewprofile')
            })
            .catch(error => {
            console.log(error);
            alert("wrong data entered")
            });
            event.preventDefault()
            
        }
            
    return(
        <>
        <Header/>
        <div className="CreateEmpForm">
        <h2>Update Employee Form</h2><b/>
        <div className="mb-3">
            <label className="form-label">Employee First Name</label>
            <input name="first_name" className="form-control" type="text" aria-label="default input example" value={updateEmployee.first_name} onChange={handleInput} />
         
        </div>
        <div className="mb-3">
            <label className="form-label">Employee Last Name</label>
            <input name="last_name" className="form-control" type="text" aria-label="default input example" value={updateEmployee.last_name} onChange={handleInput} />

        </div>
        <div className="mb-3">
            <label className="form-label">Country</label>
            <input name="country_name" className="form-control" type="text" aria-label="default input example" value={updateEmployee.country_name} onChange={handleInput} />
            
        </div>
        <div className="mb-3">
            <label className="form-label">Gender</label>
            <div className="form-check">
            <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault1" value="male" checked={updateEmployee.gender === "male"} onChange={handleInput} />
            <label className="form-check-label">
                Male
            </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault2" value="female" checked={updateEmployee.gender === "female"} onChange={handleInput}  />
            <label className="form-check-label">
                Female
            </label>
            </div>
        </div>
        <div className="mb-3">
            <label className="form-label">Ph number</label>
            <input name="phno" className="form-control" type="text" aria-label="default input example" value={updateEmployee.phno} onChange={handleInput}/>
           
        </div>
        <div className="mb-3">
            <label className="form-label">Email Id</label>
            <input name="email" className="form-control" type="text" aria-label="default input example" value={updateEmployee.email} onChange={handleInput} />
           
        </div>
        <input type="submit" value="Update Employee" style={{width:"200px"}}  className="btn btn-primary" onClick={handleSubmit}/>
        </div>
        </>)

}
export default UpdateProfile