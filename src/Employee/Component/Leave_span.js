import React, { useState }  from "react";
import "../Css/Leavespan.css"
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../Component/Header"

const Leavespan =()=>{

    

    const navigate = useNavigate()

    const [leaveData, setleaveData]= useState({
        fromdate: "",
        todate:"",
        leave_type:""
    })
    const handleInput=(event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setleaveData({...leaveData, [name]: value})
        }
    const handleSubmit=(event) =>{
        var Formdate = new FormData()
        Formdate.append('from_date',leaveData.fromdate)
        Formdate.append('to_date',leaveData.todate)
        axios.post('http://127.0.0.1:5000/leave/span',Formdate,{headers:{
                'x-access-token': localStorage.getItem('token')}})
        .then(result=>{
            
            localStorage.setItem('leave_span_id',result.data.leave_span_id)
        }).catch(err=>{
            console.log(err)

        })
        var Formtype = new FormData()
        Formtype.append('leave_type',leaveData.leave_type)
        axios.post('http://127.0.0.1:5000/leave/type',Formtype,{headers:{
                'x-access-token': localStorage.getItem('token')}})
        .then(result=>{
            
            localStorage.setItem('leave_type_id',result.data.leave_type_id)
        }).catch(error=>{
            alert(error.response.data.massage)
        })
        navigate('/leaveallot')
        event.preventDefault();
    }
    
    return(
        <>
    <Header/>
    <div className="container-sm leavecontainer">
    <h3>Enter Starting date and end date of your leave</h3>
    <div className="mb-3">
    <label className="form-label">From date</label>
    <input type="date" className="form-control leave" id="fromdate" name="fromdate" value={leaveData.fromdate} onChange={handleInput}/>
  </div>
  <div className="mb-3">
    <label className="form-label">To date</label>
    <input type="date" className="form-control leave" id="todate" name="todate" value={leaveData.todate} onChange={handleInput}/>
  </div>
  <div className="mb-3">
        <label className="form-label">Enter Leave Type</label>
        <select name="leave_type"
        value={leaveData.leave_type} 
        onChange={handleInput}  className="form-control leave"
      >
        <option>Select Leave Type</option>
       <option value="Casual">Casual Leave</option>
        <option value="Medical">Medical Leave</option>
      </select>
      </div>
        <button className="btn btn-danger" onClick={()=>{
            navigate('/applyleave')
        }}>back</button>
  <button type="submit" className="btn btn-primary click" onClick={handleSubmit}>Submit</button>
    </div>
        </>)

}
export default Leavespan