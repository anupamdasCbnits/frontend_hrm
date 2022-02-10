import React, { useState, useEffect }  from "react";
import Header from "../Component/Header"
import axios from 'axios';
import "../Css/pendingleave.css"
const Allleaves =()=>{
    const [paramdata,setParamdata] = useState({
        find: '',
        status: '',
    })
    const [leavedata,setLeavedata]=useState({
        dataList:[]
    })
    useEffect(() =>{
        axios.get("http://127.0.0.1:5000/leave/get_leavelist",{headers:{
            'x-access-token': localStorage.getItem('token')},
            params: { 'status': paramdata.status
        }}).then(response=>{
            setLeavedata({
                dataList: response.data
            })
        }).catch(error=>{
            console.log(error)
        })
    },[paramdata])
    const handleInput=(event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setParamdata({...paramdata, [name]: value})
        }
    return(
        <>
        <Header/>
        <div className="container-sm show_pending">
        <div className="mb-3">
        <label className="form-label">Filter</label>
        <select className="form-control filter"
        name="status" value={paramdata.status} 
        onChange={handleInput}
      >
        <option value="">All Leave</option>
       <option value="pending">Pending Leave</option>
        <option value="approved">Approved Leave</option>
        <option value="rejected">Rejected</option>
      </select> 
      </div>
        <table className="table table-success table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Employee_code</th>
      <th scope="col">Name</th>
      <th scope="col">Leave Type</th>
      <th scope="col">From Date</th>
      <th scope="col">To Date</th>
      <th scope="col">Description</th>
      <th scope="col">Leave Days</th>
      <th scope="col">Leave Status</th>
    </tr>
  </thead>
  <tbody>
      {
        leavedata.dataList.map((item,index)=>
            <tr>
            <th scope="row">{index+1}</th>
            <td>{item.employee_code}</td>
            <td>{item.first_name} {item.last_name}</td>
            <td>{item.leave_type}</td>
            <td>{item.from_date.slice(0, 17)}</td>
            <td>{item.to_date.slice(0, 17)}</td>
            <td>{item.description}</td>
            <td>{item.leave_days}</td>
            <td>{item.leave_status}</td>
          </tr>
        )
    }
    
  </tbody>
</table>
        </div>
        </>)

}
export default Allleaves