import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import '../../css/style.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from 'react-router-dom';
import  Axios  from "axios";
  let storage = localStorage.getItem('user')
  let parse = JSON.parse(storage)


  let params = window.location.pathname.split("/")
class JobApply extends React.Component  {
    constructor(props){
        super(props)
        this.state = {
            job:"",
            message:"",
            is_already_applyed:false
        }

        this.isLoggedIn()
        this.get_job_details()

    }
   
    isLoggedIn = ()=>{
        const storage = localStorage.getItem('user')
        const parse = JSON.parse(storage)

        if(parse == null){
           return window.location = "/login"
        }
    }
    

    get_job_details = ()=>{
        
        Axios.get("http://localhost:5000/apis/student/get_job_by_id?job_id="+params[3]+"&&student_id="+parse._id)
        .then(res=>{
            console.log(res.data.job)
            this.setState({job:res.data.job},()=>{
                if(res.data.is_applied == 1){
                    this.setState({is_already_applyed:true})
                }
            })
        })
    }

    apply_for_job = ()=>{
        let formData = new FormData()
        formData.append("student_id",parse._id)
        formData.append("job_id",params[3])
        formData.append("message",this.state.message)
        Axios.post("http://localhost:5000/apis/student/apply_for_job",formData)
        .then(res=>{
            alert("You have successfully applied")
            this.setState({is_already_applyed:true})
        })
        .catch(err=>{
            alert("Something went wrong")
        })
    }

  
    render(){
    return(
        <div className="container-xxl bg-white p-0">
      

        {/* Job Detail Starts */}
        <div class="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
            <div class="container">
                <div class="row gy-5 gx-4">
                    <div class="col-lg-8">
                        {this.state.job?<div>

                        <div class="d-flex align-items-center mb-5">
                            <div class="text-start">
                                <h3 class="mb-3">{this.state.job.job_title}</h3>
                            </div>
                        </div>

                        <div class="mb-5">
                            <h4 class="mb-3">Job description</h4>
                            <p>{this.state.job.job_description}</p>
                            <h4 class="mb-3">Requirements</h4>
                            <p>{this.state.job.job_requirements}</p>
                        </div>
                        </div>:null}
        
                        {parse.is_student == 1?<div class="">

                            {this.state.is_already_applyed == false?<div>

                            <h4 class="mb-4">Apply For The Job</h4>
                            
                                <div class="row g-3">
                                    <div class="col-12">
                                        <textarea class="form-control" onChange={(val)=>this.setState({message:val.target.value})} rows="5" placeholder="Message"></textarea>
                                    </div>
                                    <div class="col-12">
                                        <button onClick={this.apply_for_job} class="btn btn-success w-100" type="submit">Apply Now</button>
                                    </div>
                                </div>
                                
                           </div>
                           :
                           <div className="alert alert-primary">
                           <h2>You have applied for this job</h2>
                           </div>
                           }
                        </div>:null}
                    </div>
        
                </div>
            </div>
        </div>
        {/* Job Detail Ends  */}


        </div>
    )
    }
}

export default JobApply;