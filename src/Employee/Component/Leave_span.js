import React, { useState }  from "react";
import "../Css/Leavespan.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from "../Component/Header"

const Leavespan =()=>{

    

    const navigate = useNavigate()

    const [leaveData, setleaveData]= useState({
        fromdate: "",
        todate:"",
        fromtime:"AM",
        totime:"AM",
        leave_type:""
    })
    const [error, serError] = useState({
        fromdateerror:"",
        todateerror:"",
        leave_typeerror:""
    })
    const handleInput=(event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setleaveData({...leaveData, [name]: value})
        }
    const handleSubmit=(event) =>{
        if(leaveData.fromdate.length===0){
            serError({
                fromdateerror: "enter from date"
            })
        }else if (leaveData.todate.length===0){
            serError({
                todateerror: "enter to date"
            })
        }else if(leaveData.leave_type.length===0){
            serError({
                leave_typeerror: "enter leave type"
            })
        }else{
        var Formdate = new FormData()
        Formdate.append('from_date',leaveData.fromdate)
        Formdate.append('to_date',leaveData.todate)
        Formdate.append('from_time',leaveData.fromtime)
        Formdate.append('to_time',leaveData.totime)
        axios.post('http://127.0.0.1:5000/leave/span',Formdate,{headers:{
                'x-access-token': localStorage.getItem('token')}})
        .then(response=>{
            localStorage.setItem('leave_span_id',response.data.leave_span_id)
            var Formtype = new FormData()
        Formtype.append('leave_type',leaveData.leave_type)
        axios.post('http://127.0.0.1:5000/leave/type',Formtype,{headers:{
                'x-access-token': localStorage.getItem('token')}})
        .then(response=>{
            navigate('/leaveallot')
            localStorage.setItem('leave_type_id',response.data.leave_type_id)
        }).catch(error=>{
            alert(error.response.data.message)
        })
        }).catch(error=>{
            console.log(error)
            alert(error.response.data.message)

        })
        
    }
        event.preventDefault();
    }
    
    return(
        <>
    <Header/>
    <div className="container-sm leavecontainer">
    <h3>Enter Starting date and end date of your leave</h3>
    <div className="mb-3">
    <label className="form-label">From date</label>
    <p>
    <input type="date" className="form-control leave" id="fromdate" name="fromdate" value={leaveData.fromdate} onChange={handleInput}/>
    <select name="fromtime"
        value={leaveData.fromtime} 
        onChange={handleInput}  className="form-control time"
      >
       <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </p>
    <small style={{color:"red"}}>{error.fromdateerror}</small>
  </div>
  <div className="mb-3">
    <label className="form-label">To date</label>
    <p>
    <input type="date" className="form-control leave" id="todate" name="todate" value={leaveData.todate} onChange={handleInput}/>
    <select name="totime"
        value={leaveData.totime} 
        onChange={handleInput}  className="form-control time"
      >
       <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </p>
    <small style={{color:"red"}}>{error.todateerror}</small>
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
      <small style={{color:"red"}}>{error.leave_typeerror}</small>
      </div>
        <button className="btn btn-danger" onClick={()=>{
            navigate('/')
        }}>back</button>
  <button type="submit" className="btn btn-primary click" onClick={handleSubmit}>Submit</button>
    </div>
        </>)

}
export default Leavespan