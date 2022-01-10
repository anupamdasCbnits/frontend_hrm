import React ,{useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../Component/Header"
import "../Css/DeleteEmp.css"
import axios from 'axios';
const DeleteEmp = () =>{
    const { employee_id } = useParams();
    useEffect(() => {
        axios.delete(`http://127.0.0.1:5000/employee/${employee_id}`,{headers:{
            'x-access-token': localStorage.getItem('token')
        }}).then(response => {
            console.log(response.data)
          })
          .catch(error => {
            console.log(error);
          });
    }, [employee_id])
    return (
        <>
        <Header/>
        <div className="Delete">
            <h1>Delete success</h1>
            <Link type="button" className="btn btn-info" to="/">Back to Home</Link>
        </div>
        </>
    )
};

export default DeleteEmp