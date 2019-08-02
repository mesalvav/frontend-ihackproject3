import React from 'react';

class ProjectIndex extends React.Component {
// eslint-disable-next-line no-useless-constructor
constructor(props){
  super(props);
}

componentDidMount(){
  if (!this.props.loggeduser){
    console.log("FORBIDDEN")
    this.props.history.push('/');
  }
}
render() { 
  if (!this.props.loggeduser){
    console.log("FORBIDDEN")
    this.props.history.push('/');
  }
   
      return (
        <div>
          <div>all projects here</div>
          <div>
            {this.props.allTheProjects.map((ele, index)=>{
              return(<h1 key={index}>{ele.name}</h1>)
            }) }
          </div>
        </div>
      )
          
    }
}

export default ProjectIndex;