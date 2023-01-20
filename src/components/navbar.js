import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from 'react-router-dom';

let storage = localStorage.getItem('user')
let parse = JSON.parse(storage)


export default class Navbar extends React.Component {
    state = {
        is_logged_in:false,
        role:""
    }

    is_Loggedin = ()=>{
        if(parse != null){
            this.setState({is_logged_in:true},()=>{
                if(parse.is_employer == 1){
                    this.setState({role:"employer"})
                }else{
                    this.setState({role:"student"})

                }
            })
        }
    }

    logout = ()=>{
        localStorage.removeItem('user')
        window.location = "/login"
    }

    componentDidMount(){
        this.is_Loggedin()
    }
    render(){
        return(
            <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
            <a href="/" className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5">
                <h1 className="m-0 text-success">OPS</h1>
            </a>
            <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav ms-auto p-4 p-lg-0">
                    <Link to="/" className="nav-item nav-link ">Home</Link>

                    
                    {this.state.is_logged_in?<Link to={parse.is_student == 1?"/student/dashboard":"/employer/dashboard"} className="nav-item nav-link">dashboard</Link>:null}
                    {this.state.is_logged_in?<Link to="/profile" className="nav-item nav-link">Profile</Link>:null}
                    {this.state.is_logged_in?<Link onClick={this.logout} className="nav-item nav-link">Logout</Link>:null}


                    {this.state.is_logged_in == false?<Link to="/login" className="nav-item nav-link">Login</Link>:null}
                    {this.state.is_logged_in == false?<Link to="/register" className="nav-item nav-link">Register</Link>:null}


                </div>
                    {this.state.role != "student"?<Link to="/employer/postjob" className="btn btn-success rounded-0 py-4 px-lg-5 d-none d-lg-block">
                    Post A Job
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" className="arrowIcon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                    </Link>:null}
            </div>
        </nav>
        )
    }
}