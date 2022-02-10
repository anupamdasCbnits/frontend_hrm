import React, { useState, useEffect }  from "react";
import Header from "../Component/Header"
import axios from 'axios';
import "../Css/pendingleave.css"
import swal from 'sweetalert';

const Pendingleave =()=>{
  const [leavedata,setLeavedata]=useState({
    dataList:[]
})
    useEffect(() =>{
      axios.get("http://127.0.0.1:5000/leave/get_leavelist",{headers:{
        'x-access-token': localStorage.getItem('token')},
        params: { 'status': 'pending'
    }}).then(response=>{
      setLeavedata({
        dataList: response.data

    })
    }).catch(error=>{
        console.log(error)
    })
    },[])

    return(
        <>
        <Header/>
        <div className="container-sm show_pending">
        
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
      <th scope="col">Leave Approvement</th>
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
            <td>
              <button className="btn btn-primary" onClick={()=>{
                
                swal({
                  title: "Choose",
                  text: "Select aprovement",
                  buttons: [
                    'Yes, approved',
                    'No, approved'
                  ],
                  dangerMode: true,
                }).then(function(isConfirm) {
                  if (!isConfirm) {
                    var approvedData = new FormData()
                    approvedData.append('Leave_application_id',item.id)
                    approvedData.append('Leave_allotment_id',item.leave_allotment_id)
                    approvedData.append('approval',"yes")
            axios.post('http://127.0.0.1:5000/leave/approvement',approvedData,{headers:{
                'x-access-token': localStorage.getItem('token')}})
                .then(response=>{
                  axios.get("http://127.0.0.1:5000/leave/get_leavelist",{headers:{
        'x-access-token': localStorage.getItem('token')},
        params: { 'status': 'pending'
    }}).then(response=>{
      setLeavedata({
        dataList: response.data

    })
    }).catch(error=>{
        console.log(error)
    })
                }).catch(error=>{
                  alert(error)
                })
                  } else {
                    var approveData = new FormData()
                    approveData.append('Leave_application_id',item.id)
                    approveData.append('Leave_allotment_id',item.leave_allotment_id)
                    approveData.append('approval',"no")
            axios.post('http://127.0.0.1:5000/leave/approvement',approveData,{headers:{
                'x-access-token': localStorage.getItem('token')}})
                .then(response=>{
                  axios.get("http://127.0.0.1:5000/leave/get_leavelist",{headers:{
        'x-access-token': localStorage.getItem('token')},
        params: { 'status': 'pending'
    }}).then(response=>{
      setLeavedata({
        dataList: response.data

    })
    }).catch(error=>{
        console.log(error)
    })
                }).catch(error=>{
                  alert(error)
                })
                  }
                })
              }}>Set Approvment</button>
            </td>
          </tr>
        )
    }
    
  </tbody>
  </table>
        </div>
        </>)

}
export default Pendingleave