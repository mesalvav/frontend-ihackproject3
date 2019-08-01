import React from 'react';

import './App.css';
import axios from 'axios';

import AuthService from './services/AuthService.js';
import Navbar from './components/navbar/Navbar.js';
import {Route, Switch} from 'react-router-dom';
import ProjectIndex from './components/projectindex/ProjectIndex.js';
import Landing from './components/landing/Landing.js';
import Signup from './components/signup/Signup.js';

class App extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props){
    super(props)
    this.state = {
      userx: [],
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
// 
getuser = ()=>{
  this.service.currentUser()
  .then((respondx)=>{
    this.setState ({ userx: respondx, ready: true });
    console.log(this.state.ready + "===== did mount>>>>  " + JSON.stringify(respondx));
  })
  .catch((err)=>{
    console.log("did mount error  " + err);
  })
}


getCurrentlyLoggedInUser = () =>{
  this.service.currentUser()
  .then((theUser)=>{
    this.setState({currentlyLoggedIn: theUser})
  })
  .catch(()=>{
    this.setState({currentlyLoggedIn: null})
  })
}


componentDidMount(){
  this.getuser(); 
  this.getCurrentlyLoggedInUser();
  this.getAllProjects();
}

showusers =  ()=> {

    return (<div>{
      this.state.userx.map( (ele, index)=><div key={index}>{ele.username}</div>)
    }</div>)

}

  render(){
     
      return (
        <div className="App">
          <h2><Navbar></Navbar></h2>
       <div><Signup getUser={this.getCurrentlyLoggedInUser}/></div>
        <Switch>
        
          <Route exact path="/projects" render={(props)=><ProjectIndex
          {...props}
          allTheProjects={this.state.listOfProjects}
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
