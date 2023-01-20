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
import Axios  from "axios";

  const params = window.location.pathname.split('/')
  class ApplicantProfile extends React.Component {
    state = {
        applicant_details:""
    }

    getApplicantDetails = ()=>{
        Axios.get("http://localhost:5000/apis/employer/get_applicant_details_by_id?applicant_id="+params[3])
        .then(res=>{
            this.setState({applicant_details:res.data.user})
        })
    }

    componentDidMount(){
        this.getApplicantDetails()
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
                                <h3 class="mb-2">{this.state.applicant_details?this.state.applicant_details.student.name:"-----"}</h3>
                                <p>{this.state.applicant_details?this.state.applicant_details.student.education:"-----"}</p>
                            </div>
                        </div>

                        <div class="mb-5">
                            <h4 class="mb-3">About Me</h4>
                            <p>{this.state.applicant_details?this.state.applicant_details.student.about_me:"-----"}</p>
                            
                            <h4 class="mb-3">Last Degree</h4>
                            <p>{this.state.applicant_details?this.state.applicant_details.student.last_degree:"-----"}</p>
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

  export default ApplicantProfile;