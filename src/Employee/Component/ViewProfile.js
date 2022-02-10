import React,{useEffect,useState}  from "react";
import Header from "../Component/Header"
import "../Css/ShowEmp.css"
import axios from "axios"
import { Link } from 'react-router-dom';
const ViewProfile =()=>{
    const [empData,setEmpData]= useState({
        country_name:"",
        email:"",
        employee_code: "",
        employee_role: "",
        empployee_id:"",
        first_name:"",
        gender:"",
        last_name:"",
        massage:"",
        phno:""
    })

    useEffect ( () =>{
        axios.get(`http://127.0.0.1:5000/employee/${localStorage.getItem('employee_id')}`,{headers:{
            'x-access-token': localStorage.getItem('token')
        }}).then(data => {
            setEmpData({
                country_name:data.data.country_name,
                email:data.data.email,
                employee_code: data.data.employee_code,
                employee_role: data.data.employee_role,
                employee_id:data.data.employee_id,
                first_name:data.data.first_name,
                gender:data.data.gender,
                last_name:data.data.last_name,
                massage:data.data.message,
                phno:data.data.phno
            })
        })
      }, []);
    if (empData.first_name===""){
        return(
            <>
            <Header/>
            <div className="alert alert-primary" role="alert">
                your token is invalid.
            </div>
            </>
        )
    }
    return(
        <>
        <Header/>
        <div className="show_emp">
        <h2>Profile</h2><br/>
        <p>Employee Code: {empData.employee_code}</p>
        <p>Name : { empData.first_name.toUpperCase() } {empData.last_name.toUpperCase()}</p>
        <p>Country : { empData.country_name.toUpperCase() }</p>
        <p>Employee Role: {empData.employee_role.toUpperCase()}</p>
        <p>Gender: {empData.gender.toUpperCase()}</p>
        <p>Email: {empData.email}</p>
        <p>Ph Number: {empData.phno}</p>
        <b/>
        <Link type="button" className="btn btn-success" to={"/updateprofile"}>Update</Link>
        </div>
        </>
        )

}
export default ViewProfile