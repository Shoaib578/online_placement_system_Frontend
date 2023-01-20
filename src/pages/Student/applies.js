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
  
class Applies extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            applications:[]
        }
        this.isLoggedIn()
        this.get_all_sent_applications()
    }
    isLoggedIn = ()=>{
        const storage = localStorage.getItem('user')
        const parse = JSON.parse(storage)

        if(parse == null){
           return window.location = "/login"
        }else{
            if(parse.is_employer == 1){
                return window.location = "/employer/dashboard"
            }else if(parse.is_admin == 1){
                return window.location = "/admin/students"

            }
        }
    }


    withdraw_application = (application_id)=>{
        Axios.get("http://localhost:5000/apis/student/withdraw_application?application_id="+application_id)
        .then(res=>{
            alert("successfully withdrawn")
            this.get_all_sent_applications()
        })
        .catch(err=>{
            alert("Something went wrong")
        })
    }

    get_all_sent_applications = ()=>{
        Axios.get("http://localhost:5000/apis/student/get_all_job_applications_for_student?student_id="+parse._id)
        .then(res=>{
            console.log(res.data.applications)
            this.setState({applications:res.data.applications})
        })
    }   

   
    render(){
    return (
        <div className="container-xxl bg-white p-0">

    

        {/* Jobs Listing Starts*/}

        <div className="container-xxl py-5">
            <div className="container">
                <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">SENT JOB APPLICATIONS</h1>
                <div className="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
                    
                    <div className="tab-content">
                        <div id="tab-1" class="tab-pane fade show p-0 active">

                           {this.state.applications.map(application=>{
                            return <div className="job-item p-4 mb-4">
                            <div className="row g-4">
                                <div className="col-sm-12 col-md-8 d-flex align-items-center">
                                    <div className="text-start">
                                        <a style={{color:"green",textDecoration:"none"}} href={"/application/details/"+application._id}>
                                        <h5 className="mb-3">{application.job.length?application.job[0].job_title:"---not found"}</h5>
                                        </a>
                                        <p className="bold">Status: {application.is_accepted == 0 && application.is_rejected == 0?"Pending":<p>{application.is_accepted ==1?"Accepted":"Rejected"}</p>}</p>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                    {application.is_accepted == 0 && application.is_rejected == 0?<div className="d-flex mb-3">
                                        <button onClick={()=>this.withdraw_application(application._id)} className="btn btn-success" >Withdraw</button>
                                    </div>:null}
                                    <small className="text-truncate">Date : {new Date(application.createdAt).toLocaleDateString()}</small>
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

export default Applies;