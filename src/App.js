import React, { Component } from 'react';
import PostList from './components/PostList';
import { getPosts, getUsers, getComments } from './utils/helper';
import './App.css';

class App extends Component{

  constructor(){
    super();
    this.state={
      posts:[],
      users:[],
      comments:[],
      isLoading: false,
      completeLoad: false
    };
  }


  getData = async ()=>{
    const [posts, users, comments] = await Promise.all([
        getPosts(),
        getUsers() ,
        getComments(),
    ]);

      setTimeout(()=>{
          this.setState({
              posts: posts,
              users: users,
              comments: comments,
              completeLoad: true
          });
      },2000)
  };

  sort =(order)=>{
      const posts = [...this.state.posts];

      if(order.target.value==='title'){
          posts.sort(function(a, b) {
              return a['title'].localeCompare(b['title']);
          })
      }
      if(order.target.value==='id'){
          posts.sort(function(a, b) {
              return a['id'] - b['id'];
          })
      }
      this.setState({posts: posts});
  };

  render(){
      return (
          <div className="App">
              <header className="App-header">
              </header>
              <h1>Dynamic List Of Posts</h1>

              <select  onChange={(event)=>this.sort(event)}>
                  <option value="id">Sorted By Id</option>
                  <option value="title">Sorted By Text</option>
              </select>

              {!this.state.completeLoad?<button
                  className={"todos__btn-load"}
                  onClick={()=>{
                      this.setState({ isLoading: true });
                      this.getData()}}
              >{!this.state.isLoading?"Load": "Loading..."}</button>:
               null
              }
              <main>
                  <PostList
                  posts={this.state.posts}
                  users={this.state.users}
                  comments={this.state.comments}
                  />
              </main>
          </div>
      );
  }
}

export default App;
