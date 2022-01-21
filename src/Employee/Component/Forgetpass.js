import React,{useState} from "react";
import "../Css/Forgetpass.css"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const ForgetPass =()=>{
    const navigate = useNavigate()
    const [otpForm, setOtpForm] = useState({
        auth:""
    })
    const [err,setErr]=useState({
        Errauth:""
    })
    const handleInput = (event)=>{
        const target = event.target;
            const value = target.value;
            const name = target.name;
            setOtpForm({...otpForm, [name]: value})
    }
    const handleSubmit = (event) =>{
        if(otpForm.auth.length === 0){
            setErr({
                Errauth : "* Enter value"
            })
        }
        else{
        var otpdataForm = new FormData()
        otpdataForm.append('auth',otpForm.auth)
        axios.post('http://127.0.0.1:5000/employee/forgetpassotp',otpdataForm)
        .then(response => {
            navigate('/updatepass/'+response.data.employee_id)
            
        })
        .catch(error => {
          console.log(error);
          alert("wrong employee code")
        });
            
        }
        event.preventDefault();
    }
    const handleCancel = () =>{
        navigate('/login')
    }
    return(
        <>
        <div className="mb-3 forgetpass">
            <label  className="form-label">Enter employee code or ph no or email id : </label>
            <input type="text" className="form-control" id="exampleInputPassword1" name="auth" style={{width:"350px"}} value={otpForm.auth} onChange={handleInput}/>
            <small style={{color:"red"}}>{err.Errauth}</small>
            <br/><input type="button" value="cancel" style={{width:"150px"}}  className="btn btn-danger" onClick={handleCancel} />  <input type="submit" value="Submit" style={{width:"150px"}}  className="btn btn-primary" onClick={handleSubmit} />
        </div>
        </>)

}
export default ForgetPass