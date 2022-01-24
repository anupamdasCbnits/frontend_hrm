import React,{useEffect, useState} from "react";
import Header from "./Header";
import "../Css/EmpList.css"
import axios from 'axios';
import { Link } from "react-router-dom";
const ListEmployee =()=>{
    const [empData, setEmpDta] = useState({
        empList:[],

    })
    const [pagination,Setpagination] = useState({
      previous: 0,
      next: 4
    })
    const [search,setSearch] = useState({
      search : ""
    })
    useEffect(  () => {
        axios.get(`http://127.0.0.1:5000/employee/""/${pagination.previous}/${pagination.next}`,{headers:{
        'x-access-token': localStorage.getItem('token')
        }}).then(data => {
          console.log(data.data)
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
      
            empListData.push(empObj)
        }

        setEmpDta({
            empList:empListData
        })

        

    })
      }, [pagination]);

      const handleInput=(event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setSearch({...search, [name]: value})
        }

        const handleSubmit=(event) =>{ 
          setEmpDta({
            empList:[]
          })
          axios.get(`http://127.0.0.1:5000/employee/${search.search}/${pagination.previous}/${pagination.next}`,{headers:{
        'x-access-token': localStorage.getItem('token')
        }}).then(data => {
          console.log(data.data)
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
      
            empListData.push(empObj)
            setEmpDta({
              empList:empListData
          })
        }})
        event.preventDefault();
        
        }
    if(empData.empList.length === 0){
      return(
      <>  
       <Header/>
       <div className="container-sm">
       <div className="d-flex" style={{margin:"30px"}}>
        <input autoComplete="off" className="form-control me-3" type="search" placeholder="Search" aria-label="Search" name="search" value={search.search} onChange={handleInput} style={{width:"50%"}}/>
        <button className="btn btn-outline-primary" type="button" onClick={handleSubmit} >Search</button>
      </div>
       <div className="alert alert-primary" role="alert">
          no employee found
        </div>
        <br/><br/>
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary" onClick={()=>{Setpagination({previous:pagination.previous-4,next: pagination.next-4})}}>Previous</button>
            <button className="btn btn-primary" onClick={()=>{Setpagination({previous:pagination.previous+4,next:pagination.next+4})}}>Next</button>
        </div>
        </div>
      </>
      )
    }
    return(
    <>
    <Header/>
    <div className="container-sm">
    <div className="d-flex" style={{margin:"30px"}}>
        <input autoComplete="off" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" name="search" value={search.search} onChange={handleInput} style={{width:"50%"}}/>
        <button className="btn btn-outline-primary" type="button" onClick={handleSubmit} >Search</button>
      </div>
    <div className="row row-cols-1 row-cols-md-4 g-5 mx-3" >
      {
        empData.empList.map((item)=>
        <div key={item.employee_id} className="col">
        <div className="card text-dark bg-light border-primary mb-3">
        <div className="card-header text-primary"><b>{item.employee_role.toUpperCase()}</b></div>
          <Link className="card-body" to={"/show_employee/"+item.employee_id}>
            <h5 className="card-title">{item.first_name.toUpperCase()} {item.last_name.toUpperCase()}</h5>
            <p className="card-title">Country : {item.country_name}</p>
            <p className="card-text">Employee Code : {item.employee_code}</p>
          </Link>
        </div>
      </div>
        )
      }
    </div>
    <br/><br/>
    <div className="d-flex justify-content-between">
      <button className="btn btn-primary" onClick={()=>{Setpagination({previous:pagination.previous-4,next: pagination.next-4})}}>Previous</button>
      <button className="btn btn-primary" onClick={()=>{Setpagination({previous:pagination.previous+4,next:pagination.next+4})}}>Next</button>
    </div>
    </div>
    </>
    
    )
};

export default ListEmployee