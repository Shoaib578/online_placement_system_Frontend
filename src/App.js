import React from 'react';
import Home from './pages/Home';
import PostJob from './pages/Employer/PostJob';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import JobApply from './pages/Student/JobApply';
import Profile from './pages/profile';
import Applies from './pages/Student/applies';
import EmployerDashboard from './pages/Employer/EmployerDashboard';
import UpdateJob from './pages/Employer/UpdateJob';
import ApplicationsToJob from './pages/Employer/ApplicationsToJob';
import ApplicationDetails from './pages/Employer/ApplicationDetails';
import ApplicantProfile from './pages/Employer/ApplicantProfile';

import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
} from 'react-router-dom';
import Navbar from './components/navbar';
import Notfound from './pages/404';

import Students from './pages/Admin/Students';
import Employers from './pages/Admin/Employers';
import StudentDetails from './pages/Admin/StudentDetails';
import EmployerDetails from './pages/Admin/EmployerDetails';
import Jobs from './pages/Admin/Jobs';
import JobDetails from './pages/Admin/JobDetails';
import Applications from './pages/Admin/Applications';
import SentApplicationDetails from './pages/Admin/SentApplicationDetails';
import AdminProfile from './pages/Admin/AdminProfile';
const storage = localStorage.getItem('user')
    const parse = JSON.parse(storage)
class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      is_logged_in: false,
      role:""
    }

    this.isLoggedIn()
    this.check_is_admin()
    this.RedirectToAdmin()
  }

  RedirectToAdmin = ()=>{
    if(parse != null){
      if(!window.location.pathname.includes("admin") && parse.is_admin == 1){
        return window.location = "/admin/students"
      }
    }
    
}

  isLoggedIn = ()=>{
    console.log(window.location.pathname)
    

    if(parse != null){
        this.setState({is_logged_in: true},()=>{
          if(parse.is_student == 1){
            this.setState({role: 'student'})
          }else if(parse.is_employer == 1){
            this.setState({role: 'employer'})

          }else{
            this.setState({role: 'admin'})

          }
        })
    }
  }

  check_is_admin = ()=>{
    if(window.location.pathname.includes('admin')){
      if(parse == null){
        return window.location = "/"
      }else{
        if(parse.is_admin == 0){
        return window.location = "/"

        }
      }
    }
  }
  render(){
  return (
    
    <Router>
      {window.location.pathname.includes('admin')?null:<Navbar />}
    
      <Routes>

        <Route exact path='/register' element={< Register />}></Route>
        <Route exact path='/login' element={< Login />}></Route>
        <Route exact path='/' element={< Home />}></Route>
        <Route exact path='/employer/postjob' element={< PostJob />}></Route>
        <Route exact path='/student/apply/:job_id' element={< JobApply />}/>
        <Route exact path='/profile' element={< Profile />}></Route>
        <Route exact path='/student/dashboard' element={< Applies />}></Route>
        <Route exact path='/employer/dashboard' element={< EmployerDashboard />}></Route>
        <Route exact path='/employer/updatejob/:job_id' element={< UpdateJob />}></Route>
        <Route exact path='/employer/applicationstojob/:job_id' element={< ApplicationsToJob />}></Route>
        <Route exact path='/application/details/:application_id' element={< ApplicationDetails />}></Route>
        <Route exact path='/student/profile/:student_id' element={< ApplicantProfile />}></Route>
        


        <Route path="*" element={<Notfound />}/>



        {/* Admin */}

        <Route exact path='/admin/students' element={< Students />}></Route>
        <Route exact path='/admin/employers' element={< Employers />}></Route>
        <Route exact path='/admin/student/details/:student_id' element={< StudentDetails />}></Route>
        <Route exact path='/admin/employer/details/:employer_id' element={< EmployerDetails />}></Route>
        <Route exact path='/admin/jobs' element={< Jobs />}></Route>
        <Route exact path='/admin/job/details/:job_id' element={< JobDetails />}></Route>
        <Route exact path='/admin/applications' element={< Applications />}></Route>
        <Route exact path='/admin/application/details/:application_id' element={< SentApplicationDetails />}></Route>

        <Route exact path='/admin/profile' element={< AdminProfile />}></Route>

      </Routes>
      
      </Router>
  )
  }
}

export default App;
