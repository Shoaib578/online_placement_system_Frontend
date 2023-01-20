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
import Axios from 'axios'
let params  = window.location.pathname.split('/')
class ApplicationsToJob extends  React.Component {
    constructor(props){
        super(props)
        this.state = {
            applications:[],
            job_title:""
        }

        this.getApplications()


    }
    
    
    getApplications = ()=>{
        
        Axios.get("http://localhost:5000/apis/employer/get_applications_by_job_id?job_id="+params[3])
        .then(res=>{
            console.log(res.data.applications)
            this.setState({ applications:res.data.applications,job_title:res.data.applications[0].job[0].job_title })
        })
    }


    accept_application = (application_id)=>{
        let formData = new FormData()
        formData.append("application_id", application_id)
        formData.append("is_accepted",1)
        formData.append("is_rejected",0)

        Axios.post("http://localhost:5000/apis/employer/change_application_status",formData)
        .then(res=>{
            this.getApplications()
        })
        .catch(err=>{
            alert("Something went wrong")
        })
    }

    reject_application = (application_id)=>{
        let formData = new FormData()
        formData.append("application_id", application_id)
        formData.append("is_accepted",0)
        formData.append("is_rejected",1)

        Axios.post("http://localhost:5000/apis/employer/change_application_status",formData)
        .then(res=>{
            this.getApplications()
        })
        .catch(err=>{
            alert("Something went wrong")
        })
    }

    
   
    render(){
    return (
        <div className="container-xxl bg-white p-0">

     

        {/* Jobs Listing Starts*/}

        <div className="container-xxl py-5">
            <div className="container">
                <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">APPLICATIONS FOR {this.state.job_title?this.state.job_title:"---"}</h1>
                <div className="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
                    
                    <div className="tab-content">
                        <div id="tab-1" class="tab-pane fade show p-0 active">

                            
                            {this.state.applications?this.state.applications.map((application,index)=>{
                                return <div className="job-item p-4 mb-4">
                                <div className="row g-4">
                                    <div className="col-sm-12 col-md-8 d-flex align-items-center">
                                        <div className="text-start d-flex flex-column">
                                        <a className="mb-3" href={"/student/profile/"+application.student[0]._id}>
                                            <h5>{application.student[0].student.name}</h5>
                                        </a>
                                            <a href={'http://localhost:5000/uploads/'+application.student[0].student.student_cv} target="_blank">Download CV</a>
                                            <a href={'/application/details/'+application._id}>Details</a>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                    {application.is_rejected == 0 && application.is_accepted == 0?<div className="d-flex mb-3 justify-content-between" style={{width:'45%'}}>

                                            <button className="btn btn-sm btn-success" onClick={()=>this.accept_application(application._id)}>Accept</button>
                                            <button className="btn btn-sm btn-danger" onClick={()=>this.reject_application(application._id)}>Reject</button>
                                        </div>:<p>Status : <b>{application.is_rejected == 1?"Rejected":"Accpeted"}</b></p>}
                                        <small className="text-truncate">Date:{new Date(application.createdAt).toLocaleDateString()}</small>
                                    </div>
                                </div>
                            </div>
                            }):null}
                            
                           


                          
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

export default ApplicationsToJob;