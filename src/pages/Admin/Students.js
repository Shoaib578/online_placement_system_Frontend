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
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddStudentModel from './AddUserModel';

import validator from 'validator';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import  Axios  from 'axios';

  class Students extends React.Component {
     state = {
      sidebaropen:true,
      students:[],
      email:"",
      about_me:"",
      name:"",
      last_degree:"",
      education:"",
      student_cv:"",
      
      password:"",
      selected_user_id:""
      
      
     }
     handleCV = (cv)=>{
      console.log(cv.target.files[0])
      this.setState({student_cv:cv.target.files[0]})
    }


    validate_student_form = ()=>{
      let name_error = ""
      let email_error = ""
      let password_error = ""
      let confirm_password_error = ""
      let cv_error = ""
      let about_me_error = ""
      let last_degree_error = ""
      let education_error = ""
      let role_error = ""
      let error = ""

      if(this.state.name.length<1){
          name_error = "Please enter a name"
          error = name_error 
      }

      if(validator.isEmail(this.state.email) == false){
          email_error = "Invalid Email Address"
          error = email_error
      }

     
     
      if(this.state.about_me.length<1){
          about_me_error = "About me is required"
          error = about_me_error
      }

      if(this.state.last_degree.length<1){
          last_degree_error= "last degree is required"
          error = last_degree_error
      }

      if(this.state.education.length<1){
          education_error = "education is required"
          error = education_error
      }



      if(name_error || email_error || password_error || confirm_password_error || about_me_error || last_degree_error || education_error || cv_error || role_error){

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


     get_all_students = ()=>{
      
      Axios.get("http://localhost:5000/apis/admin/get_all_students")
      .then(res=>{
        this.setState({students:res.data.students})
      })
     }

     delete_student = (student_id)=>{
      Axios.get("http://localhost:5000/apis/admin/delete_user?user_id="+student_id)
      .then(res=>{
        this.get_all_students()
      })
      .catch(err=>{
        alert("Something Went Wrong")
      })
     }
     get_student_details = (user_id)=>{
          this.setState({selected_user_id:user_id})
          Axios.get("http://localhost:5000/apis/admin/get_user_by_id?user_id="+user_id)
          .then(res=>{
              console.log(res.data.user)

              this.setState({email:res.data.user.email,about_me:res.data.user.student.about_me,education:res.data.user.student.education,last_degree:res.data.user.student.last_degree,name:res.data.user.student.name})
          })
     
     

    }


    update_student = ()=>{
      let validate = this.validate_student_form()
      if(validate){
      let formData = new FormData()
      formData.append("user_id",this.state.selected_user_id)
      formData.append("email",this.state.email)
      formData.append("name",this.state.name)
      formData.append("about_me",this.state.about_me)


      formData.append("education",this.state.education)
      formData.append("last_degree",this.state.last_degree)
      formData.append("student_cv",this.state.student_cv)
      formData.append("password",this.state.password)

      

      Axios.post("http://localhost:5000/apis/admin/update_student",formData)
      .then(res=>{
        alert(res.data.msg)
        this.get_all_students()
      })
      .catch(err=>{
        alert("Something Went Wrong")
      })
    }
    }

     componentDidMount(){
      this.get_all_students()
     }
    render(){

    

    return (
      <div>

        <AddStudentModel get_all_users={()=>this.get_all_students()}/>
        
        
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
                                            <input type="text" className="form-control" id="education" onChange={(val)=>this.setState({education:val.target.value})} value={this.state.education} placeholder="Education"/>
                                            <label for="education">Education</label>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" value={this.state.last_degree} onChange={(val)=>this.setState({last_degree:val.target.value})} id="degree" placeholder="Last degree"/>
                                            <label for="degree">Last degree</label>
                                        </div>
                                    </div>


                               

                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea class="form-control" placeholder="About me" onChange={(val)=>this.setState({about_me:val.target.value})} value={this.state.about_me} id="about_me"></textarea>
                                            <label for="about_me">About me</label>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                    <label className="btn btn-success w-100 py-3" for="cv">Upload CV</label>
                                        <input type="file" style={{display:'none'}} onChange={this.handleCV} className="form-control" id="cv"/>
                                    </div>
                                  
                                    
                                    <div className="col-12">
                                        <button onClick={this.update_student} className="btn btn-success w-100 py-3" type="submit">Update</button>
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
          {this.state.sidebaropen === false ? 
            <span className="links_name">Employers</span>:null}
          </a>
        </li>
        
        
        <li  data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
          <a href="#">
          <UserPlusIcon style={{width:22, height:22, color:"white"}}/>
          {this.state.sidebaropen === false ? 
            <span className="links_name">Add User</span>:null}
          </a>
        </li>
       

        <li>
          <a href="/admin/jobs">
          <BriefcaseIcon style={{width:22, height:22, color:"white"}}/>
          {this.state.sidebaropen === false ? 
            <span className="links_name">Jobs</span>:null}
          </a>
        </li>

        <li>
          <a href="/admin/applications">
          <BriefcaseIcon style={{width:22, height:22, color:"white"}}/>
          {this.state.sidebaropen === false ? 
            <span className="links_name">Applications</span>:null}
          </a>
        </li>
        
        <li className="log_out">
          <a onClick={this.logout} href="#">
          <ArrowLeftOnRectangleIcon style={{width:22, height:22, color:"white"}}/>
          {this.state.sidebaropen === false ?
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

    <h2>Students</h2>
    
<div className="table-wrapper">
    <table className="fl-table">
        <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
           
            <th>Details</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        
        {this.state.students.length>0?this.state.students.map((student,index)=><tr>
            <td className='tableRow'>{student.student.name}</td>
            <td className='tableRow'>{student.email}</td>
            
            <td className='tableRow'>
              <a href={"/admin/student/details/"+student._id}>
              See
              </a>
              </td>
            <td>
            <PencilSquareIcon data-bs-toggle="modal" onClick={()=>this.get_student_details(student._id)} data-bs-target="#updateStudentModalCenter" style={{width:22, height:22, cursor:'pointer'}}/>
            <TrashIcon onClick={()=>this.delete_student(student._id)} style={{width:22, height:22, cursor:'pointer'}}/>
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

  export default Students;

