import React, { useEffect,useState } from "react";
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
const SentApplicationDetails = () => {
    const [application_details,setApplicationDetails] = useState("")
    const get_application_details = ()=>{
        Axios.get("http://localhost:5000/apis/admin/get_application_by_id?application_id="+params[4])
        .then(res=>{
            console.log(res.data.application)
            setApplicationDetails(res.data.application)
        })
    }

    useEffect(()=>{
        get_application_details()
    },[])
    return (
        <div className="container-xxl bg-white p-0">

        {/* Job Detail Starts */}
        <div class="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
            <div class="container">
                <div class="row gy-5 gx-4">
                    <div class="col-lg-8">
                        <div class="d-flex align-items-center mb-5">
                            <div class="text-start">
                            <h3 class="mb-4">Application Sent By</h3>
                                <h3 class="mb-2">{application_details.length>0?application_details[0].student[0].student.name:"----"}</h3>
                                <p>{application_details.length>0?application_details[0].student[0].student.education:"----"}</p>
                                <a href={"http://localhost:5000/uploads/"+application_details[0].student[0].student.student_cv} target="_blank">Download CV</a>
                            </div>
                        </div>

                        <div class="mb-5">
                            <h4 class="mb-3">Message</h4>
                            <p>{application_details.length>0?application_details[0].message:"----"}</p>
                        </div>
        
                    </div>
        
                </div>
            </div>
        </div>
        {/* Job Detail Ends  */}


        </div>
    )
  }

  export default SentApplicationDetails;