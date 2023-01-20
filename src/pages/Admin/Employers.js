import React, {useState} from 'react';
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
import AddStudentModel from './AddUserModel';
import Axios from 'axios'
import validator from 'validator';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from 'react-router-dom';


  class Employers extends React.Component {
    state = {
      sidebaropen:true,
      employers:[],
      email:"",
      password:"",
      address:"",
      domain:"",
      name:"",
      selected_user_id:""
      
      
     }
     validate_employer_form = ()=>{
      let name_error = ""
      let email_error = ""
      let password_error = ""
      
      let domain_error = ""
      let address_error = ""
      let error = ""



      if(this.state.name.length<1){
          name_error = "Please enter a name"
          error = name_error 
      }

      if(validator.isEmail(this.state.email) == false){
          email_error = "Invalid Email Address"
          error = email_error
      }

  


      if(this.state.address.length<1){
          address_error = "Address is required"
          error = address_error
      }

      if(this.state.domain.length<1){
          domain_error = "Domain is required"
          error = domain_error
      }


      if(name_error || email_error || password_error || address_error || domain_error){
          alert(error)
          return false
      }else{
          return true
      }

      
     
  }
  logout = ()=>{
    localStorage.removeItem('user')
    return window.location = "/login"
  }

     get_all_employers = ()=>{
      
      Axios.get("http://localhost:5000/apis/admin/get_all_employers")
      .then(res=>{
        this.setState({employers:res.data.employers})
      })
     }

     delete_employer = (student_id)=>{
      Axios.get("http://localhost:5000/apis/admin/delete_user?user_id="+student_id)
      .then(res=>{
        this.get_all_employers()
      })
      .catch(err=>{
        alert("Something Went Wrong")
      })
     }
     get_employer_details = (user_id)=>{
          this.setState({selected_user_id:user_id})
          Axios.get("http://localhost:5000/apis/admin/get_user_by_id?user_id="+user_id)
          .then(res=>{
              console.log(res.data.user)
              
              this.setState({email:res.data.user.email,name:res.data.user.employer.name,domain:res.data.user.employer.domain,address:res.data.user.employer.address})
          })
     
     

    }


    update_employer = ()=>{
      let validate = this.validate_employer_form()
      if(validate){
      let formData = new FormData()
      formData.append("user_id",this.state.selected_user_id)
      formData.append("email",this.state.email)
      formData.append("name",this.state.name)
      formData.append("address",this.state.address)
      formData.append("domain",this.state.domain)

     
      formData.append("password",this.state.password)

      

      Axios.post("http://localhost:5000/apis/admin/update_employer",formData)
      .then(res=>{
        alert(res.data.msg)
        this.get_all_employers()
      })
      .catch(err=>{
        alert("Something Went Wrong")
      })
    }
    }

     componentDidMount(){
      this.get_all_employers()
     }
    render(){

    

    return (
      <div>

        <AddStudentModel get_all_users={()=>this.get_all_employers()}/>
        
        
        {/* Update Student Model Start */}
        <div class="modal fade" id="updateStudentModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Update student</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

     
                                <div className="row g-3">
                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="name" onChange={(val)=>this.setState({name:val.target.value})} value={this.state.name} placeholder="Your Name"/>
                                            <label for="name">Your Name</label>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input type="email" className="form-control" id="email" onChange={(val)=>this.setState({email:val.target.value})} value={this.state.email} placeholder="Your Email"/>
                                            <label for="email">Your Email</label>
                                        </div>
                                    </div>
                                    
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input type="password" className="form-control" id="password" onChange={(val)=>this.setState({password:val.target.value})} placeholder="Password"/>
                                            <label for="password">Password</label>
                                        </div>
                                    </div>

                                   
                                  
                                    
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="domain" onChange={(val)=>this.setState({domain:val.target.value})} value={this.state.domain} placeholder="Domain"/>
                                            <label for="education">Domain</label>
                                        </div>
                                    </div>


                                         
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="address" onChange={(val)=>this.setState({address:val.target.value})} value={this.state.address} placeholder="Address"/>
                                            <label for="education">Address</label>
                                        </div>
                                    </div>

                                    
                                  
                                    
                                    <div className="col-12">
                                        <button onClick={this.update_employer} className="btn btn-success w-100 py-3" type="submit">Update</button>
                                    </div>
                                </div>
                            
        
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Update Student Model End */}
        <div className={this.state.sidebaropen === false ? 'sidebar':'sidebar active'}>
    <div className="logo-details">
    <i class='bx bxl-c-plus-plus'></i>
      <span className="logo_name">OPS</span>
    </div>
      <ul className="nav-links">
        
        <li>
          <a href="/admin/students">
          <AcademicCapIcon style={{width:22, height:22, color:"white"}}/>
            {this.state.sidebaropen === false ? 
            <span className="links_name">Students</span>:null}
          </a>
        </li>
        <li>
          <a href="/admin/employers">
          <BriefcaseIcon style={{width:22, height:22, color:"white"}}/>
          {this.state.sidebaropen == false ? 
            <span className="links_name">Employers</span>:null}
          </a>
        </li>
        <li  data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
          <a href="#">
          <UserPlusIcon style={{width:22, height:22, color:"white"}}/>
          {this.state.sidebaropen == false ? 
            <span className="links_name">Add User</span>:null}
          </a>
        </li>
       

        <li>
          <a href="/admin/jobs">
          <BriefcaseIcon style={{width:22, height:22, color:"white"}}/>
          {this.state.sidebaropen == false ? 
            <span className="links_name">Jobs</span>:null}
          </a>
        </li>

        <li>
          <a href="/admin/applications">
          <BriefcaseIcon style={{width:22, height:22, color:"white"}}/>
          {this.state.sidebaropen == false ? 
            <span className="links_name">Applications</span>:null}
          </a>
        </li>
        
        <li className="log_out">
          <a onClick={this.logout} href="#">
          <ArrowLeftOnRectangleIcon style={{width:22, height:22, color:"white"}}/>
          {this.state.sidebaropen == false ?
            <span className="links_name">Log out</span>:null}
          </a>
        </li>
      </ul>
  </div>
  <section className="home-section">
    <nav>
      <div onClick={() => {
        if(this.state.sidebaropen){
          this.setState({sidebaropen:false})
        }else{
          this.setState({sidebaropen:true})

        }
      }} className="sidebarBtn">
      <Bars4Icon style={{width:22, height:22}} />
      </div>
      <span className="dashboard">
      <a href='/admin/profile' className="dashboard btn btn-success">Profile</a>
        
      &nbsp;&nbsp;&nbsp;Dashboard</span>
    
    </nav>
    <br/>

    <h2>Employers</h2>
    
<div className="table-wrapper">
    <table className="fl-table">
        <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Domain</th>
            <th>Address</th>
           
            <th>Details</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        
        {this.state.employers.length>0?this.state.employers.map((employer,index)=><tr>
            <td className='tableRow'>{employer.employer.name}</td>
            <td className='tableRow'>{employer.email}</td>
            <td className='tableRow'>{employer.employer.domain}</td>
            <td className='tableRow'>{employer.employer.address}</td>
            
            <td className='tableRow'>
              <a href={"/admin/employer/details/"+employer._id}>
              See
              </a>
              </td>
            <td>
            <PencilSquareIcon data-bs-toggle="modal" onClick={()=>this.get_employer_details(employer._id)} data-bs-target="#updateStudentModalCenter" style={{width:22, height:22, cursor:'pointer'}}/>
            <TrashIcon onClick={()=>this.delete_employer(employer._id)} style={{width:22, height:22, cursor:'pointer'}}/>
            </td>
        </tr>):null}
        
        
        </tbody>
    </table>
</div>
    
  </section>
      </div>
    )
    }
  }

  export default Employers;