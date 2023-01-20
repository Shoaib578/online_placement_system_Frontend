import React, {useEffect, useState} from 'react';
import './style.css';
import './table.css';
import { Bars4Icon } from '@heroicons/react/24/solid'
import { AcademicCapIcon } from '@heroicons/react/24/solid'
import { BriefcaseIcon } from '@heroicons/react/24/solid'
import { UserPlusIcon } from '@heroicons/react/24/solid'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'
import { TrashIcon } from '@heroicons/react/24/solid'
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddStudentModel from './AddUserModel';


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import  Axios  from 'axios';


  const Applications = () => {
    const [sidebaropen, setSideBarOpen] = useState(false);
    const [applications,setApplications]= useState([])


    const get_all_applications = ()=>{
      Axios.get("http://localhost:5000/apis/admin/get_all_applications")
      .then(res=>{
        console.log(res.data.applications)
        setApplications(res.data.applications)

      })
    }
    const logout = ()=>{
      localStorage.removeItem('user')
      return window.location = "/login"
    }

    useEffect(()=>{
      get_all_applications()
    },[])

    const Delete = (id) => {
        Axios.get("http://localhost:5000/apis/admin/delete_application?application_id="+id)
        .then(res=>{
          get_all_applications()
        })
        .catch(err=>{
          alert("Something Went Wrong")
        })
    }

    return (
      <div>

        <AddStudentModel/>
       
       

        <div className={sidebaropen === false ? 'sidebar':'sidebar active'}>
    <div className="logo-details">
    <i class='bx bxl-c-plus-plus'></i>
      <span className="logo_name">OPS</span>
    </div>
      <ul className="nav-links">
        
        <li>
          <a href="/admin/students">
          <AcademicCapIcon style={{width:22, height:22, color:"white"}}/>
            {sidebaropen === false ? 
            <span className="links_name">Students</span>:null}
          </a>
        </li>
        <li>
          <a href="/admin/employers">
          <BriefcaseIcon style={{width:22, height:22, color:"white"}}/>
          {sidebaropen == false ? 
            <span className="links_name">Employers</span>:null}
          </a>
        </li>
        <li  data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
          <a href="#">
          <UserPlusIcon style={{width:22, height:22, color:"white"}}/>
          {sidebaropen == false ? 
            <span className="links_name">Add student</span>:null}
          </a>
        </li>
       
        <li>
          <a href="/admin/jobs">
          <BriefcaseIcon style={{width:22, height:22, color:"white"}}/>
          {sidebaropen == false ? 
            <span className="links_name">Jobs</span>:null}
          </a>
        </li>

        <li>
          <a href="/admin/applications">
          <BriefcaseIcon style={{width:22, height:22, color:"white"}}/>
          {sidebaropen == false ? 
            <span className="links_name">Applications</span>:null}
          </a>
        </li>
        
        <li className="log_out">
          <a onClick={logout} href="#">
          <ArrowLeftOnRectangleIcon style={{width:22, height:22, color:"white"}}/>
          {sidebaropen == false ?
            <span className="links_name">Log out</span>:null}
          </a>
        </li>
      </ul>
  </div>
  <section className="home-section">
    <nav>
      <div onClick={() => setSideBarOpen(!sidebaropen)} className="sidebarBtn">
      <Bars4Icon style={{width:22, height:22}} />
      </div>
      <span className="dashboard">
      <a href='/admin/profile' className="dashboard btn btn-success">Profile</a>
        
      &nbsp;&nbsp;&nbsp;Dashboard</span>
      <div className="profile-details">
        <span className="admin_name">Admin</span>
      </div>
    </nav>
    <br/>

    <h2>Jobs</h2>
    
<div className="table-wrapper">
    <table className="fl-table">
        <thead>
        <tr>
            <th>Job title</th>
            <th>Applicant name</th>
            <th>Submission date</th>
            <th>Status</th>
            <th>Details</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        
        {applications?applications.map((application,index)=><tr>
            <td className='tableRow'>{application.job.length>0?application.job[0].job_title:"----"}</td>
            <td className='tableRow'>{application.user.length>0?application.user[0].student.name:"----"}</td>
            <td className='tableRow'>{new Date(application.createdAt).toLocaleDateString()}</td>
            <td className='tableRow'>{application.is_accepted==0 && application.is_rejected==0?"Pending":null}{application.is_accepted == 1?"Accepted":"Rejected"} </td>
            <td className='tableRow'>
              <a href={"/admin/application/details/"+application._id}>
              See
              </a>
              </td>
            <td>
            <TrashIcon onClick={() => Delete(application._id)} style={{width:22, height:22, cursor:'pointer'}}/>
            </td>
        </tr>):null}
        
        
        </tbody>
    </table>
</div>
    
  </section>
      </div>
    )
  }

  export default Applications;