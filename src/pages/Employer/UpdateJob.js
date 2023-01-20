import React, { useEffect } from "react";
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
 

 const params = window.location.pathname.split("/")
class UpdateJob extends React.Component{
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
        this.get_job_details()
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

    get_job_details = ()=>{
        Axios.get("http://localhost:5000/apis/employer/get_job_by_id?job_id="+params[3])
        .then(res=>{

            let job_tags = res.data.job.job_tags
            let tags = []
            if(job_tags.length>0){
                job_tags[0].split(",").forEach(tag=>{
                    tags.push({"id":tag,"text":tag})
                   

                })
            }

            
            this.setState({job_title:res.data.job.job_title,job_description:res.data.job.job_description,job_requirements:res.data.job.job_requirements,tags:tags})
        })
    }

    update_job = ()=>{
        let validate = this.validate()
        if(validate){
            let tags = []
            this.state.tags.forEach(tag=>{
            
                tags.push(tag.text)
            })
            let formData = new FormData()
            formData.append("job_id",params[3])
            formData.append("job_title",this.state.job_title)
            formData.append("job_description",this.state.job_description)
            formData.append("job_requirements",this.state.job_requirements)
            formData.append("job_tags",tags)
    
            Axios.post("http://localhost:5000/apis/employer/update_job",formData)
            .then(res=>{
                alert(res.data.msg)
                
                this.get_job_details()
            })
            .catch(err=>{
                alert("Something Went Wrong")
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
                    <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Update JOB</h1>
    
                    <div>
                            <div className="wow fadeInUp" data-wow-delay="0.5s">
      
                             
                                    <div className="row g-3">
                                        <div className="col-md-12">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="jobtitle" value={this.state.job_title} onChange={(val)=>this.setState({job_title:val.target.value})} placeholder="Job Title"/>
                                                <label for="jobtitle">Job Title</label>
                                            </div>
                                        </div>
    
    
    
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea class="form-control" placeholder="Job description here" value={this.state.job_description} onChange={(val)=>this.setState({job_description:val.target.value})} id="message"></textarea>
                                                <label for="message">Description</label>
                                            </div>
                                        </div>
    
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea class="form-control" placeholder="Job requirements here" value={this.state.job_requirements} onChange={(val)=>this.setState({job_requirements:val.target.value})} id="message"></textarea>
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
                                            <button onClick={this.update_job}  className="btn btn-success w-100 py-3" type="submit">Update Job</button>
                                        </div>
                                    </div>
                                
                            </div>
                        </div>
    
                </div>
            </div>
    
    
            {/* Update  Job Ends */}
    
            </div>
        )
    }
}

export default UpdateJob;