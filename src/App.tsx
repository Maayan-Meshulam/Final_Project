import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';
import Login from './components/user/Login';
import ManageAllMissions from './components/employee/ManageAllMisions';
import SingleProject from './components/user/SingleProject';
import SingleMission from './components/user/SingleMission';
import AddNewEmployee from './components/manager/AddNewEmployee';

//componemts - lazy loading
const Home = lazy(() => import('./components/layot/Home'));
const ManageEmployee = lazy(() => import('./components/manager/ManageEmployee'));
const ManagerDash = lazy(() => import('./components/manager/ManagerDash'));


function App() {
    const [displayAddNewEmployee, setDisplayAddNewEmployee] = useState<boolean>(true);

  return (
    <>
      <BrowserRouter>
        {/* <Suspense fallback={"hii im stil loading..."}> */}
        <Routes>
          <Route path='/' element={<><Home /></>} />
          <Route path='/login' element={<><Login /></>} />
          <Route path='/manageAllMissions' element={<><ManageAllMissions /></>} />
          <Route path='/addNewEmployee' element={<><AddNewEmployee oncloseAddNewEmployee={setDisplayAddNewEmployee} /></>} />
          <Route path='/singleProject' element={<><SingleProject /></>} />
          <Route path='/singleMission' element={<><SingleMission /></>} />
          <Route path='/managerDash' element={<><ManagerDash /></>} />
          <Route path='/manageEmployee' element={<><ManageEmployee /></>} />
        </Routes>
        {/* </Suspense> */}
      </BrowserRouter>
    </>
  )
}

export default App
