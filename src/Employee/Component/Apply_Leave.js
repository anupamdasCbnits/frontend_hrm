import React  from "react";
import Header from "../Component/Header"
import "../Css/leaveapply.css"
import { Link} from 'react-router-dom';

const Applyleave =()=>{
    return(
        <>
        <Header/>
        <div className="choose">
            <h4>Choose any one</h4><br/>
            <Link className="btn btn-primary new" to="/leavespann/new">New Employee</Link>
            <br/>
            <br/>
            <Link className="btn btn-primary old" to="/leavespann/old">Old Employee</Link>
        </div>
        </>)

}
export default Applyleave