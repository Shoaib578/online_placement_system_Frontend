import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/style.css';
import  Axios  from "axios";
let params = window.location.pathname.split('/')
class EmployerDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            employer_details:""
        }
    }
    

    get_employer_details = ()=>{
        console.log(params[4])
        Axios.get("http://localhost:5000/apis/admin/get_user_by_id?user_id="+params[4])
        .then(res=>{
            this.setState({employer_details:res.data.user.employer})
        })
    }

    componentDidMount(){
        this.get_employer_details()

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
                                <h3 class="mb-2">{this.state.employer_details?this.state.employer_details.name:"----"}</h3>
                               
                            </div>
                        </div>

                        <div class="mb-5">
                            <h4 class="mb-3">Domain</h4>
                            <p>{this.state.employer_details?this.state.employer_details.domain:"----"}</p>
                            
                            <h4 class="mb-3">Address</h4>
                            <p>{this.state.employer_details?this.state.employer_details.address:"----"}</p>
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

  export default EmployerDetails;