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
const params = window.location.pathname.split("/")
let storage = localStorage.getItem('user')
let parse = JSON.parse(storage)
class ApplicationDetails extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            application_details:"",
            student_details:""
        }
        this.getApplicationDetails()
        
    }
    
    
    getApplicationDetails = ()=>{
        Axios.get("http://localhost:5000/apis/employer/view_application_details_by_id?application_id="+params[3])
        .then(res=>{
           
            this.setState({application_details:res.data.application[0],student_details:res.data.application[0].student[0].student})
        })
    }


    isLoggedIn = ()=>{
        if(parse == null){
            return window.location = "/login"
        }
    }
  
    render(){
    return (
        <div className="container-xxl bg-white p-0">
        


        {/* Job Detail Starts */}
        <div class="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
            <div class="container">
                <div class="row gy-5 gx-4">
                    <div class="col-lg-8">
                        <div class="d-flex align-items-center mb-5">
                            <div class="text-start">
                                <h3 class="mb-2">{this.state.student_details?this.state.student_details.name:"---"}</h3>
                                <p>{this.state.student_details?this.state.student_details.education:"----"}</p>
                                <a href={"http://localhost:5000/uploads/"+this.state.student_details.student_cv} target="_blank">Download CV</a>
                            </div>
                        </div>

                        <div class="mb-5">
                            <h4 class="mb-3">Message</h4>
                            <p>{this.state.application_details.message}</p>
                        </div>
        
                    </div>
        
                </div>
            </div>
        </div>
        {/* Job Detail Ends  */}


        </div>
    )
    }
  }

  export default ApplicationDetails;