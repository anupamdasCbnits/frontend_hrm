import React, { useState, useEffect }  from "react";
import Header from "../Component/Header"
import axios from 'axios';
import "../Css/pendingleave.css"
const Pendingleave =()=>{
    const [leavedata,setLeavedata]=useState({
        dataList:[]
    })
    useEffect(() =>{
        axios.get("http://127.0.0.1:5000/leave/get_leavelist",{headers:{
            'x-access-token': localStorage.getItem('token')
        }})

    },[])
    return(
        <>
        <Header/>
        <div className="container-sm show_pending">
        
        <table class="table table-success table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
        </div>
        </>)

}
export default Pendingleave