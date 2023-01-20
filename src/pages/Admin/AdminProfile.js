import React from 'react'
import Axios from 'axios'
import validator from 'validator'

const storage = localStorage.getItem('user')
const parse = JSON.parse(storage)
export default class AdminProfile extends React.Component {
    
    state = {
        email:"",
        password : ""
    }

    isLoggedIn = ()=>{
        

        if(parse != null){
            if(parse.is_student == 1){
                return window.location = "/student/dashboard"

            }else if(parse.is_employer == 1){
                return window.location = "/employer/dashboard"

            }
        }else{
            window.location = "/login"
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

    get_admin_details = ()=>{
        Axios.get("http://localhost:5000/apis/admin/get_user_by_id?user_id="+parse._id)
        .then(res=>{

            this.setState({email:res.data.user.email})
        })
    }
    update = ()=>{
        let validate = this.validate()

        if(validate){
           
            let formData = new FormData()
            formData.append("email", this.state.email)
            formData.append("password", this.state.password)
            
            formData.append("admin_id", parse._id)

            Axios.post("http://localhost:5000/apis/admin/update_admin_profile",formData)
            .then(res=>{
               
                alert("Updated Successfully")
                this.get_admin_details()
            })
            .catch(err=>{

            })

        }
    }

    componentDidMount(){
        this.isLoggedIn()
        this.get_admin_details()
    }
    render(){
    return (
        <div className="container-xxl py-5">
            <div className="container d-flex align-items-center flex-column">
                

                <div className="col-md-6">
                        <div className="wow fadeInUp" data-wow-delay="0.5s">
                           
                                <div className="row g-3">

                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input type="email" onChange={(val)=>this.setState({email:val.target.value})} value={this.state.email} className="form-control" id="email" placeholder="Your Email"/>
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
                                        <button onClick={()=>this.update()} className="btn btn-success w-100 py-3" >Update</button>
                                    </div>
                                </div>
                           
                           
                        </div>
                    </div>

            </div>
        </div>


    )
    }
}