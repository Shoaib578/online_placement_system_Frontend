import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import '../css/style.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from 'react-router-dom';
import  Axios  from "axios";
import validator from "validator";
  const storage = localStorage.getItem('user')
  const parse = JSON.parse(storage)

  class Profile extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user:"",
            name:"",
            email:"",
            password:"",
            about_me:"",
            last_degree:"",
            education:"",
            domain:"",
            address:"",
            cv:""
        }
        this.isLoggedIn()
        this.get_user_details()
    }
    
    isLoggedIn = ()=>{
       
        if(parse == null){
            return window.location = "/login"
        }
    }


    validate_student_form = ()=>{
        let name_error = ""
        let email_error = ""
        let password_error = ""
      
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



        if(name_error || email_error || password_error  || about_me_error || last_degree_error || education_error || cv_error){
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


        if(name_error || email_error || password_error  || address_error || domain_error){
            alert(error)
            return false
        }else{
            return true
        }

        
       
    }

    get_user_details = ()=>{
        Axios.get("http://localhost:5000/apis/auth/profile?user_id="+parse._id)
        .then(res=>{
            
            if(parse.is_student == 1){
                this.setState({ name:res.data.user.student.name,email:res.data.user.email,about_me:res.data.user.student.about_me,education:res.data.user.student.education,last_degree:res.data.user.student.last_degree})
            }else if(parse.is_employer == 1){
                this.setState({ name:res.data.user.employer.name,email:res.data.user.email,domain:res.data.user.employer.domain,address:res.data.user.employer.address})

            }
        })
    }
    handleCV = (cv)=>{
        console.log(cv.target.files[0])
        this.setState({cv:cv.target.files[0]})
    }

    update_student = ()=>{
        let formData = new FormData()
        formData.append("student_id",parse._id)

        formData.append("email",this.state.email)
        formData.append("password",this.state.password)
        formData.append("name",this.state.name)
        formData.append("about_me",this.state.about_me)

        formData.append("education",this.state.education)
        formData.append("degree",this.state.last_degree)
        formData.append("student_cv",this.state.cv)

        Axios.post("http://localhost:5000/apis/student/update_student_profile",formData)
        .then(res=>{
            alert(res.data.msg)

            if(res.data.msg == "Updated Successfully"){
                this.get_user_details()
            }
        })
        .catch(err=>{
            alert("Something Went Wrong")
        })

    }


    update_employer = ()=>{
        let formData = new FormData()
        formData.append("employer_id",parse._id)

        formData.append("email",this.state.email)
        formData.append("password",this.state.password)
        formData.append("name",this.state.name)
        formData.append("domain",this.state.domain)

        formData.append("address",this.state.address)
        

        Axios.post("http://localhost:5000/apis/employer/update_employer_profile",formData)
        .then(res=>{
            alert(res.data.msg)

            if(res.data.msg == "Updated Successfully"){
                this.get_user_details()
            }
        })
        .catch(err=>{
            alert("Something Went Wrong")
        })
    }

    update = ()=>{
         let validate = ""
        if(parse.is_student == 1){
             validate = this.validate_student_form()
            if(validate){
                this.update_student()

            }
        }else{
             validate = this.validate_employer_form()
            if(validate){
                this.update_employer()

            }
        }
    }
    render(){
    return (
        <div className="container-xxl py-5">
            <div className="container d-flex align-items-center flex-column">
                <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">PROFILE</h1>

                <div className="col-md-6">
                        <div className="wow fadeInUp" data-wow-delay="0.5s">
                            
                                <div className="row g-3">
                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="name" onChange={(val)=>this.setState({name:val.target.value})} value={this.state.name} placeholder="Your Name"/>
                                            <label for="name">Your Name</label>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input type="email" className="form-control" onChange={(val)=>this.setState({email:val.target.value})} value={this.state.email} id="email" placeholder="Your Email"/>
                                            <label for="email">Your Email</label>
                                        </div>
                                    </div>
                                    
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input type="password" onChange={(val)=>this.setState({password:val.target.value})} className="form-control" id="password" placeholder="Password"/>
                                            <label for="password">Password</label>
                                        </div>
                                    </div>

                                  

                                 
                                    
                                    {parse.is_employer == 1?<div className="col-12">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" onChange={(val)=>this.setState({domain:val.target.value})} value={this.state.domain} id="domain" placeholder="Domain"/>
                                            <label for="domain">Domain</label>
                                        </div>
                                    </div>:null}

                                    {parse.is_employer == 1?<div className="col-12">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" value={this.state.address} id="address" placeholder="Address"/>
                                            <label for="address">Address</label>
                                        </div>
                                    </div>:null}
                                    
                                    
                                        
                                    {parse.is_student == 1?<div className="col-12">
                                        <div className="form-floating">
                                            <input type="text" value={this.state.education} onChange={(val)=>this.setState({education:val.target.value})}  className="form-control" id="education" placeholder="Education"/>
                                            <label for="education">Education</label>
                                        </div>
                                    </div>:null}

                                    {parse.is_student == 1?<div className="col-12">
                                        <div className="form-floating">
                                            <input type="text" value={this.state.last_degree} onChange={(val)=>this.setState({last_degree:val.target.value})} className="form-control" va id="degree" placeholder="Last degree"/>
                                            <label for="degree">Last degree</label>
                                        </div>
                                    </div>:null}

                                    {parse.is_student == 1?<div className="col-12">
                                        <div className="form-floating">
                                            <textarea class="form-control" placeholder="About me" onChange={(val)=>this.setState({about_me:val.target.value})} value={this.state.about_me} id="about_me"></textarea>
                                            <label for="about_me">About me</label>
                                        </div>
                                    </div>:null}

                                    {parse.is_student == 1?<div className="col-12">
                                    <label className="btn btn-success w-100 py-3" for="cv">Upload CV</label>
                                        <input type="file" onChange={this.handleCV} style={{display:'none'}} className="form-control" id="cv"/>
                                    </div>:null}
                                    
                                    <div onClick={this.update} className="col-12">
                                        <button className="btn btn-success w-100 py-3" type="submit">Update</button>
                                    </div>
                                </div>
                           

                        </div>
                    </div>

            </div>
        </div>
    )
    }
  }

  export default Profile;