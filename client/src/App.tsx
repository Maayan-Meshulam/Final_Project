import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Login from './components/user/Login';
import ManageAllMissions from './components/employee/ManageAllMisions';
import SingleProject from './components/user/SingleProject';
import SingleMission from './components/user/SingleMission';


//componemts - lazy loading
const Home = lazy(() => import('./components/layot/Home'));
const ManageEmployee = lazy(() => import('./components/manager/ManageEmployee'));
const ManagerDash = lazy(() => import('./components/manager/ManagerDash'));


function App() {

  return (
    <>
        <BrowserRouter>
          {/* <Suspense fallback={"hii im stil loading..."}> */}
          <Routes>
            <Route path='/' element={<><Home /></>} />
            <Route path='/users/login' element={<><Login /></>} />
            <Route path='/tasks/myTasks' element={<><ManageAllMissions /></>} />
            <Route path='/tasks/:id' element={<><SingleMission /></>} />
            <Route path='users/managerDash' element={<><ManagerDash /></>} />
            <Route path='/manageEmployee' element={<><ManageEmployee /></>} />
          </Routes>
          {/* </Suspense> */}
        </BrowserRouter>
    </>
  )
}

export default App
