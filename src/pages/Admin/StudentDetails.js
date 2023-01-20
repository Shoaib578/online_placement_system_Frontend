import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/style.css';
import  Axios  from "axios";
let params = window.location.pathname.split("/")
  class StudentDetails extends React.Component {
    constructor(props){
        super(props)
        this.get_student_details()
        this.state = {
            student_details:""
        }

    }
    

    get_student_details = ()=>{
        console.log(params[4])
        Axios.get("http://localhost:5000/apis/admin/get_student_details_by_id?student_id="+params[4])
        .then(res=>{
            console.log(res.data.student)
            this.setState({student_details:res.data.student})
        })
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
                                <h3 class="mb-2">{this.state.student_details?this.state.student_details.student.name:"----"}</h3>
                                <p>{this.state.student_details?this.state.student_details.student.education:"----"}</p>
                            </div>
                        </div>

                        <div class="mb-5">
                            <h4 class="mb-3">About Me</h4>
                            <p>{this.state.student_details?this.state.student_details.student.about_me:"----"}</p>
                            
                            <h4 class="mb-3">Last Degree</h4>
                            <p>{this.state.student_details?this.state.student_details.student.last_degree:"----"}</p>
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

  export default StudentDetails;