import React,{useEffect, useState} from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import "../Css/EmpList.css"
import axios from 'axios';
const ListEmployee =()=>{
    const [empData, setEmpDta] = useState({
        empList:[],

    })
    useEffect(() => {
        axios.get("http://127.0.0.1:5000/employee/",{headers:{
        'x-access-token': localStorage.getItem('token')
        }}).then(data => {
        const empListData = []
        for(let item in data.data){
            const empObj = {
            employee_id:"",
            country_name:"",
            first_name:"",
            last_name:"",
            employee_code:"",
            employee_role:""
            }
            empObj.employee_id=data.data[item].employee_id
            empObj.country_name=data.data[item].country_name
            empObj.first_name=data.data[item].first_name
            empObj.last_name=data.data[item].last_name
            empObj.employee_code=data.data[item].employee_code
            empObj.employee_role=data.data[item].employee_role
            console.log(empObj)
            empListData.push(empObj)
        }
        console.log(empListData)
        setEmpDta({
            empList:empListData
        })
    })
      }, []);
      
      const itemList =  empData.empList.map((item)=>
      <div className="col">
      <div className="card text-dark bg-light border-info mb-3">
      <div class="card-header text-info"><b>{item.employee_role.toUpperCase()}</b></div>
        <Link className="card-body" to={"/show_employee/"+item.employee_id}>
          <h5 className="card-title text-info">{item.first_name.toUpperCase()} {item.last_name.toUpperCase()}</h5>
          <p className="card-title">Country : {item.country_name}</p>
          <p className="card-text">Employee Code : {item.employee_code}</p>
        </Link>
      </div>
    </div>
      )
    // const arr = [1,2,3]
    // const itemList = arr.map((item)=>{
    //     <li>{item}</li>
    // )
    return(
    <>
    <Header/>
    <div className="container-sm">
    <div className="row row-cols-1 row-cols-md-4 g-5 my-3">
    {itemList}
    </div>
    </div>
    
    </>
    
    )
};

export default ListEmployee