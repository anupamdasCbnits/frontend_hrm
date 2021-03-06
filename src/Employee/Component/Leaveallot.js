import React, { useState }  from "react";
import Header from "../Component/Header"
import { useNavigate } from 'react-router-dom';
import "../Css/leaveallot.css"
import axios from 'axios';

const Leaveallot =()=>{
    const navigate = useNavigate()
    const [data,setdata] = useState({
        description:"",
    })
    const [error,setError] = useState({
        errordescription:""
    })
    const handleChange = (event) =>{
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setdata({...data, [name]: value})
    }
    const handleSubmit =(event)=>{
        if(data.description.length === 0){
            setError({
                errordescription: "enter description"
            })
        }else{
        var addapplication = new FormData()
        addapplication.append('employee_id',localStorage.getItem('employee_id'))
        addapplication.append('leave_span_id',localStorage.getItem('leave_span_id'))
        addapplication.append('leave_type_id',localStorage.getItem('leave_type_id'))
        addapplication.append('description',data.description)
        // addapplication.append('leave_days',data.leave_days)
        axios.post('http://127.0.0.1:5000/leave/application',addapplication,{headers:{
                'x-access-token': localStorage.getItem('token')}})
                .then(response=>{
                    console.log(response.data)
                    navigate('/showleave')
                }).catch(error=>{
                    alert(error.response.data.message)
                })
            }
        event.preventDefault()
    }

    return(
        <>
        <Header/>
        <div className="leavealot">
        {/* <div className="mb-3">
  <label className="form-label">Enter Leave Days (How many das you want to leave)</label>
    <input type="text" className="form-control" name="leave_days" value={data.leave_days} onChange={handleChange}/>
</div> */}
<div className="mb-3">
  <label className="form-label">Write The cause for leave</label>
  <textarea className="form-control" rows="4" name="description" value={data.description} onChange={handleChange}></textarea>
  <small style={{color:"red"}}>{error.errordescription}</small>
</div>

<button className="btn btn-danger" onClick={()=>{
            axios.delete(`http://127.0.0.1:5000/leave/deleteLeavespan/${localStorage.getItem('leave_span_id')}`,{headers:{
                'x-access-token': localStorage.getItem('token')}})
                .then(response=>{}).catch(error=>{
                    alert(error)
                })
                axios.delete(`http://127.0.0.1:5000/leave/deleteLeavetype/${localStorage.getItem('leave_type_id')}`,{headers:{
                'x-access-token': localStorage.getItem('token')}})
                .then(response=>{}).catch(error=>{
                    alert(error)
                })
            navigate('/applyleave')
        }}>back</button>
  <button type="submit" className="btn btn-primary click" onClick={handleSubmit}>Submit</button>
  </div>
        </>)

}
export default Leaveallot