import 'bootstrap/dist/css/bootstrap.min.css';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import '../css/style.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from 'react-router-dom';
import React from 'react';
import { render } from '@testing-library/react';
import Axios from 'axios'


let storage = localStorage.getItem('user')
let parse = JSON.parse(storage)

class Home extends React.Component{

    state = {
        jobs:[]
    }
    get_all_jobs = ()=>{
        Axios.get("http://localhost:5000/apis/student/get_all_jobs")
        .then(res=>{
            console.log(res.data.jobs)
            this.setState({jobs:res.data.jobs})
        })
        
    }

   



    componentDidMount(){
        this.get_all_jobs()
    }
    render(){

    return (
        <div className="container-xxl bg-white p-0">

      

        {/* Carousel Starts */}

        <Carousel
            autoPlay={true}
            interval={3000}
            transitionTime={1000}
            infiniteLoop={true}
            showThumbs={false}
        >
                <div>
                    <img src="/img/carousel-1.jpg" />
                </div>
                <div>
                    <img src="/img/carousel-2.jpg" />
                </div>
                <div>
                    <img src="/img/carousel-2.jpg" />
                </div>
            </Carousel>

        {/* Carousel Ends */}

        {/* Jobs Listing Starts*/}

        <div className="container-xxl py-5">
            <div className="container">
                <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Job Listing</h1>
                <div className="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
                    
                    <div className="tab-content">
                        <div id="tab-1" class="tab-pane fade show p-0 active">

                            {this.state.jobs?this.state.jobs.map(job=>{
                                return  <div className="job-item p-4 mb-4">
                                <div className="row g-4">
                                    <div className="col-sm-12 col-md-8 d-flex align-items-center">
                                        <div className="text-start ps-4">
                                            <h5 className="mb-3">{ job.job_title }</h5>
                                            <p>Applications sent ({job.applications.length})</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center ps-5">
                                        <div className="d-flex mb-3">
                                        <a className="btn btn-success" href={'/student/apply/'+job._id}>Apply Now</a>
                                        </div>
                                        <small className="text-truncate">Date : {new Date(job.createdAt).toLocaleDateString()}</small>
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

export default Home;