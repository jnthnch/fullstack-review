import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    
    {props.repos.map((repo, idx) => {
      return (
        <div key={idx}>
          <a href={repo.html_url}> {repo.name} </a>
        </div>
      )
    })}

  </div>
)

export default RepoList;