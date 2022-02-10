import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Link, useParams, useNavigate } from 'react-router-dom';
import "../Css/ShowEmp.css"
import axios from 'axios';
import swal from 'sweetalert';
const ShowEmployee=() =>{
    const navigate = useNavigate()
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
                massage:data.data.message,
                phno:data.data.phno
            })
        })
      }, [employee_id]);
      
    
    return(
        <>
        <Header/>
        <Link className="btn btn-light" style={{margin:"30px"}} to={'/list_employee'}>Back</Link>
        <div className="show_emp">
        <h2>Employee Data</h2><br/>
        <p>Employee Code: {empData.employee_code}</p>
        <p>Name : { empData.first_name.toUpperCase() } {empData.last_name.toUpperCase()}</p>
        <p>Country : { empData.country_name.toUpperCase() }</p>
        <p>Employee Role: {empData.employee_role.toUpperCase()}</p>
        <p>Gender: {empData.gender.toUpperCase()}</p>
        <p>Email: {empData.email}</p>
        <p>Ph Number: {empData.phno}</p>
        <b/>
        <button type="submit" className="btn btn-danger" onClick={()=>{

swal({
    title: "Are you sure?",
    text: "You want to delete the employee!",
    icon: "warning",
    buttons: [
      'No, cancel it!',
      'Yes, I am sure!'
    ],
    dangerMode: true,
  }).then(function(isConfirm) {
    if (isConfirm) {
        axios.delete(`http://127.0.0.1:5000/employee/${employee_id}`,{headers:{
            'x-access-token': localStorage.getItem('token')
        }}).then(response => {
            console.log(response.data)
            swal("Ok","successfully deleted","success")
            navigate('/list_employee')
          })
          .catch(error => {
            console.log(error);
          });
    } else {
      swal("Cancelled", "You cancel deletetion", "error");
    }
  })


            // if(window.confirm('Do you want to delete this empolyee?')){
            //     axios.delete(`http://127.0.0.1:5000/employee/${employee_id}`,{headers:{
            //             'x-access-token': localStorage.getItem('token')
            //         }}).then(response => {
            //             console.log(response.data)
            //             navigate('/list_employee')
            //             swal("Ok","successfully updated","success")
            //           })
            //           .catch(error => {
            //             console.log(error);
            //           });
            // }
            
        }}>Delete</button>
        <Link type="button" className="btn btn-success" to={"/update_employee/"+employee_id}>Update</Link>
        </div>
        </>
    )
}

export default ShowEmployee