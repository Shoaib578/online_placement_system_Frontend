import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/style.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from 'react-router-dom';
import validator from 'validator'
import  Axios  from "axios";
import base_url from "../../base_url";


class Login extends React.Component {
    state = {
        email:"",
        password : ""
    }

    isLoggedIn = ()=>{
        const storage = localStorage.getItem('user')
        const parse = JSON.parse(storage)

        if(parse != null){
            if(parse.is_student == 1){
                return window.location = "/student/dashboard"

            }else if(parse.is_employer == 1){
                return window.location = "/employer/dashboard"

            }
        }
    }
    validate = ()=>{
        let email_error = ""
        let password_error = ""
        let error = ""

        if(validator.isEmail(this.state.email) == false){
            email_error = "Please enter a valid email"
            error = email_error
        }

        if(this.state.password.length<1){
            password_error = "Please enter a valid password"
            error = password_error
        }

        if(email_error || password_error){
            alert(error)
            return false
        }else{
            return true
        }
    }

    login = ()=>{
        let validate = this.validate()

        if(validate){
           
            let formData = new FormData()
            formData.append("email", this.state.email)
            formData.append("password", this.state.password)

            Axios.post("http://localhost:5000/apis/auth/login",formData)
            .then(res=>{
                if(res.data.msg == "logged in Succesfully"){
                    localStorage.setItem('user',JSON.stringify(res.data.user))

                    if(res.data.user.is_student == 1){
                        window.location = "/student/dashboard"
                    }else if(res.data.user.is_employer == 1){
                        window.location = "/employer/dashboard"

                    }else if(res.data.user.is_admin == 1){
                        window.location = "/admin/students"

                    }
                }else{
                    alert(res.data.msg)
                }
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

                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input type="email" onChange={(val)=>this.setState({email:val.target.value})} className="form-control" id="email" placeholder="Your Email"/>
                                            <label for="email">Your Email</label>
                                        </div>
                                    </div>
                                    
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input type="password" onChange={(val)=>this.setState({password:val.target.value})} className="form-control" id="password" placeholder="Password"/>
                                            <label for="password">Password</label>
                                        </div>
                                    </div>
                                    
                                    <div className="col-12">
                                        <button onClick={()=>this.login()} className="btn btn-success w-100 py-3" >Sign In</button>
                                    </div>
                                </div>
                           
                            <p className="mt-3">Don't have an account <Link to="/register">Register</Link></p>
                        </div>
                    </div>

            </div>
        </div>


    )
    }
}

export default Login;