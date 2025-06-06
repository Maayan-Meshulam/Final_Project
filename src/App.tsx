import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Login from './components/user/Login';
import ManageAllMissions from './components/employee/ManageAllMisions';
import Footer from './components/layot/Footer';
import Navbar from './components/layot/Navbar';

//componemts - lazy loading
const Home = lazy(() => import('./components/layot/Home'));
const ManageEmployee = lazy(() => import('./components/manager/ManageEmployee'));
const ManagerDash = lazy(() => import('./components/manager/ManagerDash'));
const AddMission = lazy(() => import('./components/manager/AddMission'));
const ManageProjects = lazy(() => import('./components/manager/ManageProjects'));


function App() {

  return (
    <>
      <BrowserRouter>
        {/* <Suspense fallback={"hii im stil loading..."}> */}
        <Routes>
          <Route path='/' element={<><Home /></>} />
          <Route path='/login' element={<><Login /></>} />
          <Route path='/manageAllMissions' element={<><Navbar/> <ManageAllMissions /><Footer/></>} />
          <Route path='/managerDash' element={<><ManagerDash /></>} />
          <Route path='/manageEmployee' element={<><ManageEmployee /></>} />
          <Route path='/manageProjects' element={<><ManageProjects /></>} />
        </Routes>
        {/* </Suspense> */}
      </BrowserRouter>
    </>
  )
}

export default App
