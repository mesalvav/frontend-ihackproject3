import React from 'react';

import './App.css';

import AuthService from './services/AuthService.js';

class App extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props){
    super(props)
    this.state = {
      userx: [],
      ready: false
    }
    this.service = new AuthService();
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

componentDidMount(){
  this.getuser(); 
}

showusers =  ()=> {

    return (<div>{
      this.state.userx.map( (ele, index)=><div key={index}>{ele.username}</div>)
    }</div>)

}

  render(){
      // if( this.state.userx ) {
      return (
        <div className="App">
        <header className="App-header">
          <h1>hello harcoded  in H1 tag</h1>
          <h2> {this.showusers()}</h2>
        </header>
      </div>
    );
      // } 
      // else {
      //   return (<h1>loading.. </h1>)
      // }
  }
}

export default App;
