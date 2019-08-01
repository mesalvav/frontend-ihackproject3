import React from 'react';

class ProjectIndex extends React.Component {


render() { 
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