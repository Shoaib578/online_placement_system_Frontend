import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/style.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    redirect,
  } from 'react-router-dom';
  import { createBrowserHistory } from "history";
  import base_url from '../../base_url'
import Axios from 'axios'
import Spinner from "react-activity/dist/Dots";
import "react-activity/dist/Dots.css";
import validator from 'validator'
class Register extends React.Component {
    state  ={
        role:"",
        name:"",
        email:"",
        password:"",
        confirm_password:"",
        domain:"",
        address:"",
        education:"",
        last_degree:"",
        about_me:"",
        cv:"",


        
    }

    isLoggedIn = ()=>{
        const storage = localStorage.getItem('user')
        const parse = JSON.parse(storage)

        if(parse != null){
            if(parse.is_student == 1){
                return window.location = "/student/dashboard"

            }else if(parse.is_employer == 1){
                return window.location = "/employer/dashboard"

            }else if(parse.is_admin == 1){
                window.location = "/admin/students"

            }
        }
    }

    handleCV = (cv)=>{
        console.log(cv.target.files[0])
        this.setState({cv:cv.target.files[0]})
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

        let error = ""

        if(this.state.name.length<1){
            name_error = "Please enter a name"
            error = name_error 
        }

        if(validator.isEmail(this.state.email) == false){
            email_error = "Invalid Email Address"
            error = email_error
        }

        if(this.state.password.length<1){
            password_error = "Please enter a password"
            error = password_error
        }

        if(this.state.confirm_password != this.state.password){
            confirm_password_error = "Confirm Password does not match"
            error = confirm_password_error
        }

        if(this.state.cv.length<1){
            cv_error = "Please upload your cv"
            error = cv_error
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



        if(name_error || email_error || password_error || confirm_password_error || about_me_error || last_degree_error || education_error || cv_error){
            alert(error)
            return false
        }else{
            return true
        }
    }



    validate_employer_form = ()=>{
        let name_error = ""
        let email_error = ""
        let password_error = ""
        let confirm_password_error = ""
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

        if(this.state.password.length<1){
            password_error = "Please enter a password"
            error = password_error
        }

        if(this.state.confirm_password != this.state.password){
            confirm_password_error = "Confirm Password does not match"
            error = confirm_password_error
        }

        if(this.state.address.length<1){
            address_error = "Address is required"
            error = address_error
        }

        if(this.state.domain.length<1){
            domain_error = "Domain is required"
            error = domain_error
        }


        if(name_error || email_error || password_error || confirm_password_error || address_error || domain_error){
            alert(error)
            return false
        }else{
            return true
        }

        
       
    }

    register = ()=>{
        console.log("Hello there")
        if(this.state.role.length<1){
            alert("Please select a role")
            return false
        }

        let validate = ""

        if(this.state.role == "student"){
            
            validate = this.validate_student_form()
        }else if(this.state.role == "employer"){
            validate = this.validate_employer_form()
        }


        if(validate){
      
        let formData = new FormData()
        formData.append("role",this.state.role)
        formData.append("email",this.state.email)
        formData.append("password",this.state.password)

        formData.append("name",this.state.name)

        //student
        formData.append("about_me",this.state.about_me)
        formData.append("education",this.state.education)
        formData.append("cv",this.state.cv)
        formData.append("degree",this.state.last_degree)


        //employer

        formData.append("domain",this.state.domain)
        formData.append("address",this.state.address)
      
        Axios.post("http://localhost:5000/apis/auth/signup",formData)
        .then(res=>{
            alert(res.data.msg)
            if(res.data.msg == "Signup successfully"){
                return window.location.href = "/login"
            }
        })
        .catch(err=>{
            alert("Something went wrong")
        })
    }



    }

    componentDidMount(){
        this.isLoggedIn()
    }
    render(){

    return (
        <div className="container-xxl py-5">
            <div className="container d-flex align-items-center flex-column">
                <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Online Placement System</h1>

                <div className="col-md-6">
                        <div className="wow fadeInUp" data-wow-delay="0.5s">
                            
                                <div className="row g-3">
                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="name" onChange={(val)=>this.setState({name:val.target.value})} placeholder="Your Name"/>
                                            <label for="name">Your Name</label>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input type="email" className="form-control" id="email" onChange={(val)=>this.setState({email:val.target.value})} placeholder="Your Email"/>
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
                                            <input type="password" className="form-control" id="confirmpassword" onChange={(val)=>this.setState({ confirm_password:val.target.value })} placeholder="Confirm password"/>
                                            <label for="confirmpassword">Confirm password</label>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                    <select onChange={(e) => this.setState({role:e.target.value})} class="form-select">
                                    <option selected disabled value="Role">Role</option>
                                    <option value="employer">Employer</option>
                                    <option value="student">Student</option>
                                    </select>
                                    </div>

                                    {this.state.role === 'employer' ?
                                    <>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" onChange={(val)=>this.setState({ domain:val.target.value })} id="domain" placeholder="Domain"/>
                                            <label for="domain">Domain</label>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" onChange={(val)=>this.setState({address:val.target.value})} id="address" placeholder="Address"/>
                                            <label for="address">Address</label>
                                        </div>
                                    </div>
                                    </>
                                    :(
                                        this.state.role === 'student' ?
                                        <>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input type="text" onChange={(val)=>this.setState({education:val.target.value})} className="form-control" id="education" placeholder="Education"/>
                                            <label for="education">Education</label>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input type="text" onChange={(val)=>this.setState({last_degree:val.target.value})} className="form-control" id="degree" placeholder="Last degree"/>
                                            <label for="degree">Last degree</label>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea class="form-control" onChange={(val)=>this.setState({about_me:val.target.value})} placeholder="About me" id="about_me"></textarea>
                                            <label for="about_me">About me</label>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                    <label className="btn btn-success w-100 py-3" for="cv">Upload CV</label>
                                        <input type="file" accept=".pdf" onChange={this.handleCV} style={{display:'none'}} className="form-control" id="cv"/>
                                    </div>
                                    
                                    </>:null
                                    )
                                    
                                    }
                                    
                                    <div className="col-12">
                                        <button onClick={() => this.register()} className="btn btn-success w-100 py-3" type="submit">Register</button>
                                    </div>
                                </div>
                            

                            <p className="mt-3">Already have an account <Link to="/login">Login</Link></p>
                        </div>
                    </div>

            </div>
        </div>


    )
}

}

export default Register;