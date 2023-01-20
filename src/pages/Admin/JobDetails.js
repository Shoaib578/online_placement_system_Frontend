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
let params = window.location.pathname.split('/');
class JobDetails extends React.Component {
    state = {
        job_details:""
    }

    get_job_details = ()=>{
        Axios.get("http://localhost:5000/apis/admin/get_job_id?job_id="+params[4])
        .then(res=>{
            this.setState({job_details:res.data.job})
        })
    }

    componentDidMount(){
        this.get_job_details()
    }
    render(){
    return(
        <div className="container-xxl bg-white p-0">
        


        {/* Job Detail Starts */}
        <div class="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
            <div class="container">
            <h3 class="mb-3">Job Details</h3>
                <div class="row gy-5 gx-4">
                    <div class="col-lg-8">
                        <div class="d-flex align-items-center mb-5">
                            <div class="text-start">
                                <h3 class="mb-3">{this.state.job_details?this.state.job_details.job_title:"----"}</h3>
                            </div>
                        </div>

                        <div class="mb-5">
                            <h4 class="mb-3">Job description</h4>
                            <p>{this.state.job_details?this.state.job_details.job_description:"----"}</p>
                            
                            <h4 class="mb-3">Requirements</h4>
                            <p>{this.state.job_details?this.state.job_details.job_requirements:"----"}</p>
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

export default JobDetails;