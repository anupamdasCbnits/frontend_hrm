import React, {useState}  from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const UpdatePass =()=>{
    const navigate = useNavigate()
    const { employee_id } = useParams();
    const [updatepass,setUpdatepass] = useState({
        otp: "",
        password: "",
        password2: ""
    })
    const [err,setErr] = useState({
        Errotp: "",
        Errpassword: "",
        Errpassword2: ""
    })
    const handleInput = (event)=>{
        const target = event.target;
            const value = target.value;
            const name = target.name;
            setUpdatepass({...updatepass, [name]: value})
    }
    const handleSubmit = () => {
        if (updatepass.otp.length === 0){
            setErr({
                Errotp : "* enter otp"
            })
        }
        else if(updatepass.password.length === 0){
            setErr({
                Errpassword : "* enter new password"
            })
        }
        else if(updatepass.password2.length === 0){
            setErr({
                Errpassword2 : "* enter the password an=gain"
            })
        }
        else{
            var updatepassData = new FormData()
            updatepassData.append('otp',updatepass.otp)
            updatepassData.append('password',updatepass.password)
            updatepassData.append('password2',updatepass.password2)
            
            axios.post(`http://127.0.0.1:5000/employee/changepass/${employee_id}`,updatepassData)
            .then(response => {

             navigate('/login')
            })
            .catch(error => {
                console.log(error);
            alert("wrong otp or input")
            });
        }
    }
    return(
        <>
            <div className="container-sm" style={{padding:"200px"}}>
            <div className="mb-3">
                    <label  className="form-label">Otp</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="otp" value={updatepass.otp} onChange={handleInput} style={{width:"350px"}}/>
                    <small style={{color:"red"}}>{err.Errotp}</small>
            </div>
            <div className="mb-3">
                <label  className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={updatepass.password} onChange={handleInput} style={{width:"350px"}}/>
                <small style={{color:"red"}}>{err.Errpassword}</small>
            </div>
            <div className="mb-3">
                <label  className="form-label">Re-Enter Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name="password2" value={updatepass.password2} onChange={handleInput} style={{width:"350px"}}/>
                <small style={{color:"red"}}>{err.Errpassword2}</small>
            </div>
            <input type="submit" value="Change Password" style={{width:"150px"}}  className="btn btn-primary" onClick={handleSubmit}/>
            </div>
        </>
    )

}
export default UpdatePass