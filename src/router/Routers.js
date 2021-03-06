import React from "react";
import { Route, Routes } from 'react-router-dom';
import Login from '../Employee/Component/Login';
import ForgetPass from '../Employee/Component/Forgetpass';
import UpdatePass from "../Employee/Component/Update_pass";
import ProtectedRoute from './ProtectedRout';
const ListEmployee= React.lazy(() => import('../Employee/Component/List_Employee'));
const CreateEmployee= React.lazy(() => import('../Employee/Component/Create_Employee'));
const ShowEmployee= React.lazy(() => import('../Employee/Component/Show_Employee'));
const Home= React.lazy(() => import('../Employee/Component/Home'));
// const DeleteEmp= React.lazy(() => import('../Employee/Component/Delete_Emp'));
const UpdateEmployee= React.lazy(() => import('../Employee/Component/Update_Emp'));
const ViewProfile= React.lazy(() => import('../Employee/Component/ViewProfile'));
const UpdateProfile= React.lazy(() => import('../Employee/Component/UpdateProfile'));
const Leavespan= React.lazy(() => import('../Employee/Component/Leave_span'));
const Applyleave = React.lazy(() => import('../Employee/Component/Apply_Leave'));
const Showleave= React.lazy(() => import('../Employee/Component/Show_Leave'));
const Leaveallot= React.lazy(() => import('../Employee/Component/Leaveallot'));
const Pendingleave= React.lazy(() => import('../Employee/Component/Pendingleave'));
const Allleaves= React.lazy(() => import('../Employee/Component/All_leaves'));
const Seeallotment= React.lazy(() => import('../Employee/Component/Seeallotment'));
function Routers() {
  return (
  <>
    <Routes>
      <Route exact path='/login' element={<Login/>}></Route>
      <Route exact path='/ForgetPass' element={<ForgetPass/>}></Route>
      <Route exact path='/updatepass/:employee_id' element={<UpdatePass/>}></Route>
      <Route element={<ProtectedRoute />}>
        <Route exact path='/' element={< Home />}></Route>
          <Route exact path='/list_employee' element={< ListEmployee />}></Route>
          <Route exact path='/create_employee' element={< CreateEmployee />}></Route>
          <Route exact path='/show_employee/:employee_id' element={< ShowEmployee />}></Route>
          {/* <Route exact path='/delete_employee/:employee_id' element={< DeleteEmp />}></Route> */}
          <Route exact path='/update_employee/:employee_id' element={< UpdateEmployee />}></Route>
          <Route exact path='/viewprofile' element={< ViewProfile />}></Route>
          <Route exact path='/updateprofile' element={< UpdateProfile />}></Route>
          <Route exact path='/leavespann' element={< Leavespan />}></Route>
          <Route exact path='/applyleave' element={< Applyleave />}></Route>
          <Route exact path='/showleave' element={< Showleave />}></Route>
          <Route exact path='/leaveallot' element={< Leaveallot />}></Route>
          <Route exact path='/pendingleave' element={< Pendingleave />}></Route>
          <Route exact path='/all_leaves' element={< Allleaves />}></Route>
          <Route exact path='/seeallotment' element={< Seeallotment />}></Route>
      </Route>
    </Routes>
  </>
  );
}

export default Routers;