import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    
    this.getTop25 = this.getTop25.bind(this);
  }

  componentDidMount() {
    this.getTop25();
  }

  getTop25() {
    console.log('got into ajax call')
    $.ajax({
      url: '/repos',
      type: 'GET',
      success: (data) => {
        // var reposCopy = this.state.repos.slice();
       
        // for (let i = 0; i < data.length; i++) {
        //   reposCopy.push(data[i]);
        // }
        this.setState({
          repos: data
        });
      }
    })
  }

  search(term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: '/repos',
      type: 'POST',
      data: {
        username: term
      },
      success: () => {
        this.getTop25();
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));