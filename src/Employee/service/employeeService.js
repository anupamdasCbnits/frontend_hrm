
import axios from 'axios';

class EmployeeDb{

    EmployeeList(){
        axios.get("http://127.0.0.1:5000/employee/",{headers:{
            'x-access-token': localStorage.getItem('token')
        }}).then(data => {
            const first_name = []
            for(let item in data.data){
                        first_name.push(data.data[item].first_name)
            }
            return first_name
            
        }) 
    }

}



export default EmployeeDb