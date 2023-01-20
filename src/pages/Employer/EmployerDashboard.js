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
class EmployerDashboard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            jobs:[]
        }
        this.isLoggedIn()
        
    }
    isLoggedIn = ()=>{
        const storage = localStorage.getItem('user')
        const parse = JSON.parse(storage)

        if(parse == null){
           return window.location = "/login"
        }else{
            if(parse.is_student == 1){
                return window.location = "/student/dashboard"
            }else if(parse.is_admin == 1){
                return window.location = "/admin/students"

            }

        
        }
    }

    getPostedJobs = ()=>{
        
        Axios.get("http://localhost:5000/apis/employer/get_all_posted_jobs_by_employer_id?employer_id="+parse._id)
        .then(res=>{
            console.log(res.data.jobs)
            this.setState({jobs:res.data.jobs})
        })
    }

    delete_job = (id)=>{
        
        Axios.get("http://localhost:5000/apis/employer/delete_job?job_id="+id)
        .then(res=>{
            console.log("hi")
            this.getPostedJobs()
        })
        .catch(err=>{
            alert("Something Went Wrong")
        })
    }

    componentDidMount(){
        this.getPostedJobs()
    }

    render(){
    
    return (
        <div className="container-xxl bg-white p-0">

       
        {/* Jobs Listing Starts*/}

        <div className="container-xxl py-5">
            <div className="container">
                <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">EMPLOYER DASHBOARD</h1>
                <div className="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
                    
                    <div className="tab-content">
                        <div id="tab-1" class="tab-pane fade show p-0 active">


                            {this.state.jobs.map((job,index)=>{
                                return  <div key={index} className="job-item p-4 mb-4">
                                <div className="row g-4">
                                    <div className="col-sm-12 col-md-8 d-flex align-items-center">
                                        <div className="text-start">
                                           
                                            <h5 style={{color:"green"}} className="mb-3">{job.job_title}</h5>
                                           
                                            <a className="btn btn-sm btn-success" href={"/employer/applicationstojob/"+job._id}>See applications ({job.applications.length})</a>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                        <div className="d-flex mb-3 justify-content-between" style={{width:'45%'}}>
                                            <a className="btn btn-sm btn-success" href={"/employer/updatejob/"+job._id}>Update</a>
                                            <button onClick={()=>this.delete_job(job._id)} className="btn btn-sm btn-danger">Delete</button>
                                        </div>
                                        <small className="text-truncate">Date : {new Date(job.createdAt).toLocaleDateString()}</small>
                                    </div>
                                </div>
                            </div>
                            })}
                           
                           
                            


                          
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Jobs Listing Ends */}



        </div>
    )
    }
}

export default EmployerDashboard;