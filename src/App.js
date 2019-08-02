import React from 'react';

import './App.css';
import axios from 'axios';

import AuthService from './services/AuthService.js';
import Navbar from './components/navbar/Navbar.js';
import {Route, Switch} from 'react-router-dom';
import ProjectIndex from './components/projectindex/ProjectIndex.js';
import Landing from './components/landing/Landing.js';
import Signup from './components/signup/Signup.js';
import Login from './components/login/Login.js';

class App extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props){
    super(props)
    this.state = {
     
      ready: false,
      listOfProjects: [],
      currentlyLoggedIn:null,
    }
    this.service = new AuthService();
  }


  getAllProjects = () => {
    axios.get(`http://localhost:5000/api/projects`, {withCredentials: true})
    .then(responseFromApi => {
      this.setState({
        listOfProjects: responseFromApi.data, ready: true
      })
    })
  }



getCurrentlyLoggedInUser = () =>{
  this.service.currentUser()
  .then((theUser)=>{
    this.setState({currentlyLoggedIn: theUser})
    console.log("===>>>>>  " + JSON.stringify(this.state.currentlyLoggedIn));
  })
  .catch(()=>{
    this.setState({currentlyLoggedIn: null})
  })
}


componentDidMount(){
  // this.getuser(); 
  this.getCurrentlyLoggedInUser();
  this.getAllProjects();
}

showusers =  ()=> {

    return (<div>{
      this.state.userx.map( (ele, index)=><div key={index}>{ele.username}</div>)
    }</div>)

}
logmeoutplease = ()=>{
  this.service.logout().then(()=>{
    this.getCurrentlyLoggedInUser();
    this.getAllProjects();

  })
}
  render(){
     
      return (
        <div className="App">
          <h2><Navbar></Navbar></h2>
       <div><Signup getUser={this.getCurrentlyLoggedInUser}/></div>
       <div>== separator == </div>
       <div><Login getUser={this.getCurrentlyLoggedInUser}/></div>
       <div> +++++ </div>
       <button onClick = {this.logmeoutplease } >Log Out </button>
        <Switch>
        
          <Route exact path="/projects" render={(props)=><ProjectIndex
          {...props}
          allTheProjects={this.state.listOfProjects}
          loggeduser = {this.state.currentlyLoggedIn}
        />}/>

          <Route exact path="/" render={(props)=><Landing
          {...props}
        />}/>

        </Switch>
      </div>
    );
     
  }
}

export default App;
