import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Login from './components/user/Login';
import ManageAllMissions from './components/employee/ManageAllMisions';
import SingleMission from './components/user/SingleMission';
import Navbar from './components/layot/Navbar';
import ManageAllEmployesTasks from './components/manager/ManageEmployesTasks';
import SingleUser from './components/user/SingleUser';


//componemts - lazy loading
const ManageEmployee = lazy(() => import('./components/manager/ManageEmployee'));
const ManagerDash = lazy(() => import('./components/manager/ManagerDash'));


function App() {

  return (
    <>
      <BrowserRouter>
        {/* <Suspense fallback={"hii im stil loading..."}> */}
        <Routes>
          <Route path='/users/login' element={<><Login /><Navbar /></>} />
          <Route path='/tasks/myTasks' element={<><ManageAllMissions /><Navbar /></>} />
          <Route path='/tasks/:id' element={<><SingleMission /><Navbar /></>} />
          <Route path='users/managerDash' element={<><ManagerDash /><Navbar /></>} />
          <Route path='/users/manageEmployess' element={<><ManageEmployee /></>} />
          <Route path='/users/manageEmployessTasks' element={<><ManageAllEmployesTasks /></>} />
          <Route path='/users/:id' element={<><SingleUser /></>} />
        </Routes>
        {/* </Suspense> */}
      </BrowserRouter>
    </>
  )
}

export default App
