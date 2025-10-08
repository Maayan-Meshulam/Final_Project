import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Login from './components/user/Login';
import ManageAllMissions from './components/employee/ManageAllMisions';
import SingleMission from './components/user/SingleMission';
import Navbar from './components/layot/Navbar';
import ManageAllEmployesTasks from './components/manager/ManageEmployesTasks';
import SingleUser from './components/user/SingleUser';
import Footer from './components/layot/Footer';
import EnterEmail from './components/user/EnterEmail';
import ChangePassword from './components/user/ChagePassword';
import EnterCode from './components/user/EnterCode';
import Error404 from './components/layot/Error404';
import { ToastContainer  } from 'react-toastify';


//componemts - lazy loading
const ManageEmployee = lazy(() => import('./components/manager/ManageEmployee'));
const ManagerDash = lazy(() => import('./components/manager/ManagerDash'));


function App() {

  return (
    <>
      <ToastContainer  />
      <BrowserRouter>
        {/* <Suspense fallback={"hii im stil loading..."}> */}
        <Routes>
          <Route path='/' element={<><Login /><Navbar /><Footer /></>} />
          <Route path='/tasks/myTasks' element={<><Navbar /><ManageAllMissions /><Footer /></>} />
          <Route path='/tasks/:id' element={<><Navbar /><SingleMission /><Footer /></>} />
          <Route path='users/managerDash' element={<><Navbar /><ManagerDash /><Footer /></>} />
          <Route path='/users/manageEmployess' element={<><Navbar /><ManageEmployee /><Footer /></>} />
          <Route path='/tasks/manageEmployessTasks' element={<><Navbar /><ManageAllEmployesTasks /><Footer /></>} />
          <Route path='/users/:id' element={<><Navbar /><SingleUser /><Footer /></>} />
          <Route path='/users/change-password/:id' element={<><ChangePassword /></>}></Route>
          <Route path='/users/send-email' element={<><EnterEmail /></>}></Route>
          <Route path='*' element={<><Navbar /><Error404 /><Footer /></>}></Route>
        </Routes>
        {/* </Suspense> */}
      </BrowserRouter>
    </>
  )
}

export default App
