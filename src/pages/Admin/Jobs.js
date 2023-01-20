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

  
const Jobs = () => {
    const [sidebaropen, setSideBarOpen] = useState(false);
    const [jobs,setJobs]=useState([])

   const get_all_jobs = ()=>{
      Axios.get("http://localhost:5000/apis/admin/get_all_jobs")
      .then(res=>{
        console.log(res.data.jobs)
        setJobs(res.data.jobs)
      })
    }
    const Delete = (id) => {
      Axios.get("http://localhost:5000/apis/admin/delete_job?job_id="+id)
      .then(res=>{
        get_all_jobs()
      })
      .catch(err=>{
        alert("Something went wrong")
      })
    }
    const logout = ()=>{
      localStorage.removeItem('user')
      return window.location = "/login"
    }

    useEffect(()=>{
      get_all_jobs()
    },[])
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
            <span className="links_name">Add User</span>:null}
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
            <th>Title</th>
            <th>Applications</th>
            <th>Posted By</th>
            <th>Details</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {jobs.map(job=>{
          return   <tr>
          <td className='tableRow'>{job.job_title}</td>
          <td className='tableRow'>{job.applications.length}</td>
          <td className='tableRow'>{job.owner[0].employer.name}</td>
          <td className='tableRow'>
            <a href={"/admin/job/details/"+job._id}>
            See
            </a>
            </td>
          <td>
          <TrashIcon onClick={() => Delete(job._id)} style={{width:22, height:22, cursor:'pointer'}}/>
          </td>
      </tr>
        })}
      
        
        
        </tbody>
    </table>
</div>
    
  </section>
      </div>
    )
  }

  export default Jobs;