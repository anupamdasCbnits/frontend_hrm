import React, { useState, useEffect }  from "react";
import Header from "../Component/Header"
import axios from 'axios';
import "../Css/pendingleave.css"
import swal from 'sweetalert';
const Seeallotment =()=>{
    const [leavedata,setLeavedata]=useState({
        dataList:[]
    })
    useEffect(() =>{
        axios.get("http://127.0.0.1:5000/leave/get_listallotement",{headers:{
            'x-access-token': localStorage.getItem('token')}
            }).then(response=>{
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
        <p>To reset all leave alloted leave click Here 
              <button className="btn btn-primary" 
              onClick={()=>{
                axios.get("http://127.0.0.1:5000/leave/allotment_reset",{headers:{
            'x-access-token': localStorage.getItem('token')}
            }).then(response=>{
                axios.get("http://127.0.0.1:5000/leave/get_listallotement",{headers:{
            'x-access-token': localStorage.getItem('token')}
            }).then(response=>{
            setLeavedata({
                dataList: response.data
            })
            swal("Ok","Successfully reset","success")
        }).catch(error=>{
            console.log(error)
        })
                
        }).catch(error=>{
            swal("Ooops",error,"error")
        })
        
              }}
              >Reset</button>
        </p>
        <table className="table table-success table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Employee_code</th>
      <th scope="col">Name</th>
      <th scope="col">Alloted Leave</th>
    </tr>
  </thead>
  <tbody>
      {
        leavedata.dataList.map((item,index)=>
            <tr>
            <th scope="row">{index+1}</th>
            <td>{item.employee_code}</td>
            <td>{item.first_name} {item.last_name}</td>
            <td>{item.alloted_leave}</td>
          </tr>
        )
    }
    
  </tbody>
</table>
        </div>
        </>)

}
export default Seeallotment