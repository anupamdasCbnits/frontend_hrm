import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Link, useParams } from 'react-router-dom';
import "../Css/ShowEmp.css"
import axios from 'axios';
const ShowEmployee=() =>{
    const { employee_id } = useParams();
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
    useEffect(() => {
        
        axios.get(`http://127.0.0.1:5000/employee/${employee_id}`,{headers:{
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
                massage:data.data.massage,
                phno:data.data.phno
            })
        })
      }, [employee_id]);
    
    return(
        <>
        <Header/>
        <div className="show_emp">
        <h2>Employee Data</h2><br/>
        <p>Employee Code: {empData.employee_code}</p>
        <p>Name : { empData.first_name } {empData.last_name}</p>
        <p>Country : { empData.country_name }</p>
        <p>Employee Role: {empData.employee_role}</p>
        <p>Gender: {empData.gender}</p>
        <p>Email: {empData.email}</p>
        <p>Ph Number: {empData.phno}</p>
        <b/>
        <Link type="button" className="btn btn-danger" to={"/delete_employee/"+employee_id}>Delete</Link>
        <Link type="button" className="btn btn-success" to={"/update_employee/"+employee_id}>Update</Link>
        </div>
        </>
    )
}

export default ShowEmployee