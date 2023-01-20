import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import  Axios  from 'axios';
import validator from 'validator';
class  AddUserModel extends React.Component {

    state = {
        email:"",
        name:"",
        password:"",
        about_me:"",
        education:"",
        last_degree:"",
        student_cv:"",
        role:"",
        domain:"",
        address:""
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

        if(this.state.password.length<1){
            password_error = "Please enter a password"
            error = password_error
        }

        if(this.state.role.length<1){
            role_error = "Role is required"
            error = role_error
        }
        

        if(this.state.student_cv.length<1){
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



        if(role_error || name_error || email_error || password_error || confirm_password_error || about_me_error || last_degree_error || education_error || cv_error){
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

        if(this.state.password.length<1){
            password_error = "Please enter a password"
            error = password_error
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


    validate_admin_form = ()=>{
        let error = ""
        if(validator.isEmail(this.state.email) == false){
            error = "Please enter a valid email"
        }


        if(this.state.password.length<1){
            error = "Please enter a password"
        }

        if(this.state.name.length<1){
            error = "Please enter a name"
        }

        if(error){
            alert(error)
            return false
        }else{
            return true
        }
    }


    add_admin = ()=>{
        let formData = new FormData()
       
        formData.append("email",this.state.email)
        formData.append("password",this.state.password)
        formData.append("role",this.state.role)
        Axios.post("http://localhost:5000/apis/admin/add_user",formData)
        .then(res=>{
            alert(res.data.msg)
        })
        .catch(err=>{
            alert("Something went wrong")
        })
    }

    add_student = ()=>{
                console.log("I am Student")
                let formData = new FormData()
                formData.append("name",this.state.name)
                formData.append("email",this.state.email)
                formData.append("password",this.state.password)
                formData.append("about_me",this.state.about_me)
                formData.append("role",this.state.role)
    
                formData.append("education",this.state.education)
                formData.append("last_degree",this.state.last_degree)
                formData.append("student_cv",this.state.student_cv)
                Axios.post("http://localhost:5000/apis/admin/add_user",formData)
                .then(res=>{

                    alert(res.data.msg)
                    if(this.props.get_all_users){
                        this.props.get_all_users()
                    }
                })
                .catch(err=>{
                    alert("Something went wrong")
                })
    }


    add_employer = ()=>{
        let formData = new FormData()
        formData.append("email",this.state.email)
        formData.append("name",this.state.name)
        formData.append("role",this.state.role)

        formData.append("password",this.state.password)
        formData.append("domain",this.state.domain)
        formData.append("address",this.state.address)
        Axios.post("http://localhost:5000/apis/admin/add_user",formData)
        .then(res=>{
            alert(res.data.msg)
        })
        .catch(err=>{
            alert("Something went wrong")
        })

    }

    add_user = ()=>{
        if(this.state.role.length<1){
            alert("Please select a role")
            return false
        }

        let validate = ""
        if(this.state.role == "student"){
            validate = this.validate_student_form()

            if(validate){
                this.add_student()
    
            }
        }else if(this.state.role == "employer"){
            validate = this.validate_employer_form()
            if(validate){
                this.add_employer()
            }
        }else if(this.state.role == "admin"){
            validate = this.validate_admin_form()
            if(validate){
                this.add_admin()
            }
        }
        
    }

  
    render(){
    return(

<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Add User</h5>
       
      </div>
      <div class="modal-body">

      <div className="col-md-6">
    <div className="wow fadeInUp" data-wow-delay="0.5s" >
        
            <div className="row g-3" >
                {this.state.role != "admin"?<div className="col-md-12">
                    <div className="form-floating" >
                        <input type="text" className="form-control" id="name" onChange={(val)=>this.setState({name:val.target.value})} style={{width:450}} placeholder="Your Name"/>
                        <label for="name">Your Name</label>
                    </div>
                </div>:null}

                <div className="col-12" >
                    <div className="form-floating">
                        <input type="email" className="form-control" id="email" onChange={(val)=>this.setState({email:val.target.value})} style={{width:450}} placeholder="Your Email"/>
                        <label for="email">Your Email</label>
                    </div>
                </div>
                
                <div className="col-12">
                    <div className="form-floating">
                        <input type="password" className="form-control" id="password" onChange={(val)=>this.setState({password:val.target.value})} style={{width:450}} placeholder="Password"/>
                        <label for="password">Password</label>
                    </div>
                </div>

             

                <div class="col-md-12">
                <select onChange={(e) => this.setState({role:e.target.value})} style={{width:450}} class="form-select">
                <option selected disabled value="Role">Role</option>
                <option value="employer">Employer</option>
                <option value="student">Student</option>
                <option value="admin">Admin</option>

                </select>
                </div>

                {this.state.role === 'employer' ?
                <>
                <div className="col-12">
                    <div className="form-floating">
                        <input type="text" className="form-control" style={{width:450}} onChange={(val)=>this.setState({ domain:val.target.value })} id="domain" placeholder="Domain"/>
                        <label for="domain">Domain</label>
                    </div>
                </div>

                <div className="col-12">
                    <div className="form-floating">
                        <input type="text" className="form-control" style={{width:450}} onChange={(val)=>this.setState({address:val.target.value})} id="address" placeholder="Address"/>
                        <label for="address">Address</label>
                    </div>
                </div>
                </>
                :(
                    this.state.role === 'student' ?
                    <>
                <div className="col-12">
                    <div className="form-floating">
                        <input type="text" style={{width:450}} onChange={(val)=>this.setState({education:val.target.value})} className="form-control" id="education" placeholder="Education"/>
                        <label for="education">Education</label>
                    </div>
                </div>

                <div className="col-12">
                    <div className="form-floating">
                        <input type="text" onChange={(val)=>this.setState({last_degree:val.target.value})} className="form-control" style={{width:450}} id="degree" placeholder="Last degree"/>
                        <label for="degree">Last degree</label>
                    </div>
                </div>

                <div className="col-12">
                    <div className="form-floating">
                        <textarea class="form-control" style={{width:450}} onChange={(val)=>this.setState({about_me:val.target.value})} placeholder="About me" id="about_me"></textarea>
                        <label for="about_me">About me</label>
                    </div>
                </div>

                <div className="col-12">
                <label className="btn btn-success w-100 py-3" for="cv">Upload CV</label>
                    <input type="file" accept=".pdf"  onChange={this.handleCV} style={{display:'none',width:450}} className="form-control" id="cv"/>
                </div>
                
                </>:null
                )
                
                }
                
                <div className="col-12">
                    <button onClick={() => this.add_user()} className="btn btn-success w-100 py-3" type="submit" style={{width:450}}>Register</button>
                </div>
            </div>
        

       
    </div>
</div>
                           
        
                        </div>
                      </div>
                    </div>
                  </div>

    )
    }
}

export default AddUserModel;