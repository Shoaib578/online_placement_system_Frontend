import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { WithContext as ReactTags } from 'react-tag-input';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from 'react-router-dom';
  import '../../css/style.css';
import  Axios  from "axios";

  let storage = localStorage.getItem('user')
  let parse = JSON.parse(storage)
  
class  PostJob extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            tags:[],
            job_title:"",
            job_description:"",
            job_requirements:"",
            is_loading:false
          }
    
        this.isLoggedIn()
    }
    isLoggedIn = ()=>{
        const storage = localStorage.getItem('user')
        const parse = JSON.parse(storage)

        if(parse == null){
           return window.location = "/login"
        }else{
            if(parse.is_employer == 0){
                return window.location = "/"
            }
        }
    }

    validate = ()=>{
        let error = ""
        if(this.state.tags.length<1){
            error = "Job tags are required"
        }
        if(this.state.job_description.length<1){
            error = "Job description is required"
        }
        if(this.state.job_requirements.length<1){
            error = "Job requirements is required"
        }
        if(this.state.job_title.length<1){
           error = "Job title is required"
        }

        

       

        if(error){
            alert(error)
            return false
        }else{
            return true
        }
    }


    post_job = ()=>{
        const validate = this.validate()
        if(validate){
            
            this.setState({is_loading:true})
            let tags = []
            this.state.tags.forEach(tag=>{
            
                tags.push(tag.text)
            })
            let formData = new FormData()
            formData.append("job_title", this.state.job_title)
            formData.append("job_description", this.state.job_description)
            formData.append("job_requirements", this.state.job_requirements)
            formData.append("job_tags",tags)
            formData.append("employer_id",parse._id)

            Axios.post("http://localhost:5000/apis/employer/post_job",formData)
            .then(res=>{
                this.setState({is_loading:false})
                alert(res.data.msg)
                window.location = "/employer/dashboard"
            })
            .catch(err=>{
                console.log(err)
                this.setState({is_loading:false})

                alert("Something went wrong")
            })



        }

        

      
    }
    render(){
    const KeyCodes = {
        comma: 188,
        enter: 13
      };
      
      const delimiters = [KeyCodes.comma, KeyCodes.enter];

    
      const handleDelete = i => {
        this.setState({tags:this.state.tags.filter((tag, index) => index !== i)});
      };
    
      const handleAddition = tag => {
        if(this.state.tags.length != 5){
            this.setState({tags:[...this.state.tags, tag]});
        }
        

       
      };

      const handleDrag = (tag, currPos, newPos) => {
        const newTags = this.state.tags.slice();
    
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
    
        // re-render
        this.setState({tags:newTags});
      };
    
      const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
      };

    return (
        <div className="container-xxl bg-white p-0">

      

        {/* Post a Job Starts */}
        <div className="container-xxl py-5">
            <div className="container">
                <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">POST A JOB</h1>

                <div>
                        <div className="wow fadeInUp" data-wow-delay="0.5s">
  
                         
                                <div className="row g-3">
                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="jobtitle" onChange={(val)=>this.setState({job_title:val.target.value})} placeholder="Job Title"/>
                                            <label for="jobtitle">Job Title</label>
                                        </div>
                                    </div>



                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea class="form-control" placeholder="Job description here" onChange={(val)=>this.setState({job_description:val.target.value})} id="message"></textarea>
                                            <label for="message">Description</label>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea class="form-control" placeholder="Job requirements here" onChange={(val)=>this.setState({job_requirements:val.target.value})} id="message"></textarea>
                                            <label for="message">Requirements</label>
                                        </div>
                                    </div>


                                        <ReactTags
                                        tags={this.state.tags}
                                        delimiters={delimiters}
                                        handleDelete={handleDelete}
                                        handleAddition={handleAddition}
                                        handleDrag={handleDrag}
                                        handleTagClick={handleTagClick}
                                        allowUnique={true}
                                        maxLength = "28"
                                        placeholder="Enter keywords"
                                        
                                        classNames={{
                                            tag: 'tagClass',
                                            remove: 'removeClass',
                                            tagInputField: 'tagInputFieldClass',
                                            tags: 'tagsClass',
                                        }}
                                        />
                                    


                                    <div className="col-12">
                                        <button onClick={this.post_job}  className="btn btn-success w-100 py-3" type="submit">Post Job</button>
                                    </div>
                                </div>
                            
                        </div>
                    </div>

            </div>
        </div>


        {/* Post a Job Ends */}

        </div>
    )
    }
}

export default PostJob;